DROP PROCEDURE IF EXISTS AddEntity;

DELIMITER //
CREATE PROCEDURE AddEntity
(IN
	$Type VARCHAR(255),
    $Name VARCHAR(255),
    $Detail TEXT
)
BEGIN
	INSERT INTO `Entity` (DEEntityTypeID, `Name`, Detail)
    SELECT
		dh.DictionaryEntryID,
        $Name,
        $Detail
	FROM
		`vwDictionaryHelper` dh
	WHERE
		dh.Key = $Type;
        
	SELECT
		e.UUID
	FROM
		`Entity` e
	WHERE
		e.EntityID = last_inserted_id();
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS AddAccount;

DELIMITER //
CREATE PROCEDURE AddAccount
(IN
	$EntityUUID VARCHAR(255),
    $Email VARCHAR(255),
    $Password VARCHAR(255),
    $Username VARCHAR(255)
)
BEGIN
	INSERT INTO `Account` (EntityID, Email, `Password`, Username)
    SELECT
		e.EntityID,
        $Email,
        $Password,
        $Username
	FROM
		`Entity` e
	WHERE
		e.UUID = $EntityUUID;
        
	SELECT
		a.UUID
	FROM
		`Account` a
	WHERE
		a.AccountID = last_inserted_id();
END//
DELIMITER ;