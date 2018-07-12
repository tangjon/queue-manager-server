
-- ======================
-- GENERATE PRODUCTS
-- ======================
INSERT INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('1','NW');

INSERT INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('2','MS');

INSERT INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('3','BW4');

INSERT INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('4','RTC');

-- =====================
-- GENERATE USERS
-- =====================
INSERT INTO `qmtooldb`.`user`(`i_number`,
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

INSERT INTO `qmtooldb`.`user`(`i_number`,
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

INSERT INTO `qmtooldb`.`user`(`i_number`,
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

INSERT INTO `qmtooldb`.`qmuser` (`user_i_number`) VALUES ('i100000');

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
SET @MIN_PRODUCT_ID = 1;
SET @MAX_PRODUCT_ID = 3;
SET @dummy_user = 'i100000';
INSERT INTO qmtooldb.incident (i_number, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
SELECT * FROM incident, actionentrylog, action WHERE incident.entrylog_id = actionentrylog.log_id and action.action_id = actionentrylog.action_id;

INSERT INTO `qmtooldb`.`actionentrylog` (`logger_i_number`, `action_id`, `affected_i_number`) SELECT user_i_number, '2', @dummy_user FROM qmtooldb.qmuser;
INSERT INTO qmtooldb.incident (entrylog_id,i_number, product_id) SELECT  last_insert_id(),@dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `qmtooldb`.`actionentrylog` (`logger_i_number`, `action_id`, `affected_i_number`) SELECT user_i_number, '2', @dummy_user FROM qmtooldb.qmuser;
INSERT INTO qmtooldb.incident (entrylog_id,i_number, product_id) SELECT last_insert_id(),@dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `qmtooldb`.`actionentrylog` (`logger_i_number`, `action_id`, `affected_i_number`) SELECT user_i_number, '2', @dummy_user FROM qmtooldb.qmuser;
INSERT INTO qmtooldb.incident (entrylog_id,i_number, product_id) SELECT last_insert_id(),@dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);

SET @dummy_user = 'i100001';
INSERT INTO `qmtooldb`.`actionentrylog` (`logger_i_number`, `action_id`, `affected_i_number`) SELECT user_i_number, '2', @dummy_user FROM qmtooldb.qmuser;
INSERT INTO qmtooldb.incident (entrylog_id,i_number, product_id) SELECT  last_insert_id(),@dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `qmtooldb`.`actionentrylog` (`logger_i_number`, `action_id`, `affected_i_number`) SELECT user_i_number, '2', @dummy_user FROM qmtooldb.qmuser;
INSERT INTO qmtooldb.incident (entrylog_id,i_number, product_id) SELECT last_insert_id(),@dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `qmtooldb`.`actionentrylog` (`logger_i_number`, `action_id`, `affected_i_number`) SELECT user_i_number, '2', @dummy_user FROM qmtooldb.qmuser;
INSERT INTO qmtooldb.incident (entrylog_id,i_number, product_id) SELECT last_insert_id(),@dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);

SET @dummy_user = 'i100002';
INSERT INTO `qmtooldb`.`actionentrylog` (`logger_i_number`, `action_id`, `affected_i_number`) SELECT user_i_number, '2', @dummy_user FROM qmtooldb.qmuser;
INSERT INTO qmtooldb.incident (entrylog_id,i_number, product_id) SELECT  last_insert_id(),@dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `qmtooldb`.`actionentrylog` (`logger_i_number`, `action_id`, `affected_i_number`) SELECT user_i_number, '2', @dummy_user FROM qmtooldb.qmuser;
INSERT INTO qmtooldb.incident (entrylog_id,i_number, product_id) SELECT last_insert_id(),@dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `qmtooldb`.`actionentrylog` (`logger_i_number`, `action_id`, `affected_i_number`) SELECT user_i_number, '2', @dummy_user FROM qmtooldb.qmuser;
INSERT INTO qmtooldb.incident (entrylog_id,i_number, product_id) SELECT last_insert_id(),@dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);

-- =====================
-- TOGGLE USERS
-- =====================
UPDATE `qmtooldb`.`user`
SET `is_available` = "0" WHERE `i_number` = 'i100000';

SELECT * FROM user WHERE `i_number` = 'i100000';

-- =====================
-- COUNT THE NUMBER OF INCIDENTS
-- =====================
SELECT COUNT(*) AS "CAT" FROM USER;
