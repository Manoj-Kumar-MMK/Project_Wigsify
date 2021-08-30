
-------------- VALIDATE EMAIL PROCEDURE -------------------

DROP PROCEDURE IF EXISTS validate_users;
DELIMITER $$
CREATE PROCEDURE validate_users(
	IN email VARCHAR(128)
)
DETERMINISTIC
NO SQL
BEGIN
	IF NOT (SELECT email REGEXP '^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$') THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Wrong email';
	END IF;
END$$
DELIMITER ;

--------- VALIDATE PHONE NUMBERS PROCEDURES ----------------

DROP PROCEDURE IF EXISTS validate_mobile;
DELIMITER $$
CREATE PROCEDURE validate_mobile(
	IN mobile VARCHAR(128)
)
DETERMINISTIC
NO SQL
BEGIN
	IF NOT (SELECT mobile REGEXP '^[0-9]{8,30}$') THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Wrong mobile';
	END IF;
END$$
DELIMITER ;

--------------- VALIDATE EMAIL TRIGGER -----------------

DELIMITER $$
CREATE TRIGGER validate_users_insert
BEFORE INSERT ON users FOR EACH ROW
BEGIN
	CALL validate_users(NEW.email);
END$$
DELIMITER ;

------------ UPDATE EMAIL TRIGGER --------------------
DELIMITER $$
CREATE TRIGGER validate_users_update
BEFORE UPDATE ON users FOR EACH ROW
BEGIN
	CALL validate_users(NEW.email);
END$$
DELIMITER ;
--------------- VALIDATE MOBILE TRIGGER -----------------

DELIMITER $$
CREATE TRIGGER validate_mobile_insert
BEFORE INSERT ON users FOR EACH ROW
BEGIN
	CALL validate_mobile(NEW.mobile);
END$$
DELIMITER ;

------------ UPDATE MOBILE TRIGGER --------------------
DELIMITER $$
CREATE TRIGGER validate_mobile_update
BEFORE UPDATE ON users FOR EACH ROW
BEGIN
	CALL validate_mobile(NEW.mobile);
END$$
DELIMITER ;


--------- ONLY 10 PLAYLIST ALLOWED PER USER TRIGER ---------------------

DELIMITER $$
CREATE TRIGGER before_insert_allow_only_ten_playlist
     BEFORE INSERT ON user_albums FOR EACH ROW
     BEGIN
          IF (SELECT COUNT(albumid) FROM user_albums
               WHERE userid=NEW.userid ) > 10
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Cannot add or update row: only 10 playlists are allowed per user';
          END IF;
     END;
$$
DELIMITER ;



--------- ONLY 10 PLAYLIST ALLOWED PER USER TRIGER ---------------------

DELIMITER $$
CREATE TRIGGER before_insert_allow_only_ten_playlist
     BEFORE INSERT ON user_albums FOR EACH ROW
     BEGIN
          IF (SELECT COUNT(albumid) FROM user_albums
               WHERE userid=NEW.userid ) > 10
          THEN
               SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Cannot add or update row: only 10 playlists are allowed per user';
          END IF;
     END;
$$
DELIMITER ;


------ CLEAR EVERTHING AFTER USER ACCOUTS DLETED ----------------

DELIMITER $$

CREATE TRIGGER before_user_delete
BEFORE DELETE
ON users FOR EACH ROW
BEGIN
    delete from posts where userid = NEW.id ;
    delete from friends where follow = NEW.id or uid = NEW.id ;
    delete from code where userid = NEW.id ;
    delete from user_albums where userid = NEW.id ;
END$$    

DELIMITER ;

