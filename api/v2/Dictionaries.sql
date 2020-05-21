USE kkp;

DROP TABLE IF EXISTS `DictionaryEntry`;
DROP TABLE IF EXISTS `Dictionary`;

CREATE TABLE `Dictionary` (
	DictionaryID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) UNIQUE NOT NULL,
    `Description` TEXT NULL,
    Detail JSON NULL,
    UUID VARCHAR(255) UNIQUE NOT NULL DEFAULT (UUID())
);

CREATE TABLE `DictionaryEntry` (
	DictionaryEntryID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	DictionaryID INT NOT NULL,
		FOREIGN KEY (DictionaryID) REFERENCES `Dictionary`(DictionaryID),
	`Key` VARCHAR(255) NOT NULL,
    `Value` JSON NOT NULL
);
ALTER TABLE `DictionaryEntry` ADD UNIQUE `Unique_Key_Index`(`DictionaryID`, `Key`);

DROP PROCEDURE IF EXISTS AddDictionary;

DELIMITER //
CREATE PROCEDURE AddDictionary
(IN
	$Title VARCHAR(255),
    $Description TEXT,
    $Detail JSON
)
BEGIN
	INSERT INTO `Dictionary` (Title, `Description`, Detail)
	VALUES (
		$Title,
        $Description,
        $Detail
    );
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS AddDictionaryEntry;

DELIMITER //
CREATE PROCEDURE AddDictionaryEntry
(IN
	$Dictionary VARCHAR(255),
    $Key VARCHAR(255),
    $Value VARCHAR(255)
)
BEGIN
	DECLARE $DictionaryID INT;
    SET $DictionaryID = (SELECT DictionaryID FROM `Dictionary` WHERE Title = $Dictionary);
    
    IF($DictionaryID IS NOT NULL) THEN
		BEGIN
			INSERT INTO `DictionaryEntry` (DictionaryID, `Key`, `Value`)
			VALUES
				($DictionaryID, $Key, JSON_OBJECT("value", $Value));
        END;
	END IF;
END//
DELIMITER ;


CALL AddDictionary("EntityType", NULL, NULL);
CALL AddDictionaryEntry("EntityType", "Human", "HUMAN");
CALL AddDictionaryEntry("EntityType", "Cat", "CAT");
CALL AddDictionaryEntry("EntityType", "Dog", "DOG");

CALL AddDictionary("RelationType", NULL, NULL);
CALL AddDictionaryEntry("RelationType", "Friend", "FRIEND");

CALL AddDictionary("GroupType", NULL, NULL);
CALL AddDictionaryEntry("GroupType", "Family", "FAMILY");

CALL AddDictionary("CollectionType", NULL, NULL);
CALL AddDictionaryEntry("CollectionType", "Album", "ALBUM");

CALL AddDictionary("PostType", NULL, NULL);
CALL AddDictionaryEntry("PostType", "Mixed", "MIXED");
CALL AddDictionaryEntry("PostType", "Image", "IMAGE");
CALL AddDictionaryEntry("PostType", "Comment", "COMMENT");

CALL AddDictionary("AssetType", NULL, NULL);
CALL AddDictionaryEntry("AssetType", "Image", "IMAGE");

CALL AddDictionary("AssetExtension", NULL, NULL);
CALL AddDictionaryEntry("AssetExtension", "JPEG", "JPG");
CALL AddDictionaryEntry("AssetExtension", "PNG", "PNG");
CALL AddDictionaryEntry("AssetExtension", "GIF", "GIF");

CALL AddDictionary("EntityAssetType", NULL, NULL);
CALL AddDictionaryEntry("EntityAssetType", "Profile", "PROFILE");