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
    $LeftEntity VARCHAR(255),
    $RightEntity VARCHAR(255)
)
BEGIN
	DECLARE $DERelationTypeID INT;
	DECLARE $LeftEntityID INT;
	DECLARE $RightEntityID INT;
    
	SELECT
		DictionaryEntryID INTO $DERelationTypeID
	FROM
		`vwDictionaryHelper` dh
	WHERE
		dh.Title = "RelationType"
		AND dh.Key = "Friend";
    
	SELECT
		e.EntityID INTO $LeftEntityID
	FROM
		`Entity` e
	WHERE (
		el.UUID = $LeftEntity
		OR el.EntityID = $LeftEntity
	);
    
	SELECT
		e.EntityID INTO $RightEntityID
	FROM
		`Entity` e
	WHERE (
		er.UUID = $RightEntity
		OR er.EntityID = $RightEntity
	);
        
	INSERT INTO `Relation` (DERelationTypeID, LeftEntityID, RightEntityID)
    VALUES
		($DERelationTypeID, $LeftEntityID, $RightEntityID),
		($DERelationTypeID, $RightEntityID, $LeftEntityID);
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS CreateAsset;
DELIMITER //
CREATE PROCEDURE CreateAsset
(IN
    $Account VARCHAR(255),
    $Type VARCHAR(255),
    $Extension VARCHAR(255),
    $Detail TEXT
)
BEGIN
	DECLARE $AccountID INT;
	DECLARE $DEAssetTypeID INT;
	DECLARE $DEAssetExtensionID INT;
    
	SELECT
		a.AccountID INTO $AccountID
	FROM
		`Account` a
	WHERE
		(
			a.AccountID = $Account
			OR a.UUID = $Account
			OR a.Username = $Account
			OR a.Email = $Account
		);

	SELECT
		dh.DictionaryEntryID INTO $DEAssetTypeID
	FROM
		`vwDictionaryHelper` dh
	WHERE
		dh.Title = "AssetType"
		AND dh.Key = $Type;

	SELECT
		dh.DictionaryEntryID INTO $DEAssetExtensionID
	FROM
		`vwDictionaryHelper` dh
	WHERE
		dh.Title = "AssetExtension"
		AND dh.Key = $Extension;
        
	INSERT INTO `Asset` (AccountID, DEAssetTypeID, DEAssetExtensionID, Detail)
    VALUES
		($AccountID, $DEAssetTypeID, $DEAssetExtensionID, $Detail);
        
	SELECT
		UUID
	FROM
		`Asset` a
	WHERE
		a.AssetID = LAST_INSERT_ID();
END//
DELIMITER ;