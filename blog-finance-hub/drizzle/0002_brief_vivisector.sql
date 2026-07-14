CREATE TABLE `auditLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`openId` varchar(64),
	`action` varchar(100) NOT NULL,
	`actionType` enum('auth','file','system') NOT NULL,
	`status` enum('success','failure','blocked') NOT NULL,
	`ipAddress` varchar(45),
	`userAgent` text,
	`details` text,
	`errorMessage` text,
	`resourceId` varchar(255),
	`resourceType` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditLogs_id` PRIMARY KEY(`id`)
);
