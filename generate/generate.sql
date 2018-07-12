
-- ======================
-- GENERATE PRODUCTS
-- ======================
INSERT IGNORE INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('1','NW');

INSERT IGNORE INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('2','MS');

INSERT IGNORE INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('3','BW4');

INSERT IGNORE INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('4','RTC');

-- =====================
-- GENERATE USERS
-- =====================
INSERT IGNORE INTO `qmtooldb`.`user`(`i_number`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`) VALUES("i100000",
"John",
"Doe",
"0",
"1.0",
"10",
3);

INSERT IGNORE INTO `qmtooldb`.`user`(`i_number`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`)VALUES("i100001",
"Jane",
"Doe",
"0",
"1.0",
"10",
3);

INSERT IGNORE INTO `qmtooldb`.`user`(`i_number`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`)VALUES("i100002",
"Bobby",
"Chan",
"0",
"1.0",
"10",
3);

-- =====================
-- SET QM
-- =====================

INSERT INTO `qmtooldb`.`qmuser` (`i_number`) VALUES ('i100000');

-- ====================
-- GENERATE ACTIONS
-- ====================
INSERT INTO `qmtooldb`.`action`(`action_id`,
`description`)VALUES(1,
"Custom Message");

INSERT INTO `qmtooldb`.`action`
(`action_id`,
`description`)
VALUES
(2,
"Incident Assigned");

INSERT INTO `qmtooldb`.`action`
(`action_id`,
`description`)
VALUES
(3,
"Incident Unassigned");

INSERT INTO `qmtooldb`.`action`
(`action_id`,
`description`)
VALUES
(4,
"Availability Changed");

INSERT INTO `qmtooldb`.`action`
(`action_id`,
`description`)
VALUES
(5,
"Queue Days Changed");

-- =====================
-- ADD SUPPORT PRODUCTS
-- =====================
INSERT ignore INTO `qmtooldb`.`user_has_product`
(`User_i_number`,
`product_id`)
VALUES
('i100000',
1);

INSERT ignore INTO `qmtooldb`.`user_has_product`
(`User_i_number`,
`product_id`)
VALUES
('i100000',
2);

INSERT ignore INTO `qmtooldb`.`user_has_product`
(`User_i_number`,
`product_id`)
VALUES
('i100000',
3);

INSERT ignore INTO `qmtooldb`.`user_has_product`
(`User_i_number`,
`product_id`)
VALUES
('i100001',
1);

INSERT ignore INTO `qmtooldb`.`user_has_product`
(`User_i_number`,
`product_id`)
VALUES
('i100001',
2);

INSERT ignore INTO `qmtooldb`.`user_has_product`
(`User_i_number`,
`product_id`)
VALUES
('i100001',
3);

INSERT ignore INTO `qmtooldb`.`user_has_product`
(`User_i_number`,
`product_id`)
VALUES
('i100002',
2);

INSERT ignore INTO `qmtooldb`.`user_has_product`
(`User_i_number`,
`product_id`)
VALUES
('i100002',
3);

-- =====================
-- GENERATE INCIDENTS
-- =====================


-- CREATE AN INCIDENT
INSERT INTO `qmtooldb`.`actionentrylog` (`logger_i_number`, `action_id`, `action_summary`) SELECT i_number, '2', 'Incident Added' FROM qmtooldb.qmuser;
SELECT *
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = "qmtooldb"
AND TABLE_NAME = "actionentrylog";
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100000','1');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100000','1');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100000','2');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100000','3');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100000','3');

INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100001','1');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100001','1');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100001','2');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100001','3');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100001','3');

INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100002','2');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100002','2');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100002','2');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100002','3');
INSERT INTO qmtooldb.incident (i_number, product_id) VALUES ('i100002','3');

