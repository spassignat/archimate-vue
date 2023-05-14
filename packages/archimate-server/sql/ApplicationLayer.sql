CREATE TABLE application_component
(
	id            VARCHAR(36) PRIMARY KEY,
	name          VARCHAR(255),
	documentation TEXT,
	layer         VARCHAR(255),
	code          VARCHAR(255),
	category      VARCHAR(255),
	subsystem     VARCHAR(255),
	location      VARCHAR(255),
	owner         VARCHAR(255),
	version       VARCHAR(255),
	events        TEXT,
	data_objects  TEXT
);

CREATE TABLE application_interface
(
	id                    VARCHAR(36) PRIMARY KEY,
	name                  VARCHAR(255),
	documentation         TEXT,
	communication_network VARCHAR(255)
);

CREATE TABLE application_interaction
(
	id            VARCHAR(36) PRIMARY KEY,
	name          VARCHAR(255),
	documentation TEXT,
	layer         VARCHAR(255),
	code          VARCHAR(255),
	category      VARCHAR(255),
	subsystem     VARCHAR(255),
	location      VARCHAR(255),
	owner         VARCHAR(255),
	version       VARCHAR(255),
	interactions  TEXT,
	processes     TEXT
);
CREATE TABLE application_collaboration
(
	id                        VARCHAR(36) PRIMARY KEY,
	name                      VARCHAR(255),
	documentation             TEXT,
	interaction_processEvents TEXT
);
CREATE TABLE application_function
(
	id            VARCHAR(36) PRIMARY KEY,
	name          VARCHAR(255),
	documentation TEXT
);

CREATE TABLE application_process
(
	id            VARCHAR(36) PRIMARY KEY,
	name          VARCHAR(255),
	documentation TEXT,
	layer         VARCHAR(255),
	code          VARCHAR(255),
	category      VARCHAR(255),
	subsystem     VARCHAR(255),
	location      VARCHAR(255),
	owner         VARCHAR(255),
	version       VARCHAR(255),
	events        TEXT,
	services      TEXT
);

CREATE TABLE application_event
(
	id            VARCHAR(36) PRIMARY KEY,
	name          VARCHAR(255),
	documentation TEXT,
	layer         VARCHAR(255),
	code          VARCHAR(255),
	category      VARCHAR(255),
	subsystem     VARCHAR(255),
	location      VARCHAR(255),
	owner         VARCHAR(255),
	version       VARCHAR(255),
	data_objects  TEXT,
	sources       TEXT,
	targets       TEXT
);

CREATE TABLE application_service
(
	id            VARCHAR(36) PRIMARY KEY,
	name          VARCHAR(255),
	documentation TEXT,
	layer         VARCHAR(255),
	code          VARCHAR(255),
	category      VARCHAR(255),
	subsystem     VARCHAR(255),
	location      VARCHAR(255),
	owner         VARCHAR(255),
	version       VARCHAR(255),
	data_objects  TEXT,
	interactions  TEXT
);

CREATE TABLE application_data_object
(
	id            VARCHAR(36) PRIMARY KEY,
	name          VARCHAR(255),
	documentation TEXT,
	layer         VARCHAR(255),
	code          VARCHAR(255),
	category      VARCHAR(255),
	subsystem     VARCHAR(255),
	location      VARCHAR(255),
	owner         VARCHAR(255),
	version       VARCHAR(255),
	sources       TEXT,
	targets       TEXT,
	data_type     VARCHAR(255),
	is_collection BOOLEAN,
	is_identifier BOOLEAN
);

CREATE TABLE application_element
(
	id            VARCHAR(36) PRIMARY KEY,
	name          VARCHAR(255),
	documentation TEXT,
	layer         VARCHAR(255),
	code          VARCHAR(255),
	category      VARCHAR(255),
	subsystem     VARCHAR(255),
	location      VARCHAR(255),
	owner         VARCHAR(255),
	version       VARCHAR(255)
);
