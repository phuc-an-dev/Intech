-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `lang` VARCHAR(191) NOT NULL,
    `categoryKey` VARCHAR(191) NOT NULL,
    `category_vi` VARCHAR(191) NOT NULL,
    `category_en` VARCHAR(191) NOT NULL,
    `title_vi` TEXT NOT NULL,
    `title_en` TEXT NOT NULL,
    `excerpt_vi` TEXT NOT NULL,
    `excerpt_en` TEXT NOT NULL,
    `body_vi` LONGTEXT NOT NULL,
    `body_en` LONGTEXT NOT NULL,
    `tags` JSON NOT NULL,
    `gradient` VARCHAR(191) NOT NULL,
    `coverImage` VARCHAR(191) NULL,
    `readTime` INTEGER NOT NULL DEFAULT 5,
    `date` DATETIME(3) NOT NULL,
    `authorName` VARCHAR(191) NOT NULL,
    `authorRole_vi` VARCHAR(191) NOT NULL,
    `authorRole_en` VARCHAR(191) NOT NULL,
    `authorImage` VARCHAR(191) NOT NULL,
    `authorImageAlt` VARCHAR(191) NOT NULL,
    `relatedCourseSlug` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Post_slug_key`(`slug`),
    INDEX `Post_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
