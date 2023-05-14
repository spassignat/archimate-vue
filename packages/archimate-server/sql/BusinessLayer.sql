CREATE TABLE business_actor
(
	id            VARCHAR(36)  NOT NULL,
	name          VARCHAR(255) NOT NULL,
	documentation TEXT         DEFAULT NULL,
	business_role VARCHAR(255) DEFAULT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE business_collaboration
(
	id            VARCHAR(36)  NOT NULL,
	name          VARCHAR(255) NOT NULL,
	documentation TEXT DEFAULT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE business_role
(
	id                        VARCHAR(36)  NOT NULL,
	name                      VARCHAR(255),
	documentation             VARCHAR(255),
	business_collaboration_id VARCHAR(36)  NOT NULL,
	business_role             VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (business_collaboration_id) REFERENCES business_collaboration (id)
);

CREATE TABLE business_function
(
	id                        VARCHAR(36) NOT NULL,
	name                      VARCHAR(255),
	documentation             VARCHAR(255),
	business_collaboration_id VARCHAR(36) NOT NULL,
	function_id               VARCHAR(36) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (business_collaboration_id) REFERENCES business_collaboration (id),
	FOREIGN KEY (function_id) REFERENCES business_function (id)
);

CREATE TABLE business_interaction
(
	id                        VARCHAR(36) NOT NULL,
	name                      VARCHAR(255),
	documentation             VARCHAR(255),
	business_collaboration_id VARCHAR(36) NOT NULL,
	interaction_id            VARCHAR(36) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (business_collaboration_id) REFERENCES business_collaboration (id),
	FOREIGN KEY (interaction_id) REFERENCES business_interaction (id)
);

CREATE TABLE business_event
(
	id            VARCHAR(36) NOT NULL,
	name          VARCHAR(255),
	documentation VARCHAR(255),
	event_type    VARCHAR(255)
);

CREATE TABLE business_object
(
	id            VARCHAR(36) NOT NULL,
	name          VARCHAR(255),
	documentation VARCHAR(255),
	business_role    VARCHAR(255)
);
