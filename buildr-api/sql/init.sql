-- Battlefield Role
CREATE TABLE battlefield_role
(
  id SERIAL PRIMARY KEY,
  description VARCHAR(50) NOT NULL
);
CREATE INDEX ix_battlefield_role ON battlefield_role (id);

-- Faction
CREATE TABLE faction
(
  id SERIAL PRIMARY KEY,
  description VARCHAR(50) NOT NULL
);
CREATE INDEX ix_faction ON faction (id);

-- Sub Faction
CREATE TABLE sub_faction
(
  id SERIAL PRIMARY KEY,
  faction_id INTEGER NOT NULL,
  description VARCHAR(50) NOT NULL,
  FOREIGN KEY (faction_id) REFERENCES faction(id) ON DELETE CASCADE
);
CREATE INDEX ix_sub_faction ON sub_faction (id);

-- Datasheet
CREATE TABLE datasheet
(
  id SERIAL PRIMARY KEY,
  battlefield_role_id INTEGER NOT NULL,
  sub_faction_id INTEGER NOT NULL,
  minimum_models INTEGER NOT NULL,
  maximum_models INTEGER NOT NULL,
  description VARCHAR(50) NOT NULL,
  points INTEGER NOT NULL,
  FOREIGN KEY (battlefield_role_id) REFERENCES battlefield_role(id) ON DELETE CASCADE,
  FOREIGN KEY (sub_faction_id) REFERENCES sub_faction(id) ON DELETE CASCADE
);
CREATE INDEX ix_datasheet ON datasheet (id);

-- Datasheet Upgrade
CREATE TABLE datasheet_upgrade
(
  id SERIAL PRIMARY KEY,
  datasheet_id INTEGER NOT NULL,
  description VARCHAR(50) NOT NULL,
  points INTEGER NOT NULL,
  FOREIGN KEY (datasheet_id) REFERENCES datasheet(id) ON DELETE CASCADE
);
CREATE INDEX ix_datasheet_upgrade ON datasheet_upgrade (id);
