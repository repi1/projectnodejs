/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Carts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Orders_addressId_fkey` ON `orders`;

-- DropIndex
DROP INDEX `Orders_storeId_fkey` ON `orders`;

-- DropIndex
DROP INDEX `Users_storeId_fkey` ON `users`;

-- CreateIndex
CREATE UNIQUE INDEX `Carts_productId_key` ON `Carts`(`productId`);
