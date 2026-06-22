-- AlterTable
ALTER TABLE `Post` ADD COLUMN `pinned` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `Post_pinned_idx` ON `Post`(`pinned`);
