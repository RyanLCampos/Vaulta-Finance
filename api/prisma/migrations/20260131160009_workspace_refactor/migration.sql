/*
  Warnings:

  - You are about to drop the column `userId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `workspaceId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_userId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_userId_fkey`;

-- DropIndex
DROP INDEX `Transaction_userId_date_idx` ON `transaction`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `userId`,
    ADD COLUMN `workspaceId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `userId`,
    ADD COLUMN `workspaceId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `userId`,
    ADD COLUMN `workspaceId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Workspace` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Workspace_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Account_workspaceId_idx` ON `Account`(`workspaceId`);

-- CreateIndex
CREATE INDEX `Category_workspaceId_idx` ON `Category`(`workspaceId`);

-- CreateIndex
CREATE INDEX `Transaction_workspaceId_idx` ON `Transaction`(`workspaceId`);

-- CreateIndex
CREATE INDEX `Transaction_workspaceId_date_idx` ON `Transaction`(`workspaceId`, `date`);

-- AddForeignKey
ALTER TABLE `Workspace` ADD CONSTRAINT `Workspace_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `Workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `Workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `Workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
