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
    TRIM(BOTH '"' FROM de.`Value`->"$.order") AS EntryOrder,
    e.Handle,
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
    e.Handle,
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
    el.Handle AS LeftHandle,
    el.Name AS LeftName,
    el.Detail AS LeftDetail,
    el.UUID AS LeftUUID,
    er.EntityID AS RightEntityID,
    er.EntryValue AS RightType,
    er.Handle AS RightHandle,
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
        
        
DROP VIEW IF EXISTS `vwPostHelper`;

CREATE VIEW `vwPostHelper` AS
SELECT
    p.PostID,
    p.UUID AS PostUUID,
    eh.EntityID,
    eh.Handle AS EntityHandle,
    eh.Name AS EntityName,
    eh.UUID AS EntityUUID,
    dh.DictionaryEntryID,
    dh.EntryValue AS PostType,
    pd.PostDetailID,
    pd.Detail,
    pa.PostAssetID,
    pa.AssetID,
    ah.UUID AS AssetUUID,
    ah.TypeEntryValue AS AssetType,
    ah.Filename
FROM
	`Post` p
    INNER JOIN `vwDictionaryHelper` dh
		ON p.DEPostTypeID = dh.DictionaryEntryID
	INNER JOIN `vwEntityHelper` eh
		ON p.EntityID = eh.EntityID
    LEFT JOIN `PostDetail` pd
		ON p.PostID = pd.PostID
	LEFT JOIN `PostAsset` pa
		ON p.PostID = pa.PostID
	LEFT JOIN `vwAssetHelper` ah
		ON pa.AssetID = ah.AssetID;
        
        
DROP VIEW IF EXISTS `vwPostReactionHelper`;

CREATE VIEW `vwPostReactionHelper` AS
SELECT
	p.PostID,
    p.PostUUID,
    p.PostType,
    e.EntityID,
    e.EntryValue AS EntityType,
    e.Handle AS EntityHandle,
    e.Name AS EntityName,
    e.UUID AS EntityUUID,
    pr.PostReactionID,
    pr.Reaction
FROM
	`vwPostHelper` p
    INNER JOIN `PostReaction` pr
		ON p.PostID = pr.PostID
	INNER JOIN `vwEntityHelper` e
		ON pr.EntityID = e.EntityID;
        
        
DROP VIEW IF EXISTS `vwPostChildrenHelper`;

CREATE VIEW `vwPostChildrenHelper` AS
SELECT
	ph.PostHierarchyID,
    ph.ParentPostID,
    p.UUID AS ParentPostUUID,
    p.EntityID AS ParentPostEntityID,
    pc.PostID,
    pc.PostUUID,
    pc.EntityID AS PostEntityID,
    pc.PostType,
    TRIM(BOTH '"' FROM pc.Detail->"$.content") AS PostContent
FROM
	`PostHierarchy` ph
    INNER JOIN `Post` p
		ON ph.ParentPostID = p.PostID
    INNER JOIN `vwPostHelper` pc
		ON ph.PostID = pc.PostID;