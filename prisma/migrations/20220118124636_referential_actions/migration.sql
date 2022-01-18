/*
  Warnings:

  - You are about to drop the column `nombre` on the `Pedido` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Cliente` DROP FOREIGN KEY `Cliente_vendedorId_fkey`;

-- DropForeignKey
ALTER TABLE `Pedido` DROP FOREIGN KEY `Pedido_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `Pedido` DROP FOREIGN KEY `Pedido_vendedorId_fkey`;

-- DropIndex
DROP INDEX `Producto_nombre_idx` ON `Producto`;

-- AlterTable
ALTER TABLE `Pedido` DROP COLUMN `nombre`;

-- CreateIndex
CREATE INDEX `Producto_nombre_idx` ON `Producto`(`nombre`);

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
