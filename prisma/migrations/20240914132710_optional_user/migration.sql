-- DropForeignKey
ALTER TABLE `urls` DROP FOREIGN KEY `urls_userId_fkey`;

-- AlterTable
ALTER TABLE `urls` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `urls` ADD CONSTRAINT `urls_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
