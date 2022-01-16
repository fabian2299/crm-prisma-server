import { Usuario } from "@prisma/client";
import jwt from "jsonwebtoken";

export const crearToken = ({
  usuario,
  secreta,
  expiresIn,
}: {
  usuario: Usuario;
  secreta: string;
  expiresIn: string;
}) => {
  const { id, email, nombre, apellido } = usuario;

  return jwt.sign({ id, email, nombre, apellido }, secreta, { expiresIn });
};
