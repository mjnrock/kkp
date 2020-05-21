USE kkp;

DROP PROCEDURE IF EXISTS Login;
DELIMITER //
CREATE PROCEDURE Login
(
	IN $Email VARCHAR(255),
    IN $Password VARCHAR(255),
    OUT $UUID VARCHAR(255)
)
BEGIN
	SELECT
		a.UUID INTO $UUID
	FROM
		`Account` a
	WHERE
		a.Email = $Email
        AND a.Password = $Password;
        
	SELECT
		AccountUUID,
        Username,
        EntityUUID,
        EntryValue AS EntityType,
        Handle,
        Name,
        Detail
	FROM
		`vwAccountHelper`
	WHERE
		AccountUUID = $UUID;
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS GetEntity;
DELIMITER //
CREATE PROCEDURE GetEntity
(
	IN $Entity VARCHAR(255)
)
BEGIN
	SELECT
		eh.*
	FROM
		`vwEntityHelper` eh
	WHERE (
		eh.EntityID = $Entity
        OR eh.Handle = $Entity
        OR eh.UUID = $Entity
    );
END//
DELIMITER ;

CALL Login("email@aol.com", "P@$sw0rd", @UUID);
CALL GetEntity("MrSir");