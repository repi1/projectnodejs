-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(255) NOT NULL,
    `referralNum` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL DEFAULT 'male',
    `birthDate` DATE NULL,
    `avatarURL` VARCHAR(255) NULL,
    `role` ENUM('user', 'storeAdmin', 'superAdmin') NOT NULL DEFAULT 'user',
    `storeId` VARCHAR(191) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `isReset` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_id_key`(`id`),
    UNIQUE INDEX `Users_referralNum_key`(`referralNum`),
    UNIQUE INDEX `Users_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(18, 2) NOT NULL,
    `categoryId` VARCHAR(255) NOT NULL,
    `weight` DECIMAL(18, 2) NOT NULL,
    `stocks` DECIMAL(18, 2) NOT NULL DEFAULT 0,

    UNIQUE INDEX `Products_id_key`(`id`),
    UNIQUE INDEX `Products_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Categories_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductPhotos` (
    `id` VARCHAR(255) NOT NULL,
    `productId` VARCHAR(255) NOT NULL,
    `photoURL` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `ProductPhotos_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carts` (
    `userId` VARCHAR(255) NOT NULL,
    `productId` VARCHAR(255) NOT NULL,
    `qty` DECIMAL(18, 2) NOT NULL,

    UNIQUE INDEX `Carts_productId_key`(`productId`),
    PRIMARY KEY (`userId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` VARCHAR(255) NOT NULL,
    `invoiceNo` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Orders_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderDetails` (
    `orderId` VARCHAR(255) NOT NULL,
    `productId` VARCHAR(255) NOT NULL,
    `qty` DECIMAL(18, 2) NOT NULL,
    `total` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`orderId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductPhotos` ADD CONSTRAINT `ProductPhotos_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
