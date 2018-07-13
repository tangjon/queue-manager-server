USE qmtooldb;
-- ======================
-- GENERATE PRODUCTS
-- ======================
SET @product = "NW";
INSERT INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('1',@product);
ALTER TABLE qmtooldb.user_supports_product 
ADD NW INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT FOREIGN KEY (`NW`) REFERENCES `qmtooldb`.`product` (`product_id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

SET @product = "MS";
INSERT INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('2',@product);
ALTER TABLE qmtooldb.user_supports_product 
ADD MS INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT FOREIGN KEY (`MS`) REFERENCES `qmtooldb`.`product` (`product_id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

SET @product = "BW4";
INSERT INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('3',@product);
ALTER TABLE qmtooldb.user_supports_product 
ADD BW4 INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT FOREIGN KEY (`BW4`) REFERENCES `qmtooldb`.`product` (`product_id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

SET @product = "RCC";
INSERT INTO `qmtooldb`.`product`
(`product_id`,`short_name`)
VALUES
('4',@product);
ALTER TABLE qmtooldb.user_supports_product 
ADD RCC INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT FOREIGN KEY (`RCC`) REFERENCES `qmtooldb`.`product` (`product_id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- =====================
-- GENERATE USERS
-- =====================
INSERT INTO `qmtooldb`.`user`(`user_id`,
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

INSERT INTO `qmtooldb`.`user`(`user_id`,
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

INSERT INTO `qmtooldb`.`user`(`user_id`,
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


INSERT INTO `qmtooldb`.`user`(`user_id`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`)VALUES("i100003",
"Bobby",
"Chan",
"0",
"1.0",
"10",
3);
-- =====================
-- ASSIGN ROLES
-- =====================
UPDATE user_supports_product usp SET RCC = (SELECT product_id FROM product p WHERE p.short_name = "RCC") WHERE usp.user_id = 'i100000';

-- =====================
-- SET QM
-- =====================

INSERT INTO `qmtooldb`.`qmuser` (`user_id`) VALUES ('i100000');

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
UPDATE user_supports_product usp SET RCC = (SELECT product_id FROM product p WHERE p.short_name = "RCC") WHERE usp.user_id = 'i100000';

UPDATE user_supports_product usp SET RCC = (SELECT product_id FROM product p WHERE p.short_name = "RCC") WHERE usp.user_id = 'i100001';

UPDATE user_supports_product usp SET RCC = (SELECT product_id FROM product p WHERE p.short_name = "RCC") WHERE usp.user_id = 'i100002';

UPDATE user_supports_product usp SET NW = (SELECT product_id FROM product p WHERE p.short_name = "NW") WHERE usp.user_id = 'i100000';

UPDATE user_supports_product usp SET NW = (SELECT product_id FROM product p WHERE p.short_name = "NW") WHERE usp.user_id = 'i100001';

UPDATE user_supports_product usp SET NW = (SELECT product_id FROM product p WHERE p.short_name = "NW") WHERE usp.user_id = 'i100002';

-- =====================
-- GENERATE INCIDENTS
-- =====================
SET @MIN_PRODUCT_ID = 1;
SET @MAX_PRODUCT_ID = 3;
SET @dummy_user = 'i100000';
INSERT INTO qmtooldb.incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO qmtooldb.incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO qmtooldb.incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);

SET @dummy_user = 'i100001';
INSERT INTO qmtooldb.incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO qmtooldb.incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO qmtooldb.incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);


SET @dummy_user = 'i100002';
INSERT INTO qmtooldb.incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO qmtooldb.incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO qmtooldb.incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);

-- =====================
-- TOGGLE USERS
-- =====================
UPDATE `qmtooldb`.`user`
SET `is_available` = "0" WHERE `user_id` = 'i100000';

SELECT * FROM user WHERE `user_id` = 'i100000';

-- =====================
-- COUNT THE NUMBER OF INCIDENTS
-- =====================

