
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

INSERT IGNORE INTO `qmtooldb`.`user`
(`i_number`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`)
VALUES
("i100004",
"Logger",
"Log",
"0",
"1.0",
"10",
3);

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
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100000','1','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100000','1','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100000','2','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100000','3','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100000','3','i100004');

INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100001','1','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100001','1','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100001','2','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100001','3','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100001','3','i100004');

INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100002','2','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100002','2','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100002','2','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100002','3','i100004');
INSERT IGNORE INTO qmtooldb.incident (i_number, product_id, logger_id) VALUES ('i100002','3','i100004');

