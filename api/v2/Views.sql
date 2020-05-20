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