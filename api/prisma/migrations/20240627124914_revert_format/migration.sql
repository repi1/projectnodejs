/*
  Warnings:

  - You are about to drop the column `date` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `date`,
    ADD COLUMN `birthDate` DATETIME(3) NULL;
