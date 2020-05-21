USE kkp;

DROP PROCEDURE IF EXISTS CreateAccount;

DELIMITER //
CREATE PROCEDURE CreateAccount
(IN
    $Name VARCHAR(255),
    $Email VARCHAR(255),
    $Password VARCHAR(255),
    $Username VARCHAR(255),
    $Detail TEXT
)
BEGIN
	DECLARE $EntityID INT;
    
	IF(NOT EXISTS(SELECT * FROM `Account` WHERE Email = $Email OR Username = $Username)) THEN
		BEGIN    
			INSERT INTO `Entity` (DEEntityTypeID, `Name`, Detail)
			SELECT
				dh.DictionaryEntryID,
				$Name,
				$Detail
			FROM
				`vwDictionaryHelper` dh
			WHERE
				dh.Title = "EntityType"
				AND dh.Key = "Human";
				
			SET $EntityID = LAST_INSERT_ID();
			INSERT INTO `Account` (EntityID, Email, `Password`, Username)
			VALUES (
				$EntityID,
				$Email,
				$Password,
				$Username
			);
			
            SELECT TRUE AS Result;
		END;
	ELSE
		SELECT FALSE AS Result;
	END IF;
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS CreateFriendship;

DELIMITER //
CREATE PROCEDURE CreateFriendship
(IN
    $LeftEntityUUID VARCHAR(255),
    $RightEntityUUID VARCHAR(255)
)
BEGIN
	DECLARE $DERelationTypeID INT;
    
	SELECT
		DictionaryEntryID INTO $DERelationTypeID
	FROM
		`vwDictionaryHelper` dh
	WHERE
		dh.Title = "RelationType"
		AND dh.Key = "Friend";
        
	INSERT INTO `Relation` (DERelationTypeID, LeftEntityID, RightEntityID)
    SELECT
		$DERelationTypeID,
		el.EntityID,
		er.EntityID
	FROM
		`Entity` el,
		`Entity` er
	WHERE
		el.UUID = $LeftEntityUUID
		AND er.UUID = $RightEntityUUID;
END//
DELIMITER ;