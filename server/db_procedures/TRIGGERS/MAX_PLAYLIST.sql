
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