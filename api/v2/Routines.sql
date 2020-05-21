USE kkp;


DROP PROCEDURE IF EXISTS CreateAccount;
DELIMITER //
CREATE PROCEDURE CreateAccount
(IN
    $Handle VARCHAR(255),
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
			INSERT INTO `Entity` (DEEntityTypeID, Handle, `Name`, Detail)
			SELECT
				dh.DictionaryEntryID,
                $Handle,
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
    
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
		SELECT
			DictionaryEntryID INTO $DERelationTypeID
		FROM
			`vwDictionaryHelper` dh
		WHERE
			dh.Title = "RelationType"
			AND dh.Key = "Friend";
		
		SELECT
			el.EntityID INTO $LeftEntityID
		FROM
			`Entity` el
		WHERE (
			el.UUID = $LeftEntity
			OR el.EntityID = $LeftEntity
            OR el.Handle = $LeftEntity
		);
		
		SELECT
			er.EntityID INTO $RightEntityID
		FROM
			`Entity` er
		WHERE (
			er.UUID = $RightEntity
			OR er.EntityID = $RightEntity
            OR er.Handle = $RightEntity
		);
	COMMIT;
        
	INSERT INTO `Relation` (DERelationTypeID, LeftEntityID, RightEntityID)
    VALUES
		($DERelationTypeID, $LeftEntityID, $RightEntityID),
		($DERelationTypeID, $RightEntityID, $LeftEntityID);
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS CreateAsset;
DELIMITER //
CREATE PROCEDURE CreateAsset
(
    IN $Account VARCHAR(255),
    IN $Type VARCHAR(255),
    IN $Extension VARCHAR(255),
    IN $Detail TEXT,
    OUT $UUID VARCHAR(255)
)
BEGIN
	DECLARE $AccountID INT;
	DECLARE $DEAssetTypeID INT;
	DECLARE $DEAssetExtensionID INT;
    
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
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
	COMMIT;
        
	INSERT INTO `Asset` (AccountID, DEAssetTypeID, DEAssetExtensionID, Detail)
    VALUES
		($AccountID, $DEAssetTypeID, $DEAssetExtensionID, $Detail);
        
	SELECT
		UUID INTO $UUID
	FROM
		`Asset` a
	WHERE
		a.AssetID = LAST_INSERT_ID();
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS CreateImagePost;
DELIMITER //
CREATE PROCEDURE CreateImagePost
(
    IN $Account VARCHAR(255),
    IN $Entity VARCHAR(255),
    IN $Extension VARCHAR(255),
    IN $Detail TEXT,
    OUT $UUID VARCHAR(255)
)
BEGIN
	DECLARE $DEPostTypeID INT;
    DECLARE $AssetUUID VARCHAR(255);
    DECLARE $AssetID INT;
    DECLARE $EntityID INT;
    DECLARE $PostID INT;
    
    CALL CreateAsset($Account, "Image", $Extension, $Detail, $AssetUUID);
    
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
		SELECT
			dh.DictionaryEntryID INTO $DEPostTypeID
		FROM
			`vwDictionaryHelper` dh
		WHERE
			dh.Title = "PostType"
			AND dh.Key = "Image";
            
		SELECT
			eh.EntityID INTO $EntityID
		FROM
			`vwEntityHelper` eh
		WHERE (
			eh.UUID = $Entity
            OR eh.EntityID = $Entity
            OR eh.Handle = $Entity
        );
            
		SELECT
			a.AssetID INTO $AssetID
		FROM
			`Asset` a
		WHERE (
			a.UUID = $AssetUUID
        );
	COMMIT;
    
    IF(LENGTH($AssetID) > 0 AND LENGTH($EntityID) > 0 AND LENGTH($DEPostTypeID) > 0) THEN
		BEGIN
			INSERT INTO `Post` (EntityID, DEPostTypeID)
			VALUES ($EntityID, $DEPostTypeID);
			
			SELECT
				p.PostID INTO $PostID
			FROM
				`Post` p
			WHERE
				p.PostID = LAST_INSERT_ID();
			
			SELECT
				p.UUID INTO $UUID
			FROM
				`Post` p
			WHERE
				p.PostID = $PostID;
			
			IF(LENGTH($PostID) > 0) THEN
				BEGIN
					INSERT INTO PostAsset (PostID, AssetID)
					VALUES ($PostID, $AssetID);
					
					IF(LENGTH($Detail) > 0) THEN
						BEGIN
							INSERT INTO PostDetail (PostID, Detail)
							VALUES ($PostID, $Detail);
						END;
					END IF;
				END;
			END IF;
		END;
	END IF;
	
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS CreateCommentPost;
DELIMITER //
CREATE PROCEDURE CreateCommentPost
(
    IN $Entity VARCHAR(255),
    IN $Comment TEXT,
    OUT $UUID VARCHAR(255)
)
BEGIN
	DECLARE $PostID INT;
	DECLARE $EntityID INT;
	DECLARE $DEPostTypeID INT;
    
	SELECT
		eh.EntityID INTO $EntityID
	FROM
		`vwEntityHelper` eh
	WHERE (
		eh.UUID = $Entity
		OR eh.EntityID = $Entity
        OR eh.Handle = $Entity
	);
    
	SELECT
		dh.DictionaryEntryID INTO $DEPostTypeID
	FROM
		`vwDictionaryHelper` dh
	WHERE
		dh.Title = "PostType"
		AND dh.Key = "Comment";
    
	IF(LENGTH($EntityID) > 0) THEN
		BEGIN
			INSERT INTO `Post` (EntityID, DEPostTypeID)
            VALUES ($EntityID, $DEPostTypeID);
        
			SET $PostID := LAST_INSERT_ID();
			
			SELECT
				p.UUID INTO $UUID
			FROM
				`Post` p
			WHERE
				p.PostID = $PostID;
			
			IF(LENGTH($PostID) > 0) THEN
				BEGIN
					INSERT INTO `PostDetail` (PostID, Detail)
                    VALUES ($PostID, JSON_OBJECT("content", $Comment));
				END;
			END IF;
		END;
	END IF;    
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS CreateReplyPost;
DELIMITER //
CREATE PROCEDURE CreateReplyPost
(
	IN $Entity VARCHAR(255),
    IN $ParentPost VARCHAR(255),
    IN $Reply TEXT
)
BEGIN
	DECLARE $ParentPostID INT;
	DECLARE $PostID INT;
	DECLARE $PostUUID VARCHAR(255);
    
    SELECT
		p.PostID INTO $ParentPostID
	FROM
		`Post` p
	WHERE (
		p.UUID = $ParentPost
        OR p.PostID = $ParentPost
    );
    
	IF(LENGTH($ParentPostID) > 0) THEN
		BEGIN
			CALL CreateCommentPost($Entity, $Reply, $PostUUID);
            
			SELECT
				p.PostID INTO $PostID
			FROM
				`Post` p
			WHERE
				p.UUID = $PostUUID;
                
			IF(LENGTH($PostID) > 0) THEN
				BEGIN                
					INSERT INTO `PostHierarchy` (ParentPostID, PostID)
					VALUES ($ParentPostID, $PostID);
                END;
			END IF;
		END;
	END IF;    
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS MapEntityAsset;
DELIMITER //
CREATE PROCEDURE MapEntityAsset
(
	IN $Type VARCHAR(255),
	IN $Entity VARCHAR(255),
    IN $Asset VARCHAR(255)
)
BEGIN
	DECLARE $DEEntityAssetTypeID INT;
	DECLARE $EntityID INT;
	DECLARE $AssetID INT;
    
	SELECT
		dh.DictionaryEntryID INTO $DEEntityAssetTypeID
	FROM
		`vwDictionaryHelper` dh
	WHERE
		dh.Title = "EntityAssetType"
		AND dh.Key = $Type;
    
	SELECT
		EntityID INTO $EntityID
	FROM
		`Entity` e
	WHERE (
		e.EntityID = $Entity
        OR e.Handle = $Entity
        OR e.UUID = $Entity
    );
    
	SELECT
		AssetID INTO $AssetID
	FROM
		`Asset` a
	WHERE (
		a.AssetID = $Asset
        OR a.UUID = $Asset
    );
    
    IF(LENGTH($DEEntityAssetTypeID) > 0 AND LENGTH($EntityID) > 0 AND LENGTH($AssetID) > 0) THEN
		BEGIN
			INSERT INTO EntityAsset(DEEntityAssetTypeID, EntityID, AssetID)
            VALUES ($DEEntityAssetTypeID, $EntityID, $AssetID);
        END;
	END IF;
END//
DELIMITER ;