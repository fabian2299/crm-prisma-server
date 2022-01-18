/*
  Warnings:

  - You are about to drop the column `productoId` on the `ProductoAPedir` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProductoAPedir` DROP FOREIGN KEY `ProductoAPedir_pedidoId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductoAPedir` DROP FOREIGN KEY `ProductoAPedir_productoId_fkey`;

-- DropIndex
DROP INDEX `Producto_nombre_idx` ON `Producto`;

-- AlterTable
ALTER TABLE `ProductoAPedir` DROP COLUMN `productoId`;

-- CreateIndex
CREATE INDEX `Producto_nombre_idx` ON `Producto`(`nombre`);

-- AddForeignKey
ALTER TABLE `ProductoAPedir` ADD CONSTRAINT `ProductoAPedir_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
