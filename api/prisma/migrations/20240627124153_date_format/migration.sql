/*
  Warnings:

  - You are about to drop the column `birthDate` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `birthDate`,
    ADD COLUMN `date` DATE NULL;
