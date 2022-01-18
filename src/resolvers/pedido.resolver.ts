import { Estado } from "@prisma/client";
import { ResolverContext } from "./usuario.resolver";

// QUERYS
export async function obtenerPedidos(
  parent: unknown,
  args: unknown,
  { orm, user }: ResolverContext
) {
  const pedidos = await orm.pedido.findMany({ include: { articulos: true } });
  return pedidos;
}

export async function obtenerPedidosVendedor(
  parent: unknown,
  args: unknown,
  { orm, user }: ResolverContext
) {
  const pedidos = await orm.pedido.findMany({
    where: { vendedorId: user.id },
    include: { articulos: true, cliente: true },
  });
  return pedidos;
}

export async function obtenerPedido(
  parent: unknown,
  args: { id: number },
  { orm, user }: ResolverContext
) {
  const { id } = args;

  const pedido = await orm.pedido.findUnique({
    where: { id },
    include: { articulos: true },
  });

  if (pedido?.vendedorId !== user.id) {
    throw new Error(`No tienes las crendeciales`);
  }

  return pedido;
}

export async function obtenerPedidosEstado(
  parent: unknown,
  args: { estado: Estado },
  { orm, user }: ResolverContext
) {
  const { estado } = args;
  const pedido = await orm.pedido.findMany({
    where: { estado, vendedorId: user.id },
  });
  return pedido;
}

// MUTATIONS
export async function nuevoPedido(
  parent: unknown,
  { data }: { data: any },
  { orm, user }: ResolverContext
) {
  // verificar si el cliente existe o no
  const { total, clienteId, articulos } = data;

  let cliente = await orm.cliente.findFirst({ where: { id: clienteId } });
  if (!cliente) throw new Error(`El cliente no existe`);
  // verificar si el cliente es del vendedor
  if (cliente.vendedorId !== user.id) {
    throw new Error(`No tienes las crendeciales`);
  }
  // revisar que el stock este disponible
  for await (const articulo of articulos) {
    const { id } = articulo;
    // busca el producto
    let producto = await orm.producto.findUnique({
      where: { id },
    });
    if (!producto) throw new Error(`Producto no encontrado`);
    // revisar si la cantidad no sobrepasa el stock
    if (articulo.cantidad > producto?.existencia!) {
      throw new Error(
        `El articulo: ${producto?.nombre}, excede la cantidad disponible`
      );
    } else {
      // Restar la cantidad a lo disponible
      producto = await orm.producto.update({
        where: { id },
        data: {
          existencia: producto.existencia - articulo.cantidad,
        },
      });
    }
  }

  const pedido = await orm.pedido.create({
    data: {
      total,
      articulos: {
        create: [...articulos],
      },
      vendedor: {
        connect: { id: user.id },
      },
      cliente: {
        connect: { id: clienteId },
      },
    },
    include: { articulos: true, cliente: true, vendedor: true },
  });

  return pedido;
}

export async function actualizarPedido(
  parent: unknown,
  { id, data }: { id: number; data: any },
  { orm, user }: ResolverContext
) {
  const { clienteId, estado } = data;

  // verificar si el pedido existe
  let pedido = await orm.pedido.findFirst({ where: { id } });
  if (!pedido) throw new Error(`El pedido no existe`);

  // verificar si el cliente existe
  const cliente = await orm.cliente.findFirst({ where: { id: clienteId } });
  if (!cliente) throw new Error(`El cliente no existe`);

  // verificar si el cliente y pedido pertenece al vendedor
  if (cliente.vendedorId !== user.id) {
    throw new Error(`No tienes las crendeciales`);
  }

  pedido = await orm.pedido.update({
    where: { id },
    data: {
      estado,
    },
  });

  return pedido;
}

export async function eliminarPedido(
  parent: unknown,
  { id }: { id: number },
  { orm, user }: ResolverContext
) {
  // verificar si el pedido existe
  let pedido = await orm.pedido.findFirst({ where: { id } });
  if (!pedido) throw new Error(`El pedido no existe`);
  // verificar si el pedido es del vendedor
  if (pedido.vendedorId !== user.id) {
    throw new Error(`No tienes las crendeciales`);
  }

  pedido = await orm.pedido.update({
    where: { id },
    data: {
      articulos: {
        deleteMany: {},
      },
    },
  });

  pedido = await orm.pedido.delete({ where: { id } });

  return `El Pedido ha sido eliminado`;
}
