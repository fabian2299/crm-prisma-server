/*
  Warnings:

  - You are about to drop the `ProductoAPedir` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PedidoToProductoAPedir` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_PedidoToProductoAPedir` DROP FOREIGN KEY `_PedidoToProductoAPedir_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_PedidoToProductoAPedir` DROP FOREIGN KEY `_PedidoToProductoAPedir_ibfk_2`;

-- AlterTable
ALTER TABLE `Pedido` ADD COLUMN `cantidad` INTEGER NULL;

-- DropTable
DROP TABLE `ProductoAPedir`;

-- DropTable
DROP TABLE `_PedidoToProductoAPedir`;

-- CreateTable
CREATE TABLE `_PedidoToProducto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PedidoToProducto_AB_unique`(`A`, `B`),
    INDEX `_PedidoToProducto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PedidoToProducto` ADD FOREIGN KEY (`A`) REFERENCES `Pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PedidoToProducto` ADD FOREIGN KEY (`B`) REFERENCES `Producto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
