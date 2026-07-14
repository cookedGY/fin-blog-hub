CREATE TABLE `newsletterEmailLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`emailId` int NOT NULL,
	`subscriberId` int NOT NULL,
	`recipientEmail` varchar(320) NOT NULL,
	`status` enum('sent','failed','bounced') NOT NULL,
	`errorMessage` text,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `newsletterEmailLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletterEmails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subject` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`postSlug` varchar(255),
	`postTitle` varchar(255),
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	`totalRecipients` int NOT NULL,
	`successCount` int NOT NULL DEFAULT 0,
	`failureCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `newsletterEmails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletterSubscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`isActive` boolean NOT NULL DEFAULT true,
	`subscriptionSource` varchar(100),
	`subscribedAt` timestamp NOT NULL DEFAULT (now()),
	`unsubscribedAt` timestamp,
	`lastEmailSentAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `newsletterSubscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletterSubscribers_email_unique` UNIQUE(`email`)
);
