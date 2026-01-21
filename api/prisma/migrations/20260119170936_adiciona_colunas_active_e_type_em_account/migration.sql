/*
  Warnings:

  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
