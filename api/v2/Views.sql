USE kkp;

DROP VIEW IF EXISTS vwDictionaryHelper;

CREATE VIEW vwDictionaryHelper AS
SELECT
	d.DictionaryID,
	d.Title,
	d.`Description`,
    d.Detail,
    d.UUID,
    de.DictionaryEntryID,
    de.`Key`,
    de.`Value`,
    TRIM(BOTH '"' FROM de.`Value`->"$.value") AS EntryValue,    
    TRIM(BOTH '"' FROM de.`Value`->"$.order") AS EntryOrder    
FROM
	`Dictionary` d
    INNER JOIN `DictionaryEntry` de
		ON d.DictionaryID = de.DictionaryID;
        

DROP VIEW IF EXISTS vwAccountHelper;

CREATE VIEW vwAccountHelper AS
SELECT
	a.AccountID,
    a.Email,
    a.Password,
    a.Username,
    a.CreatedDateTimeUTC,
    a.UUID as AccountUUID,
    e.EntityID,
    de.DictionaryEntryID,
    de.Key,
    de.Value,
    TRIM(BOTH '"' FROM de.`Value`->"$.value") AS EntryValue,    
    TRIM(BOTH '"' FROM de.`Value`->"$.order") AS EntryOrder    ,
    e.Name,
    e.Detail,
    e.UUID AS EntityUUID
FROM
	`Account` a
    INNER JOIN `Entity` e
		ON a.EntityID = e.EntityID
    INNER JOIN `DictionaryEntry` de
		ON e.DEEntityTypeID = de.DictionaryEntryID
	INNER JOIN `Dictionary` d
		ON d.DictionaryID = de.DictionaryID;
        

DROP VIEW IF EXISTS vwEntityHelper;

CREATE VIEW vwEntityHelper AS
SELECT
	e.EntityID,
    e.Name,
    e.Detail,
    e.UUID,
    dh.DictionaryEntryID,
    dh.Key,
    dh.Value,
    dh.EntryValue,
    dh.EntryOrder
FROM
	`Entity` e
    INNER JOIN `vwDictionaryHelper` dh
		ON e.DEEntityTypeID = dh.DictionaryEntryID;
        
        
DROP VIEW IF EXISTS vwRelationHelper;

CREATE VIEW vwRelationHelper AS
SELECT
	dh.DictionaryEntryID,
    dh.EntryValue AS RelationType,
    el.EntityID AS LeftEntityID,
    el.EntryValue AS LeftType,
    el.Name AS LeftName,
    el.Detail AS LeftDetail,
    el.UUID AS LeftUUID,
    er.EntityID AS RightEntityID,
    er.EntryValue AS RightType,
    er.Name AS RightName,
    er.Detail AS RightDetail,
    er.UUID AS RightUUID
FROM
	`Relation` r
    INNER JOIN `vwEntityHelper` el
		ON r.LeftEntityID = el.EntityID
	INNER JOIN `vwEntityHelper` er
		ON r.RightEntityID = er.EntityID
	INNER JOIN `vwDictionaryHelper` dh
		ON r.DERelationTypeID = dh.DictionaryEntryID;
        
        
DROP VIEW IF EXISTS vwAssetHelper;

CREATE VIEW vwAssetHelper AS
SELECT
	a.AssetID,
    a.AccountID,
    a.UUID,
    CONCAT(a.UUID, ".", TRIM(BOTH '"' FROM dhe.EntryValue)) AS Filename,
    a.Detail,
    dht.DictionaryEntryID AS TypeDictionaryEntryID,
    dht.Key AS TypeKey,
    dht.Value AS TypeValue,
    dht.EntryValue AS TypeEntryValue,
    dhe.DictionaryEntryID AS ExtDictionaryEntryID,
    dhe.Key AS ExtKey,
    dhe.Value AS ExtValue,
    dhe.EntryValue AS ExtEntryValue
FROM
	`Asset` a
    INNER JOIN `vwDictionaryHelper` dht
		ON a.DEAssetTypeID = dht.DictionaryEntryID
    INNER JOIN `vwDictionaryHelper` dhe
		ON a.DEAssetExtensionID = dhe.DictionaryEntryID;