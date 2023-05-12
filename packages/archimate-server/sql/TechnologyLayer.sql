-- technology_device table
CREATE TABLE technology_device
(
	id            VARCHAR(36)  NOT NULL PRIMARY KEY,
	name          VARCHAR(255) NOT NULL,
	documentation TEXT,
	technology    VARCHAR(255) NOT NULL
);

-- technology_network table
CREATE TABLE technology_network
(
	id            VARCHAR(36)  NOT NULL PRIMARY KEY,
	name          VARCHAR(255) NOT NULL,
	documentation TEXT,
	technology    VARCHAR(255) NOT NULL
);

-- technology_system_software table
CREATE TABLE technology_system_software
(
	id            VARCHAR(36)  NOT NULL PRIMARY KEY,
	name          VARCHAR(255) NOT NULL,
	documentation TEXT,
	technology    VARCHAR(255) NOT NULL
);

-- technology_infrastructure_interface table
CREATE TABLE technology_infrastructure_interface
(
	id            VARCHAR(36)  NOT NULL PRIMARY KEY,
	name          VARCHAR(255) NOT NULL,
	documentation TEXT,
	technology    VARCHAR(255) NOT NULL
);
