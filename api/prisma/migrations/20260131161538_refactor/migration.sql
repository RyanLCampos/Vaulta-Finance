/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the `workspace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_workspaceId_fkey`;

-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_workspaceId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_workspaceId_fkey`;

-- DropForeignKey
ALTER TABLE `workspace` DROP FOREIGN KEY `Workspace_userId_fkey`;

-- DropIndex
DROP INDEX `Transaction_workspaceId_date_idx` ON `transaction`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `workspaceId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `workspaceId`,
    ADD COLUMN `accountId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `workspaceId`;

-- DropTable
DROP TABLE `workspace`;

-- CreateIndex
CREATE INDEX `Account_userId_idx` ON `Account`(`userId`);

-- CreateIndex
CREATE INDEX `Category_accountId_idx` ON `Category`(`accountId`);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
