/*
  Warnings:

  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kurir` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderdetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stockhistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `uservouchers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vouchers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `Addresses_userId_fkey`;

-- DropForeignKey
ALTER TABLE `orderdetails` DROP FOREIGN KEY `OrderDetails_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderdetails` DROP FOREIGN KEY `OrderDetails_stockId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `Orders_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `Orders_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `promos` DROP FOREIGN KEY `Promos_productId_fkey`;

-- DropForeignKey
ALTER TABLE `stockhistory` DROP FOREIGN KEY `StockHistory_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `stockhistory` DROP FOREIGN KEY `StockHistory_stockId_fkey`;

-- DropForeignKey
ALTER TABLE `stocks` DROP FOREIGN KEY `Stocks_productId_fkey`;

-- DropForeignKey
ALTER TABLE `stocks` DROP FOREIGN KEY `Stocks_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `uservouchers` DROP FOREIGN KEY `UserVouchers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `uservouchers` DROP FOREIGN KEY `UserVouchers_voucherId_fkey`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `stocks` DECIMAL(18, 2) NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `addresses`;

-- DropTable
DROP TABLE `kurir`;

-- DropTable
DROP TABLE `orderdetails`;

-- DropTable
DROP TABLE `promos`;

-- DropTable
DROP TABLE `stockhistory`;

-- DropTable
DROP TABLE `stocks`;

-- DropTable
DROP TABLE `stores`;

-- DropTable
DROP TABLE `uservouchers`;

-- DropTable
DROP TABLE `vouchers`;
