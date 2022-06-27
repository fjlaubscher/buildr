-- Battlefield Roles
INSERT INTO battlefield_role (description) VALUES ('HQ');
INSERT INTO battlefield_role (description) VALUES ('Troops');
INSERT INTO battlefield_role (description) VALUES ('Elites');
INSERT INTO battlefield_role (description) VALUES ('Fast Attack');
INSERT INTO battlefield_role (description) VALUES ('Flyer');
INSERT INTO battlefield_role (description) VALUES ('Heavy Support');
INSERT INTO battlefield_role (description) VALUES ('Fortification');
INSERT INTO battlefield_role (description) VALUES ('Dedicated Transport');
INSERT INTO battlefield_role (description) VALUES ('Lord of War');

-- Loyalist
INSERT INTO faction (description) VALUES ('Liber Astartes');
INSERT INTO sub_faction (faction_id, description) VALUES (1, 'Blood Angels');
INSERT INTO sub_faction (faction_id, description) VALUES (1, 'Dark Angels');
INSERT INTO sub_faction (faction_id, description) VALUES (1, 'Imperial Fists');
INSERT INTO sub_faction (faction_id, description) VALUES (1, 'Iron Hands');
INSERT INTO sub_faction (faction_id, description) VALUES (1, 'Raven Guard');
INSERT INTO sub_faction (faction_id, description) VALUES (1, 'Space Wolves');
INSERT INTO sub_faction (faction_id, description) VALUES (1, 'Salamanders');
INSERT INTO sub_faction (faction_id, description) VALUES (1, 'Ultramarines');
INSERT INTO sub_faction (faction_id, description) VALUES (1, 'White Scars');

-- Heretic
INSERT INTO faction (description) VALUES ('Liber Hereticus');
INSERT INTO sub_faction (faction_id, description) VALUES (2, 'Alpha Legion');
INSERT INTO sub_faction (faction_id, description) VALUES (2, 'Death Guard');
INSERT INTO sub_faction (faction_id, description) VALUES (2, 'Emperor`s Children');
INSERT INTO sub_faction (faction_id, description) VALUES (2, 'Iron Warriors');
INSERT INTO sub_faction (faction_id, description) VALUES (2, 'Thousand Sons');
INSERT INTO sub_faction (faction_id, description) VALUES (2, 'Night Lords');
INSERT INTO sub_faction (faction_id, description) VALUES (2, 'Sons of Horus');
INSERT INTO sub_faction (faction_id, description) VALUES (2, 'Word Bearers');
INSERT INTO sub_faction (faction_id, description) VALUES (2, 'World Eaters');
