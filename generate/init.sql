-- MySQL Script generated by MySQL Workbench
-- Wed Jul 18 20:35:47 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema qmtooldb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `qmtooldb` ;

-- -----------------------------------------------------
-- Schema qmtooldb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `qmtooldb` DEFAULT CHARACTER SET utf8mb4 ;
USE `qmtooldb` ;

-- -----------------------------------------------------
-- Table `qmtooldb`.`action`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`action` (
  `action_id` INT(11) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`action_id`),
  UNIQUE INDEX `action_id_UNIQUE` (`action_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qmtooldb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`user` (
  `user_id` VARCHAR(8) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `is_available` TINYINT(1) NOT NULL DEFAULT 0,
  `usage_percent` INT(3) NOT NULL DEFAULT 1.0,
  `current_q_days` INT(6) NOT NULL DEFAULT 0,
  `incident_threshold` INT(10) NOT NULL DEFAULT 3,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `INUMBER_UNIQUE` (`user_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qmtooldb`.`actionentrylog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`actionentrylog` (
  `log_id` INT(11) NOT NULL AUTO_INCREMENT,
  `logger_id` VARCHAR(8) NULL DEFAULT NULL,
  `action_id` INT(11) NOT NULL,
  `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `affected_user_id` VARCHAR(8) NOT NULL,
  `custom_description` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  INDEX `fk_i_number_idx` (`logger_id` ASC),
  INDEX `fk_action_id_idx` (`action_id` ASC),
  UNIQUE INDEX `log_id_UNIQUE` (`log_id` ASC),
  INDEX `fk_actionentrylog_user1_idx` (`affected_user_id` ASC),
  CONSTRAINT `fk_action_id`
    FOREIGN KEY (`action_id`)
    REFERENCES `qmtooldb`.`action` (`action_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_logger_i_number`
    FOREIGN KEY (`logger_id`)
    REFERENCES `qmtooldb`.`user` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_affected_i_number`
    FOREIGN KEY (`affected_user_id`)
    REFERENCES `qmtooldb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qmtooldb`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`product` (
  `product_id` INT(11) NOT NULL AUTO_INCREMENT,
  `short_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`product_id`, `short_name`),
  UNIQUE INDEX `short_name_UNIQUE` (`short_name` ASC),
  UNIQUE INDEX `product_id_UNIQUE` (`product_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qmtooldb`.`incident`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`incident` (
  `incident_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(8) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `log_id` INT(11) NULL,
  PRIMARY KEY (`incident_id`),
  INDEX `fk_Incident_User1_idx` (`user_id` ASC),
  INDEX `fk_product_id_idx` (`product_id` ASC),
  UNIQUE INDEX `incident_id_UNIQUE` (`incident_id` ASC),
  INDEX `fk_incident_actionentrylog1_idx` (`log_id` ASC),
  CONSTRAINT `fk_user_i_number`
    FOREIGN KEY (`user_id`)
    REFERENCES `qmtooldb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `qmtooldb`.`product` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_entrylog_id`
    FOREIGN KEY (`log_id`)
    REFERENCES `qmtooldb`.`actionentrylog` (`log_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qmtooldb`.`qmuser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`qmuser` (
  `user_id` VARCHAR(8) NULL,
  INDEX `fk_QmUser_User1_idx` (`user_id` ASC),
  UNIQUE INDEX `user_i_number_UNIQUE` (`user_id` ASC),
  CONSTRAINT `fk_QmUser_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `qmtooldb`.`user` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qmtooldb`.`user_supports_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`user_supports_product` (
  `user_id` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  CONSTRAINT `fk_user_supports_product_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `qmtooldb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

USE `qmtooldb`;

DELIMITER $$
USE `qmtooldb`$$
CREATE DEFINER = CURRENT_USER TRIGGER `qmtooldb`.`user_AFTER_INSERT` AFTER INSERT ON `user` FOR EACH ROW
BEGIN
	INSERT INTO `qmtooldb`.`user_supports_product`(`user_id`) VALUES (NEW.user_id);
END$$

USE `qmtooldb`$$
CREATE DEFINER = CURRENT_USER TRIGGER `qmtooldb`.`incident_BEFORE_INSERT` BEFORE INSERT ON `incident` FOR EACH ROW
BEGIN
	SET @dummy_user = NEW.user_id;
	INSERT INTO `qmtooldb`.`actionentrylog` (`logger_id`, `action_id`, `affected_user_id`) SELECT user_id, '2', @dummy_user FROM qmtooldb.qmuser;
    SET NEW.log_id = last_insert_id();
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
