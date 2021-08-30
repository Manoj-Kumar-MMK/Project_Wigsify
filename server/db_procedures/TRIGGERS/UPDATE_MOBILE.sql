
------------ UPDATE MOBILE TRIGGER --------------------
DELIMITER $$
CREATE TRIGGER validate_mobile_update
BEFORE UPDATE ON users FOR EACH ROW
BEGIN
	CALL validate_mobile(NEW.mobile);
END$$
DELIMITER ;


