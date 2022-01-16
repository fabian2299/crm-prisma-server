/*
  Warnings:

  - You are about to drop the column `pedidoId` on the `ProductoAPedir` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProductoAPedir` DROP FOREIGN KEY `ProductoAPedir_pedidoId_fkey`;

-- AlterTable
ALTER TABLE `ProductoAPedir` DROP COLUMN `pedidoId`;

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
