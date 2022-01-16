/*
  Warnings:

  - You are about to drop the column `cantidad` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the `_PedidoToProducto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_PedidoToProducto` DROP FOREIGN KEY `_PedidoToProducto_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_PedidoToProducto` DROP FOREIGN KEY `_PedidoToProducto_ibfk_2`;

-- AlterTable
ALTER TABLE `Pedido` DROP COLUMN `cantidad`;

-- DropTable
DROP TABLE `_PedidoToProducto`;

-- CreateTable
CREATE TABLE `ProductoAPedir` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PedidoToProductoAPedir` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PedidoToProductoAPedir_AB_unique`(`A`, `B`),
    INDEX `_PedidoToProductoAPedir_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PedidoToProductoAPedir` ADD FOREIGN KEY (`A`) REFERENCES `Pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PedidoToProductoAPedir` ADD FOREIGN KEY (`B`) REFERENCES `ProductoAPedir`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
