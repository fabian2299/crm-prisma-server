import * as usuario from "./usuario.resolver";
import * as producto from "./producto.resolver";
import * as cliente from "./cliente.resolver";
import * as pedido from "./pedido.resolver";
import * as busquedaAvanzada from "./busqueda_avanzada.resolver";
import * as scalars from "./scalars";

export default {
  ...scalars,
  Query: {
    // Usuarios
    obtenerUsuario: usuario.obtenerUsuario,
    // Productos
    obtenerProductos: producto.obtenerProductos,
    obtenerProducto: producto.obtenerProducto,
    // Clientes
    obtenerClientes: cliente.obtenerClientes,
    obtenerClientesVendedor: cliente.obtenerClientesVendedor,
    obtenerCliente: cliente.obtenerCliente,
    // Pedidos
    obtenerPedidos: pedido.obtenerPedidos,
    obtenerPedidosVendedor: pedido.obtenerPedidosVendedor,
    obtenerPedido: pedido.obtenerPedido,
    obtenerPedidosEstado: pedido.obtenerPedidosEstado,
    // BusquedaAvanzada
    mejoresClientes: busquedaAvanzada.mejoresClientes,
    mejoresVendedores: busquedaAvanzada.mejoresVendedores,
    buscarProducto: busquedaAvanzada.buscarProducto,
  },
  Mutation: {
    // Usuarios
    nuevoUsuario: usuario.nuevoUsuario,
    autenticarUsuario: usuario.autenticarUsuario,
    // Productos
    nuevoProducto: producto.nuevoProducto,
    actualizarProducto: producto.actualizarProducto,
    eliminarProducto: producto.eliminarProducto,
    // Clientes
    nuevoCliente: cliente.nuevoCliente,
    actualizarCliente: cliente.actualizarCliente,
    eliminarCliente: cliente.eliminarCliente,
    // Pedidos
    nuevoPedido: pedido.nuevoPedido,
    actualizarPedido: pedido.actualizarPedido,
    eliminarPedido: pedido.eliminarPedido,
  },
};
