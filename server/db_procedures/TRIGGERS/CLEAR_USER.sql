
------ CLEAR EVERTHING AFTER USER ACCOUTS DELETED ----------------

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