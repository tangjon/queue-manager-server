USE qmtooldb_dev;
-- ======================
-- GENERATE PRODUCTS
-- ======================
SET @product = "NW";
INSERT INTO `product`
(`product_id`,`short_name`)
VALUES
('1',@product);
ALTER TABLE user_supports_product
ADD NW INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT NW FOREIGN KEY (`NW`) REFERENCES `product` (`product_id`)
ON DELETE SET NULL
ON UPDATE CASCADE;

SET @product = "MS";
INSERT INTO `product`
(`product_id`,`short_name`)
VALUES
('2',@product);
ALTER TABLE user_supports_product
ADD MS INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT MS FOREIGN KEY (`MS`) REFERENCES `product` (`product_id`)
ON DELETE SET NULL
ON UPDATE CASCADE;

SET @product = "BW4";
INSERT INTO `product`
(`product_id`,`short_name`)
VALUES
('3',@product);
ALTER TABLE user_supports_product
ADD BW4 INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT BW4 FOREIGN KEY (`BW4`) REFERENCES `product` (`product_id`)
ON DELETE SET NULL
ON UPDATE CASCADE;

SET @product = "DSM";
INSERT INTO `product`
(`product_id`,`short_name`)
VALUES
('4',@product);
ALTER TABLE user_supports_product
ADD DSM INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT DSM FOREIGN KEY (`DSM`) REFERENCES `product` (`product_id`)
ON DELETE SET NULL
ON UPDATE CASCADE;

SET @product = "BFC_EA_IC_FIM";
INSERT INTO `product`
(`short_name`)
VALUES
(@product);
ALTER TABLE user_supports_product
ADD BFC_EA_IC_FIM INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT BFC_EA_IC_FIM FOREIGN KEY (`BFC_EA_IC_FIM`) REFERENCES `product` (`product_id`)
ON DELETE SET NULL
ON UPDATE CASCADE;

SET @product = "LOD_ANA_PL";
INSERT INTO `product`
(`short_name`)
VALUES
(@product);
ALTER TABLE user_supports_product
ADD LOD_ANA_PL INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT LOD_ANA_PL FOREIGN KEY (`LOD_ANA_PL`) REFERENCES `product` (`product_id`)
ON DELETE SET NULL
ON UPDATE CASCADE;

SET @product = "PCM";
INSERT INTO `product`
(`short_name`)
VALUES
(@product);
ALTER TABLE user_supports_product
ADD PCM INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT PCM FOREIGN KEY (`PCM`) REFERENCES `product` (`product_id`)
ON DELETE SET NULL
ON UPDATE CASCADE;

SET @product = "RTC";
INSERT INTO `product`
(`short_name`)
VALUES
(@product);
ALTER TABLE user_supports_product
ADD RTC INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT RTC FOREIGN KEY (`RTC`) REFERENCES `product` (`product_id`)
ON DELETE SET NULL
ON UPDATE CASCADE;

SET @product = "SA";
INSERT INTO `product`
(`short_name`)
VALUES
(@product);
ALTER TABLE user_supports_product
ADD SA INT(11) NULL DEFAULT NULL,
ADD CONSTRAINT SA FOREIGN KEY (`SA`) REFERENCES `product` (`product_id`)
ON DELETE SET NULL
ON UPDATE CASCADE;

-- =====================
-- GENERATE USERS
-- =====================
INSERT INTO `user`(`user_id`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`) VALUES("i100000",
"John",
"",
"0",
"1.0",
"10",
3);

INSERT INTO `user`(`user_id`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`)VALUES("i100001",
"Jane",
"",
"0",
"1.0",
"10",
3);

