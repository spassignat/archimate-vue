CREATE TABLE motivation_stakeholder
(
	id          VARCHAR(36) PRIMARY KEY,
	name        VARCHAR(255) NOT NULL,
	description TEXT,
	role        VARCHAR(255)
);

CREATE TABLE motivation_driver
(
	id          VARCHAR(36) PRIMARY KEY,
	name        VARCHAR(255) NOT NULL,
	description TEXT,
	type        VARCHAR(255)
);

CREATE TABLE motivation_assessment
(
	id          VARCHAR(36) PRIMARY KEY,
	name        VARCHAR(255) NOT NULL,
	description TEXT,
	type        VARCHAR(255),
	value       FLOAT
);

CREATE TABLE motivation_goal
(
	id          VARCHAR(36) PRIMARY KEY,
	name        VARCHAR(255) NOT NULL,
	description TEXT,
	category    VARCHAR(255)
);

CREATE TABLE motivation_outcome
(
	id          VARCHAR(36) PRIMARY KEY,
	name        VARCHAR(255) NOT NULL,
	description TEXT,
	type        VARCHAR(255)
);

CREATE TABLE motivation_requirement
(
	id          VARCHAR(36) PRIMARY KEY,
	name        VARCHAR(255) NOT NULL,
	description TEXT,
	type        VARCHAR(255)
);

CREATE TABLE motivation_constraint
(
	id          VARCHAR(36) PRIMARY KEY,
	name        VARCHAR(255) NOT NULL,
	description TEXT,
	type        VARCHAR(255)
);
