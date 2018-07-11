
-- ======================
-- GENERATE PRODUCTS
-- ======================
INSERT IGNORE INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('0','NW');


INSERT IGNORE INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('1','MS');


INSERT IGNORE INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('2','BW4');

INSERT IGNORE INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('3','RTC');

-- =====================
-- GENERATE USERS
-- =====================
INSERT IGNORE INTO `qmtooldb`.`user`
(`i_number`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`)
VALUES
("i100000",
"John",
"Doe",
"0",
"1.0",
"10",
3);

INSERT IGNORE INTO `qmtooldb`.`incident`
(`i_number`,
`product_id`)
VALUES
(incident_id,
i_number,
product_id);


INSERT IGNORE INTO `qmtooldb`.`user`
(`i_number`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`)
VALUES
("i100001",
"Jane",
"Doe",
"0",
"1.0",
"10",
3);


INSERT IGNORE INTO `qmtooldb`.`user`
(`i_number`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`)
VALUES
("i100002",
"Bobby",
"Chan",
"0",
"1.0",
"10",
3);


-- =====================
-- GENERATE INCIDENTS
-- =====================
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100001','0');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100001','0');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100001','1');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100001','2');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100001','2');

INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100002','0');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100002','0');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100002','1');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100002','2');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100002','2');

INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100000','0');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100000','0');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100000','1');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100000','2');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100000','2');


