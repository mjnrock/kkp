USE kkp;

DROP PROCEDURE IF EXISTS SignUp;

DELIMITER //
CREATE PROCEDURE SignUp
(IN
	$Email VARCHAR(255),
	$Password VARCHAR(255)
)
BEGIN
	IF(NOT EXISTS(SELECT * FROM `User` WHERE Email = $Email)) THEN
		BEGIN
			INSERT INTO `user` (Email, `Password`)
			VALUES ($Email, $Password);
		
			SELECT UUID FROM `user` WHERE Email = $Email;
		END;
	ELSE
		BEGIN
			SELECT 0;
		END;
	END IF;
END//
DELIMITER ;