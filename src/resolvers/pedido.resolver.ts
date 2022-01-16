import { ResolverContext } from "./usuario.resolver";
import { Pedido } from "@prisma/client";

// MUTATIONS
export async function nuevoPedido(
  parent: unknown,
  { data }: { data: any },
  { orm, user }: ResolverContext
) {
  // verificar si el cliente existe o no
  const { nombre, total, clienteId, articulos } = data;

  let cliente = await orm.cliente.findFirst({ where: { id: clienteId } });
  if (!cliente) throw new Error(`El cliente no existe`);
  // verificar si el cliente es del vendedor
  if (cliente.vendedorId !== user.id) {
    throw new Error(`No tienes las crendeciales`);
  }
  // revisar que el stock este disponible
  for await (const articulo of articulos) {
    const { id } = articulo;
    const producto = await orm.producto.findUnique({ where: { id } });
    if (articulo.cantidad > producto?.existencia!) {
      throw new Error(
        `El articulo: ${producto?.nombre}, excede la cantidad disponible`
      );
    }
  }

  const pedido = await orm.pedido.create({
    data: {
      nombre,
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
