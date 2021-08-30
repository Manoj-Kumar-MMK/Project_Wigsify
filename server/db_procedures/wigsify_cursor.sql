---- > CURSORS 

--- 1) call backupuserCurs();  	 	[backup user data into Vbackupdata]
--- 2) call posts_count_proc(); 	[get total count for posts into posts_count] 
--- 3) call albums_count_proc();	[get total count for posts into albums_count] 
--- 4) call followers_count_proc(); [get total followers count for an user into followers_count]
--- 5) call followings_count_proc(); [get total followings count for an user into followings_count]


------  BACKUP USERS CURSOR DATA -----

    delimiter $$ 
    CREATE PROCEDURE backupusersCurs()  
    BEGIN  
    DECLARE d INT DEFAULT 0;  
    DECLARE c_id INT;  
    DECLARE c_name, c_email VARCHAR(20);  

    DECLARE Get_cur CURSOR FOR SELECT  id , name , email  FROM users;  
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000'  
    SET d = 1;  
    DECLARE CONTINUE HANDLER FOR SQLSTATE '23000'  
    SET d = 1;  
    
	TRUNCATE Vbackupdata ;
    OPEN Get_cur;  
    lbl: LOOP  
    IF d = 1 THEN  
    LEAVE lbl;  
    END IF;  
    IF NOT d = 1 THEN  
      
    FETCH Get_cur INTO c_id, c_name, c_email;  
    INSERT INTO Vbackupdata VALUES(c_id, c_name, c_email);  
    END IF;  
    END LOOP;  
      
    CLOSE Get_cur;  
    END$$ 
	delimiter ; 

------------- calling the procedure ----------------

CALL backupusersCurs();  

--------------- getting posts count ---------------

DELIMITER $$
DROP PROCEDURE IF EXISTS posts_count_proc;
CREATE PROCEDURE posts_count_proc()
  BEGIN
    DECLARE p_type INT;
    DECLARE p_count INT(10) UNSIGNED;
    DECLARE done INT DEFAULT 0;
    DECLARE posts CURSOR FOR
      SELECT
        userid,
        COUNT(*)
      FROM posts
      GROUP BY userid;
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 1;

    TRUNCATE posts_count;

    OPEN posts;
    
    REPEAT
      FETCH posts
      INTO p_type, p_count;
      IF NOT done
      THEN
        INSERT INTO posts_count
        SET
          userid  = p_type,
          count = p_count;
      END IF;
    UNTIL done
    END REPEAT;
    
    CLOSE posts;
  END $$
DELIMITER ;

--------------------------- getting no of album count --------------


DELIMITER $$
DROP PROCEDURE IF EXISTS albums_count_proc;
CREATE PROCEDURE albums_count_proc()
  BEGIN
    DECLARE p_type INT;
    DECLARE p_count INT(10) UNSIGNED;
    DECLARE done INT DEFAULT 0;
    DECLARE albums CURSOR FOR
      SELECT
        userid,
        COUNT(*)
      FROM user_albums
      GROUP BY userid;
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 1;

    TRUNCATE albums_count;

    OPEN albums;
    
    REPEAT
      FETCH albums
      INTO p_type, p_count;
      IF NOT done
      THEN
        INSERT INTO albums_count
        SET
          userid  = p_type,
          count = p_count;
      END IF;
    UNTIL done
    END REPEAT;
    
    CLOSE albums;
  END $$
DELIMITER ;



--------------------- GET FOLLOWERS COUNT ------------------

DELIMITER $$
DROP PROCEDURE IF EXISTS followers_count_proc;
CREATE PROCEDURE followers_count_proc()
  BEGIN
    DECLARE p_type INT;
    DECLARE p_count INT(10) UNSIGNED;
    DECLARE done INT DEFAULT 0;
    DECLARE followers CURSOR FOR
      SELECT
        follow,
        COUNT(*)
      FROM friends 
      GROUP BY follow;
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 1;

    TRUNCATE followers_count;

    OPEN followers;
    
    REPEAT
      FETCH followers
      INTO p_type, p_count;
      IF NOT done
      THEN
        INSERT INTO followers_count
        SET
          userid  = p_type,
          followersCount = p_count;
      END IF;
    UNTIL done
    END REPEAT;
    
    CLOSE followers;
  END $$
DELIMITER ;
 ------------------- GET FOLLOWING COUNT ----------


DELIMITER $$
DROP PROCEDURE IF EXISTS followings_count_proc;
CREATE PROCEDURE followings_count_proc()
  BEGIN
    DECLARE p_type INT;
    DECLARE p_count INT(10) UNSIGNED;
    DECLARE done INT DEFAULT 0;
    DECLARE followings CURSOR FOR
      SELECT
        uid,
        COUNT(*)
      FROM friends 
      GROUP BY uid;
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 1;

    TRUNCATE followings_count;

    OPEN followings;
    
    REPEAT
      FETCH followings
      INTO p_type, p_count;
      IF NOT done
      THEN
        INSERT INTO followings_count
        SET
          userid  = p_type,
          followingsCount = p_count;
      END IF;
    UNTIL done
    END REPEAT;
    
    CLOSE followings;
  END $$
DELIMITER ;

