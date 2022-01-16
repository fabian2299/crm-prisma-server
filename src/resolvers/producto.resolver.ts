import { Producto } from "@prisma/client";
import { ResolverContext } from "./usuario.resolver";

// QUERYS
export async function obtenerProductos(
  parent: unknown,
  input: null,
  { orm }: ResolverContext
) {
  const productos = await orm.producto.findMany();

  return productos;
}

export async function obtenerProducto(
  parent: unknown,
  args: { id: number },
  { orm }: ResolverContext
) {
  const { id } = args;
  const producto = await orm.producto.findUnique({
    where: { id: id },
  });

  if (!producto) throw new Error(`Producto no encontrado`);

  return producto;
}

//  MUTATIONS
export async function nuevoProducto(
  parent: unknown,
  { data }: { data: Pick<Producto, "nombre" | "precio" | "existencia"> },
  { orm }: ResolverContext
) {
  const { nombre, precio, existencia } = data;
  const producto = await orm.producto.create({
    data: {
      nombre,
      precio,
      existencia,
    },
  });

  return producto;
}

export async function actualizarProducto(
  parent: unknown,
  {
    id,
    data,
  }: { id: number; data: Pick<Producto, "nombre" | "precio" | "existencia"> },
  { orm }: ResolverContext
) {
  const { nombre, precio, existencia } = data;
  let producto = await orm.producto.findUnique({ where: { id: id } });

  if (!producto) throw new Error(`Producto no encontrado`);

  producto = await orm.producto.update({
    where: { id: id },
    data: {
      nombre,
      precio,
      existencia,
    },
  });

  return producto;
}

export async function eliminarProducto(
  parent: unknown,
  { id }: { id: number },
  { orm }: ResolverContext
) {
  let producto = await orm.producto.findUnique({ where: { id: id } });
  if (!producto) throw new Error(`Producto no encontrado`);

  producto = await orm.producto.delete({ where: { id: id } });

  return `Producto con nombre: ${producto.nombre} eliminado`;
}
