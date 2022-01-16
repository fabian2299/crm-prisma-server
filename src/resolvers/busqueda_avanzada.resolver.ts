import { ResolverContext } from "./usuario.resolver";

// QUERYS
export async function mejoresClientes(
  parent: unknown,
  args: unknown,
  { orm, user }: ResolverContext
) {
  const bestClients = await orm.pedido.groupBy({
    by: ["clienteId"],
    where: { estado: "COMPLETADO" },
    _sum: { total: true },
    orderBy: {
      _sum: {
        total: "desc",
      },
    },
  });

  return bestClients;
}

export async function mejoresVendedores(
  parent: unknown,
  args: unknown,
  { orm, user }: ResolverContext
) {
  const bestSellers = await orm.pedido.groupBy({
    by: ["vendedorId"],
    where: { estado: "COMPLETADO" },
    _sum: { total: true },
    orderBy: {
      _sum: {
        total: "desc",
      },
    },
  });

  return bestSellers;
}

export async function buscarProducto(
  parent: unknown,
  args: { texto: string },
  { orm, user }: ResolverContext
) {
  const { texto } = args;

  const productos = await orm.producto.findMany({
    where: {
      nombre: {
        contains: texto,
      },
    },
  });

  return productos;
}
