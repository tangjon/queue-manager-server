
-- ======================
-- GENERATE PRODUCTS
-- ======================
INSERT IGNORE INTO `qmtooldb`.`product`
(`short_name`)
VALUES
('NW');

INSERT IGNORE INTO `qmtooldb`.`product`
(`short_name`)
VALUES
('MS');

INSERT IGNORE INTO `qmtooldb`.`product`
(`short_name`)
VALUES
('BW4');

INSERT IGNORE INTO `qmtooldb`.`product`
(`short_name`)
VALUES
('RTC');
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


