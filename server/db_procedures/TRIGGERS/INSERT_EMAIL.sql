
--------------- VALIDATE EMAIL TRIGGER -----------------

DELIMITER $$
CREATE TRIGGER validate_users_insert
BEFORE INSERT ON users FOR EACH ROW
BEGIN
	CALL validate_users(NEW.email);
END$$
DELIMITER ;
