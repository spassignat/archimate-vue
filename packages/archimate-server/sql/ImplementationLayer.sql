-- Table for ImplementationProcess
CREATE TABLE IF NOT EXISTS `implementation_process`
(
	`id`                    VARCHAR(36)  NOT NULL,
	`name`                  VARCHAR(255) NOT NULL,
	`documentation`         TEXT        DEFAULT NULL,
	`type`                  VARCHAR(20) DEFAULT NULL,
	`is_externally_managed` TINYINT(1)  DEFAULT NULL,
	`is_encapsulated`       TINYINT(1)  DEFAULT NULL,
	`is_abstract`           TINYINT(1)  DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- Table for WorkPackage
CREATE TABLE IF NOT EXISTS `implementation_work_package`
(
	`id`                    VARCHAR(36)  NOT NULL,
	`name`                  VARCHAR(255) NOT NULL,
	`documentation`         TEXT        DEFAULT NULL,
	`type`                  VARCHAR(20) DEFAULT NULL,
	`is_externally_managed` TINYINT(1)  DEFAULT NULL,
	`is_encapsulated`       TINYINT(1)  DEFAULT NULL,
	`is_abstract`           TINYINT(1)  DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- Table for Plateau
CREATE TABLE IF NOT EXISTS `implementation_plateau`
(
	`id`                    VARCHAR(36)  NOT NULL,
	`name`                  VARCHAR(255) NOT NULL,
	`documentation`         TEXT        DEFAULT NULL,
	`type`                  VARCHAR(20) DEFAULT NULL,
	`is_externally_managed` TINYINT(1)  DEFAULT NULL,
	`is_encapsulated`       TINYINT(1)  DEFAULT NULL,
	`is_abstract`           TINYINT(1)  DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- Table for Artifact
CREATE TABLE IF NOT EXISTS `implementation_artifact`
(
	`id`                    VARCHAR(36)  NOT NULL,
	`name`                  VARCHAR(255) NOT NULL,
	`documentation`         TEXT        DEFAULT NULL,
	`type`                  VARCHAR(20) DEFAULT NULL,
	`is_externally_managed` TINYINT(1)  DEFAULT NULL,
	`is_encapsulated`       TINYINT(1)  DEFAULT NULL,
	`is_abstract`           TINYINT(1)  DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
