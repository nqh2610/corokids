-- ============================================================
-- SOROKIDS DATABASE SCHEMA EXPORT
-- Version: 1.0.0
-- Backup Date: 2025-12-01
-- Description: Full MySQL schema for restoration
-- ============================================================

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS `sorokids` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sorokids`;

-- ============================================================
-- TABLE: users
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `username` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `avatar` VARCHAR(191) NULL,
  `level` INT NOT NULL DEFAULT 1,
  `totalStars` INT NOT NULL DEFAULT 0,
  `diamonds` INT NOT NULL DEFAULT 5,
  `streak` INT NOT NULL DEFAULT 0,
  `lastLoginDate` DATETIME(3) NULL,
  `role` VARCHAR(191) NOT NULL DEFAULT 'student',
  `parentId` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  UNIQUE KEY `users_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: progress
-- ============================================================
CREATE TABLE IF NOT EXISTS `progress` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `levelId` INT NOT NULL,
  `lessonId` INT NOT NULL,
  `completed` BOOLEAN NOT NULL DEFAULT false,
  `starsEarned` INT NOT NULL DEFAULT 0,
  `timeSpent` INT NOT NULL DEFAULT 0,
  `accuracy` DOUBLE NOT NULL DEFAULT 0,
  `completedAt` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `progress_userId_levelId_lessonId_key` (`userId`, `levelId`, `lessonId`),
  CONSTRAINT `progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: exercise_results
-- ============================================================
CREATE TABLE IF NOT EXISTS `exercise_results` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `exerciseType` VARCHAR(191) NOT NULL,
  `difficulty` INT NOT NULL,
  `problem` VARCHAR(191) NOT NULL,
  `userAnswer` VARCHAR(191) NOT NULL,
  `correctAnswer` VARCHAR(191) NOT NULL,
  `isCorrect` BOOLEAN NOT NULL,
  `timeTaken` INT NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  
  PRIMARY KEY (`id`),
  INDEX `exercise_results_userId_createdAt_idx` (`userId`, `createdAt`),
  CONSTRAINT `exercise_results_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: achievements
-- ============================================================
CREATE TABLE IF NOT EXISTS `achievements` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NOT NULL,
  `icon` VARCHAR(191) NOT NULL,
  `category` VARCHAR(191) NOT NULL,
  `requirement` VARCHAR(191) NOT NULL,
  `stars` INT NOT NULL DEFAULT 0,
  `diamonds` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `achievements_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: user_achievements
-- ============================================================
CREATE TABLE IF NOT EXISTS `user_achievements` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `achievementId` VARCHAR(191) NOT NULL,
  `unlockedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_achievements_userId_achievementId_key` (`userId`, `achievementId`),
  CONSTRAINT `user_achievements_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_achievements_achievementId_fkey` FOREIGN KEY (`achievementId`) REFERENCES `achievements`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: lessons
-- ============================================================
CREATE TABLE IF NOT EXISTS `lessons` (
  `id` VARCHAR(191) NOT NULL,
  `levelId` INT NOT NULL,
  `lessonId` INT NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `difficulty` INT NOT NULL DEFAULT 1,
  `duration` INT NOT NULL DEFAULT 15,
  `stars` INT NOT NULL DEFAULT 10,
  `videoUrl` VARCHAR(191) NULL,
  `order` INT NOT NULL,
  `isLocked` BOOLEAN NOT NULL DEFAULT false,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `lessons_levelId_lessonId_key` (`levelId`, `lessonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: quests
-- ============================================================
CREATE TABLE IF NOT EXISTS `quests` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `category` VARCHAR(191) NOT NULL,
  `requirement` VARCHAR(191) NOT NULL,
  `stars` INT NOT NULL DEFAULT 50,
  `diamonds` INT NOT NULL DEFAULT 10,
  `expiresAt` DATETIME(3) NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: user_quests
-- ============================================================
CREATE TABLE IF NOT EXISTS `user_quests` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `questId` VARCHAR(191) NOT NULL,
  `progress` INT NOT NULL DEFAULT 0,
  `completed` BOOLEAN NOT NULL DEFAULT false,
  `claimedAt` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_quests_userId_questId_key` (`userId`, `questId`),
  CONSTRAINT `user_quests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_quests_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `quests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: shop_items
-- ============================================================
CREATE TABLE IF NOT EXISTS `shop_items` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NOT NULL,
  `icon` VARCHAR(191) NOT NULL,
  `category` VARCHAR(191) NOT NULL,
  `price` INT NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `data` TEXT NOT NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: purchases
-- ============================================================
CREATE TABLE IF NOT EXISTS `purchases` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `itemId` VARCHAR(191) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `totalPrice` INT NOT NULL,
  `purchasedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  
  PRIMARY KEY (`id`),
  CONSTRAINT `purchases_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `purchases_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `shop_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: friends
-- ============================================================
CREATE TABLE IF NOT EXISTS `friends` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `friendId` VARCHAR(191) NOT NULL,
  `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `acceptedAt` DATETIME(3) NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `friends_userId_friendId_key` (`userId`, `friendId`),
  CONSTRAINT `friends_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `friends_friendId_fkey` FOREIGN KEY (`friendId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: challenges
-- ============================================================
CREATE TABLE IF NOT EXISTS `challenges` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NOT NULL,
  `creatorId` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `difficulty` INT NOT NULL,
  `rules` TEXT NOT NULL,
  `starsPrize` INT NOT NULL,
  `status` VARCHAR(191) NOT NULL DEFAULT 'active',
  `startAt` DATETIME(3) NOT NULL,
  `endAt` DATETIME(3) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  
  PRIMARY KEY (`id`),
  CONSTRAINT `challenges_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: challenge_participations
-- ============================================================
CREATE TABLE IF NOT EXISTS `challenge_participations` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `challengeId` VARCHAR(191) NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  `rank` INT NULL,
  `completed` BOOLEAN NOT NULL DEFAULT false,
  `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `completedAt` DATETIME(3) NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `challenge_participations_userId_challengeId_key` (`userId`, `challengeId`),
  CONSTRAINT `challenge_participations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `challenge_participations_challengeId_fkey` FOREIGN KEY (`challengeId`) REFERENCES `challenges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: notifications
-- ============================================================
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `message` VARCHAR(191) NOT NULL,
  `data` TEXT NULL,
  `isRead` BOOLEAN NOT NULL DEFAULT false,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  
  PRIMARY KEY (`id`),
  INDEX `notifications_userId_isRead_createdAt_idx` (`userId`, `isRead`, `createdAt`),
  CONSTRAINT `notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Prisma migrations table
-- ============================================================
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` VARCHAR(36) NOT NULL,
  `checksum` VARCHAR(64) NOT NULL,
  `finished_at` DATETIME(3) NULL,
  `migration_name` VARCHAR(255) NOT NULL,
  `logs` TEXT NULL,
  `rolled_back_at` DATETIME(3) NULL,
  `started_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` INT UNSIGNED NOT NULL DEFAULT 0,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
