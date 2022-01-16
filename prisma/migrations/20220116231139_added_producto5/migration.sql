-- DropIndex
DROP INDEX `Producto_nombre_idx` ON `Producto`;

-- CreateIndex
CREATE INDEX `Producto_nombre_idx` ON `Producto`(`nombre`);
