/*
  Warnings:

  - Added the required column `nombre` to the `ProductoAPedir` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `ProductoAPedir` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Producto_nombre_idx` ON `Producto`;

-- AlterTable
ALTER TABLE `ProductoAPedir` ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `precio` DOUBLE NOT NULL;

-- CreateIndex
CREATE INDEX `Producto_nombre_idx` ON `Producto`(`nombre`);
