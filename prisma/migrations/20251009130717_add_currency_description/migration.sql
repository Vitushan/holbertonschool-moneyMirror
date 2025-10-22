/*
  Warnings:

  - Added the required column `currency` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `currency` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL;
