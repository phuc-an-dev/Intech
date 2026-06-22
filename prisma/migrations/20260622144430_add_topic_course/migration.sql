-- CreateTable
CREATE TABLE `Topic` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name_vi` VARCHAR(191) NOT NULL,
    `name_en` VARCHAR(191) NOT NULL,
    `description_vi` TEXT NOT NULL,
    `description_en` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Topic_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `level` ENUM('foundation', 'tools', 'application', 'advanced', 'strategic') NOT NULL DEFAULT 'foundation',
    `topicId` VARCHAR(191) NOT NULL,
    `durationHours` INTEGER NOT NULL DEFAULT 0,
    `durationSessions` INTEGER NOT NULL DEFAULT 0,
    `title_vi` TEXT NOT NULL,
    `title_en` TEXT NOT NULL,
    `description_vi` TEXT NOT NULL,
    `description_en` TEXT NOT NULL,
    `learningOutcome_vi` TEXT NOT NULL,
    `learningOutcome_en` TEXT NOT NULL,
    `targetAudience_vi` JSON NOT NULL,
    `targetAudience_en` JSON NOT NULL,
    `modules_vi` JSON NOT NULL,
    `modules_en` JSON NOT NULL,
    `finalProject_vi` TEXT NOT NULL,
    `finalProject_en` TEXT NOT NULL,
    `deliveryFormat_vi` VARCHAR(191) NOT NULL,
    `deliveryFormat_en` VARCHAR(191) NOT NULL,
    `tags` JSON NOT NULL,
    `prerequisite` TEXT NULL,
    `priceOriginal` INTEGER NOT NULL DEFAULT 0,
    `priceSale` INTEGER NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Course_slug_key`(`slug`),
    INDEX `Course_status_idx`(`status`),
    INDEX `Course_topicId_idx`(`topicId`),
    INDEX `Course_level_idx`(`level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
