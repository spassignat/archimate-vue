CREATE TABLE IF NOT EXISTS `strategy_resources`
(
	`id`           VARCHAR(36)  NOT NULL,
	`name`         VARCHAR(255) NOT NULL,
	`description`  VARCHAR(255) DEFAULT NULL,
	`events`       VARCHAR(255) DEFAULT NULL,
	`capabilities` VARCHAR(255) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `strategy_capabilities`
(
	`id`          VARCHAR(36)  NOT NULL,
	`name`        VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) DEFAULT NULL,
	`processes`   VARCHAR(255) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `strategy_value_streams`
(
	`id`          VARCHAR(36)  NOT NULL,
	`name`        VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) DEFAULT NULL,
	`stages`      VARCHAR(255) DEFAULT NULL,
	`flows`       VARCHAR(255) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `strategy_outcomes`
(
	`id`            VARCHAR(36)  NOT NULL,
	`name`          VARCHAR(255) NOT NULL,
	`description`   VARCHAR(255) DEFAULT NULL,
	`value_streams` VARCHAR(255) DEFAULT NULL,
	`goals`         VARCHAR(255) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `strategy_goals`
(
	`id`          VARCHAR(36)  NOT NULL,
	`name`        VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) DEFAULT NULL,
	`outcomes`    VARCHAR(255) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
