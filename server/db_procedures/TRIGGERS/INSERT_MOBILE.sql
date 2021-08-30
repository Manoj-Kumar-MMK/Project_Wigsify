--------------- INSERT MOBILE TRIGGER -----------------

DELIMITER $$
CREATE TRIGGER validate_mobile_insert
BEFORE INSERT ON users FOR EACH ROW
BEGIN
	CALL validate_mobile(NEW.mobile);
END$$
DELIMITER ;