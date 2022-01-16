import { Cliente } from "@prisma/client";
import { ResolverContext } from "./usuario.resolver";

// QUERYS
export async function obtenerClientes(
  parent: unknown,
  args: unknown,
  { orm, user }: ResolverContext
) {
  const clientes = await orm.cliente.findMany({ include: { vendedor: true } });

  return clientes;
}

export async function obtenerClientesVendedor(
  parent: unknown,
  args: unknown,
  { orm, user }: ResolverContext
) {
  const clientes = await orm.cliente.findMany({
    where: {
      vendedor: {
        id: user.id,
      },
    },
  });

  return clientes;
}

export async function obtenerCliente(
  parent: unknown,
  args: { id: number },
  { orm, user }: ResolverContext
) {
  const { id } = args;
  const cliente = await orm.cliente.findUnique({
    where: { id: id },
  });

  if (cliente?.vendedorId !== user.id)
    throw new Error(`No tienes las credenciales`);

  return cliente;
}

// MUTATIONS
export async function nuevoCliente(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<
      Cliente,
      "nombre" | "apellido" | "empresa" | "email" | "telefono"
    >;
  },
  { orm, user }: ResolverContext
) {
  const { nombre, apellido, empresa, email, telefono } = data;

  const cliente = await orm.cliente.create({
    data: {
      nombre,
      apellido,
      empresa,
      email,
      telefono,
      vendedor: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return cliente;
}

export async function actualizarCliente(
  parent: unknown,
  {
    id,
    data,
  }: {
    id: number;
    data: Pick<
      Cliente,
      "nombre" | "apellido" | "empresa" | "email" | "telefono"
    >;
  },
  { orm, user }: ResolverContext
) {
  const { nombre, apellido, empresa, email, telefono } = data;

  const cliente = await orm.cliente.update({
    where: { id: id },
    data: {
      nombre,
      apellido,
      empresa,
      email,
      telefono,
    },
  });

  if (cliente?.vendedorId !== user.id)
    throw new Error(`No tienes las credenciales`);

  return cliente;
}

export async function eliminarCliente(
  parent: unknown,
  {
    id,
  }: {
    id: number;
  },
  { orm, user }: ResolverContext
) {
  const cliente = await orm.cliente.delete({
    where: { id: id },
  });

  if (cliente?.vendedorId !== user.id)
    throw new Error(`No tienes las credenciales`);

  return `Cliente con nombre: ${cliente.nombre} ha sido eliminado`;
}
