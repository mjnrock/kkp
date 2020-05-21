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
    de.`Value`->"$.value" AS EntryValue,
    de.`Value`->"$.order" AS EntryOrder
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