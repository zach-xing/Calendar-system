-- CreateTable
CREATE TABLE `event` (
    `id` VARCHAR(191) NOT NULL,
    `list` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `event_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