INSERT INTO `user`(`user_id`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`)VALUES("i100002",
"Chucky",
"",
"0",
"1.0",
"10",
3);


INSERT INTO `user`(`user_id`,
`first_name`,
`last_name`,
`is_available`,
`usage_percent`,
`current_q_days`,
`incident_threshold`)VALUES("i100003",
"Bobby",
"",
"0",
"1.0",
"10",
3);



-- =====================
-- SET QM
-- =====================

INSERT INTO `qmuser` (`user_id`) VALUES ('i100000');

-- ====================
-- GENERATE ACTIONS
-- ====================
INSERT INTO `action`(`action_id`,
`description`)VALUES(1,
"Custom Message");

INSERT INTO `action`
(`action_id`,
`description`)
VALUES
(2,
"Incident Assigned");

INSERT INTO `action`
(`action_id`,
`description`)
VALUES
(3,
"Incident Unassigned");

INSERT INTO `action`
(`action_id`,
`description`)
VALUES
(4,
"Availability Changed");

INSERT INTO `action`
(`action_id`,
`description`)
VALUES
(5,
"Queue Days Changed");


INSERT INTO `action`
(`action_id`,
`description`)
VALUES
(6,
"Product Support Changed");


INSERT INTO `action`
(`action_id`,
`description`)
VALUES
(7,
"QM Changed");
-- =====================
-- ADD SUPPORT PRODUCTS TO USERS
-- =====================
UPDATE user_supports_product usp SET MS = (SELECT product_id FROM product p WHERE p.short_name = "MS") WHERE usp.user_id = 'i100000';
UPDATE user_supports_product usp SET MS = (SELECT product_id FROM product p WHERE p.short_name = "MS") WHERE usp.user_id = 'i100001';
UPDATE user_supports_product usp SET MS = (SELECT product_id FROM product p WHERE p.short_name = "MS") WHERE usp.user_id = 'i100002';
UPDATE user_supports_product usp SET MS = (SELECT product_id FROM product p WHERE p.short_name = "MS") WHERE usp.user_id = 'i100003';

UPDATE user_supports_product usp SET NW = (SELECT product_id FROM product p WHERE p.short_name = "NW") WHERE usp.user_id = 'i100000';
UPDATE user_supports_product usp SET NW = (SELECT product_id FROM product p WHERE p.short_name = "NW") WHERE usp.user_id = 'i100001';
UPDATE user_supports_product usp SET NW = (SELECT product_id FROM product p WHERE p.short_name = "NW") WHERE usp.user_id = 'i100002';
UPDATE user_supports_product usp SET NW = (SELECT product_id FROM product p WHERE p.short_name = "NW") WHERE usp.user_id = 'i100003';

UPDATE user_supports_product usp SET BW4 = (SELECT product_id FROM product p WHERE p.short_name = "BW4") WHERE usp.user_id = 'i100000';
UPDATE user_supports_product usp SET BW4 = (SELECT product_id FROM product p WHERE p.short_name = "BW4") WHERE usp.user_id = 'i100001';
UPDATE user_supports_product usp SET BW4 = (SELECT product_id FROM product p WHERE p.short_name = "BW4") WHERE usp.user_id = 'i100002';
UPDATE user_supports_product usp SET BW4 = (SELECT product_id FROM product p WHERE p.short_name = "BW4") WHERE usp.user_id = 'i100003';
-- =====================
-- GENERATE INCIDENTS WITH LOGS
-- =====================
SET @MIN_PRODUCT_ID = 1;
SET @MAX_PRODUCT_ID = 3;
SET @logger = 'i100000';
SET @dummy_user = 'i100000';
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";

SET @dummy_user = 'i100001';
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";



SET @dummy_user = 'i100002';
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";


SET @dummy_user = 'i100003';
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";
INSERT INTO incident (user_id, product_id) SELECT @dummy_user, FLOOR(RAND()*(@MAX_PRODUCT_ID-@MIN_PRODUCT_ID+1)+@MIN_PRODUCT_ID);
INSERT INTO `actionentrylog` (`logger_id`,`action_id`,`affected_user_id`,`detail`) SELECT @logger,2,@dummy_user, "TEST";


-- =====================
-- TOGGLE USERS
-- =====================
UPDATE `user` SET `is_available` = "1" WHERE `user_id` = 'i100000';

-- =====================
-- COUNT THE NUMBER OF INCIDENTS
-- =====================

