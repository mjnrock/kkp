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
		eh.UUID AS EntityUUID,
		eh.Handle AS EntityHandle,
		eh.Name AS EntityName,
		eh.Detail AS EntityDetail,
		eh.EntryValue AS EntityType,
		ah.UUID AS AssetUUID,
		ah.TypeEntryValue AS AssetType,
		ah.Filename AS AssetFilename,
		ah.ExtEntryValue AS AssetExtType
	FROM
		`vwEntityHelper` eh
		LEFT JOIN `EntityAsset` ea
			ON eh.EntityID = ea.EntityID
		LEFT JOIN `vwAssetHelper` ah
			ON ea.AssetID = ah.AssetID
		LEFT JOIN `vwDictionaryHelper` dh
			ON ea.DEEntityAssetTypeID = dh.DictionaryEntryID
			AND dh.Title = "EntityAssetType"
			AND dh.Key = "Profile"
	WHERE (
		eh.EntityID = $Entity
		OR eh.Handle = $Entity
		OR eh.UUID = $Entity
	);
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS GetFriends;
DELIMITER //
CREATE PROCEDURE GetFriends
(
	IN $Entity VARCHAR(255)
)
BEGIN
	SELECT
		rh.RelationType,
-- 		rh.LeftType AS EntityType,
-- 		rh.LeftHandle AS EntityHandle,
-- 		rh.LeftName AS EntityName,
-- 		rh.LeftDetail AS EntityDetail,
-- 		rh.LeftUUID AS EntityUUID,
		rh.RightType AS FriendType,
		rh.RightHandle AS FriendHandle,
		rh.RightName AS FriendName,
		rh.RightDetail AS FriendDetail,
		rh.RightUUID AS FriendUUID    
	FROM
		`vwRelationHelper` rh
	WHERE
		(
			rh.LeftEntityID = $Entity
			OR rh.LeftUUID = $Entity
			OR rh.LeftHandle = $Entity
		);
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS GetFamily;
DELIMITER //
CREATE PROCEDURE GetFamily
(
	IN $Entity VARCHAR(255)
)
BEGIN
	SELECT
        g.GroupUUID,
        g.GroupType,
		g.GroupDetail,
        g.EntityUUID,
        g.EntityType,
        g.EntityHandle,
        g.EntityName,
        g.EntityDetail
	FROM
		`vwGroupHelper` g
	WHERE
		g.GroupTypeKey = "Family"
		AND EXISTS (
			SELECT
				*
			FROM
				`vwGroupHelper` g2
			WHERE
				g2.GroupTypeKey = "Family"
                AND g.GroupID = g2.GroupID
				AND (
					g2.EntityID = $Entity
					OR g2.EntityHandle = $Entity
					OR g2.EntityUUID = $Entity
                )
		);
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS GetPost;
DELIMITER //
CREATE PROCEDURE GetPost
(
	IN $Post VARCHAR(255)
)
BEGIN
	SELECT
		ph.PostUUID,
		ph.PostType,
		ph.PostCreatedDateTimeUTC,
		ph.Detail AS PostDetail,
		ph.EntityHandle,
		ph.EntityName,
		ph.AssetUUID,
		ph.AssetType,
		ph.Filename,
		CASE
			WHEN MAX(pch.ParentPostUUID) IS NULL THEN NULL
			ELSE JSON_ARRAYAGG(JSON_OBJECT(
				"ParentPostUUID", pch.ParentPostUUID,
				"PostUUID", pch.PostUUID,
				"PostType", pch.PostType,
				"PostContent", pch.PostContent
			))
		END AS PostChildren,
		CASE
			WHEN MAX(pch.ParentPostUUID) IS NULL THEN NULL
			ELSE JSON_ARRAYAGG(JSON_OBJECT(
				"EntityHandle", prh.EntityHandle,
				"Reaction", prh.Reaction
			))
		END AS PostReactions
	FROM
		`vwPostHelper` ph
		LEFT JOIN `vwPostChildrenHelper` pch
			ON ph.PostID = pch.ParentPostID
		LEFT JOIN `vwPostReactionHelper` prh
			ON ph.PostID = prh.PostID
	WHERE (
		ph.PostID = $Post
        OR ph.PostUUID = $Post
    )
	GROUP BY
		ph.PostUUID,
		ph.PostType,
		ph.PostCreatedDateTimeUTC,
		ph.Detail,
		ph.EntityHandle,
		ph.EntityName,
		ph.AssetUUID,
		ph.AssetType,
		ph.Filename;
END//
DELIMITER ;


-- DROP PROCEDURE IF EXISTS GetFeed;
-- DELIMITER //
-- CREATE PROCEDURE GetFeed
-- (
-- 	IN $Entity VARCHAR(255)
-- )
-- BEGIN
-- 	SELECT
--         g.GroupUUID,
--         g.GroupType,
-- 		g.GroupDetail,
--         g.EntityUUID,
--         g.EntityType,
--         g.EntityHandle,
--         g.EntityName,
--         g.EntityDetail
-- 	FROM
-- 		`vwGroupHelper` g
-- 	WHERE
-- 		g.GroupTypeKey = "Family"
-- 		AND EXISTS (
-- 			SELECT
-- 				*
-- 			FROM
-- 				`vwGroupHelper` g2
-- 			WHERE
-- 				g2.GroupTypeKey = "Family"
--                 AND g.GroupID = g2.GroupID
-- 				AND (
-- 					g2.EntityID = $Entity
-- 					OR g2.EntityHandle = $Entity
-- 					OR g2.EntityUUID = $Entity
--                 )
-- 		);
-- END//
-- DELIMITER ;

CALL Login("email@aol.com", "P@$sw0rd", @UUID);
CALL GetEntity("MrSir");
CALL GetFriends("MrSir");
CALL GetFamily("MrSir");