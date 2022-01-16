import type { PrismaClient, Usuario } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { crearToken } from "../lib";

export type ResolverParent = unknown;
export type ResolverContext = {
  orm: PrismaClient;
  user: Pick<Usuario, "id" | "email" | "nombre" | "apellido">;
};

// QUERYS
export async function obtenerUsuario(
  parent: ResolverParent,
  args: { token: string },
  { orm }: ResolverContext
) {
  const usuarioId = jwt.verify(args.token, process.env.SECRETA!);

  return usuarioId as Pick<Usuario, "id" | "email" | "nombre" | "apellido">;
}

//  MUTATIONS
export async function nuevoUsuario(
  parent: unknown,
  {
    data,
  }: { data: Pick<Usuario, "nombre" | "apellido" | "email" | "password"> },
  { orm }: ResolverContext
): Promise<Usuario> {
  const { nombre, apellido, email, password } = data;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const usuario = await orm.usuario.create({
    data: {
      nombre,
      apellido,
      email,
      password: hashedPassword,
    },
  });

  return usuario;
}

export async function autenticarUsuario(
  parent: unknown,
  { data }: { data: Pick<Usuario, "email" | "password"> },
  { orm }: ResolverContext
): Promise<{
  token: string;
}> {
  const { email, password } = data;

  // buscar usuario en la base de datos
  const usuario = await orm.usuario.findFirst({
    where: { email },
  });
  if (!usuario) throw new Error(`El usuario no existe`);
  // revisar password
  const passwordCorrecto = await bcrypt.compare(password, usuario.password);
  if (!passwordCorrecto) throw new Error(`El password es incorrecto`);
  // crear token

  return {
    token: crearToken({
      usuario,
      secreta: process.env.SECRETA!,
      expiresIn: "24h",
    }),
  };
}
