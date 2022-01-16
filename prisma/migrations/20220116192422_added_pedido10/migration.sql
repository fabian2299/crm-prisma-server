/*
  Warnings:

  - You are about to drop the `_PedidoToProductoAPedir` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_PedidoToProductoAPedir` DROP FOREIGN KEY `_PedidoToProductoAPedir_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_PedidoToProductoAPedir` DROP FOREIGN KEY `_PedidoToProductoAPedir_ibfk_2`;

-- AlterTable
ALTER TABLE `ProductoAPedir` ADD COLUMN `pedidoId` INTEGER NULL,
    ADD COLUMN `productoId` INTEGER NULL;

-- DropTable
DROP TABLE `_PedidoToProductoAPedir`;

-- AddForeignKey
ALTER TABLE `ProductoAPedir` ADD CONSTRAINT `ProductoAPedir_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoAPedir` ADD CONSTRAINT `ProductoAPedir_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
