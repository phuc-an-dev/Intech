-- DropForeignKey (will re-add with RESTRICT since columns become required)
ALTER TABLE `Post` DROP FOREIGN KEY `Post_categoryId_fkey`;
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- Drop the now-migrated inline columns and make the relation FKs required
ALTER TABLE `Post`
    DROP COLUMN `authorImage`,
    DROP COLUMN `authorImageAlt`,
    DROP COLUMN `authorName`,
    DROP COLUMN `authorRole_en`,
    DROP COLUMN `authorRole_vi`,
    DROP COLUMN `categoryKey`,
    DROP COLUMN `category_en`,
    DROP COLUMN `category_vi`,
    MODIFY `categoryId` VARCHAR(191) NOT NULL,
    MODIFY `authorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Author`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
