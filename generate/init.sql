-- MySQL Script generated by MySQL Workbench
-- Thu Jul 12 16:38:04 2018
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qmtooldb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`user` (
  `i_number` VARCHAR(8) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `is_available` TINYINT(1) NOT NULL DEFAULT '0',
  `usage_percent` INT(3) NOT NULL DEFAULT 1.0,
  `current_q_days` INT(6) NOT NULL DEFAULT 0,
  `incident_threshold` INT(10) NOT NULL DEFAULT 3,
  PRIMARY KEY (`i_number`),
  UNIQUE INDEX `INUMBER_UNIQUE` (`i_number` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qmtooldb`.`actionentrylog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`actionentrylog` (
  `log_id` INT(11) NOT NULL AUTO_INCREMENT,
  `logger_i_number` VARCHAR(8) NULL DEFAULT NULL,
  `action_id` INT(11) NOT NULL,
  `time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `affected_i_number` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`log_id`),
  INDEX `fk_i_number_idx` (`logger_i_number` ASC),
  INDEX `fk_action_id_idx` (`action_id` ASC),
  UNIQUE INDEX `log_id_UNIQUE` (`log_id` ASC),
  INDEX `fk_actionentrylog_user1_idx` (`affected_i_number` ASC),
  CONSTRAINT `fk_action_id`
    FOREIGN KEY (`action_id`)
    REFERENCES `qmtooldb`.`action` (`action_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_logger_i_number`
    FOREIGN KEY (`logger_i_number`)
    REFERENCES `qmtooldb`.`user` (`i_number`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_affected_i_number`
    FOREIGN KEY (`affected_i_number`)
    REFERENCES `qmtooldb`.`user` (`i_number`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qmtooldb`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`product` (
  `product_id` INT(11) NOT NULL AUTO_INCREMENT,
  `short_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE INDEX `short_name_UNIQUE` (`short_name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qmtooldb`.`incident`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`incident` (
  `incident_id` INT(11) NOT NULL AUTO_INCREMENT,
  `i_number` VARCHAR(8) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `entrylog_id` INT(11) NULL,
  PRIMARY KEY (`incident_id`),
  INDEX `fk_Incident_User1_idx` (`i_number` ASC),
  INDEX `fk_product_id_idx` (`product_id` ASC),
  UNIQUE INDEX `incident_id_UNIQUE` (`incident_id` ASC),
  INDEX `fk_incident_actionentrylog1_idx` (`entrylog_id` ASC),
  CONSTRAINT `fk_user_i_number`
    FOREIGN KEY (`i_number`)
    REFERENCES `qmtooldb`.`user` (`i_number`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `qmtooldb`.`product` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_entrylog_id`
    FOREIGN KEY (`entrylog_id`)
    REFERENCES `qmtooldb`.`actionentrylog` (`log_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qmtooldb`.`qmuser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`qmuser` (
  `user_i_number` VARCHAR(8) NULL,
  INDEX `fk_QmUser_User1_idx` (`user_i_number` ASC),
  UNIQUE INDEX `user_i_number_UNIQUE` (`user_i_number` ASC),
  CONSTRAINT `fk_QmUser_User1`
    FOREIGN KEY (`user_i_number`)
    REFERENCES `qmtooldb`.`user` (`i_number`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qmtooldb`.`user_has_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qmtooldb`.`user_has_product` (
  `user_i_number` VARCHAR(8) NOT NULL,
  `product_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_i_number`, `product_id`),
  INDEX `fk_User_has_Product_Product1_idx` (`product_id` ASC),
  INDEX `fk_User_has_Product_User1_idx` (`user_i_number` ASC),
  CONSTRAINT `fk_User_has_Product`
    FOREIGN KEY (`product_id`)
    REFERENCES `qmtooldb`.`product` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_User_has_Product_User`
    FOREIGN KEY (`user_i_number`)
    REFERENCES `qmtooldb`.`user` (`i_number`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `qmtooldb`;

DELIMITER $$
USE `qmtooldb`$$
CREATE DEFINER = CURRENT_USER TRIGGER `qmtooldb`.`incident_BEFORE_INSERT` BEFORE INSERT ON `incident` FOR EACH ROW
BEGIN
	SET @dummy_user = NEW.i_number;
	INSERT INTO `qmtooldb`.`actionentrylog` (`logger_i_number`, `action_id`, `affected_i_number`) SELECT user_i_number, '2', @dummy_user FROM qmtooldb.qmuser;
    SET NEW.entrylog_id = last_insert_id();
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
