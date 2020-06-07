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
        `Key` AS EntityType,
        Handle,
        `Name`,
        Detail
	FROM
		`vwAccountHelper`
	WHERE
		AccountUUID = $UUID;
END//
DELIMITER ;


-- DROP PROCEDURE IF EXISTS SignUp;
-- DELIMITER //
-- CREATE PROCEDURE SignUp
-- (
-- 	IN $Email VARCHAR(255),
--     IN $Password VARCHAR(255),
--     OUT $UUID VARCHAR(255)
-- )
-- BEGIN
-- 	IF(LENGTH($Email) > 0 AND LENGTH($Password) > 0) THEN
-- 		BEGIN
-- 			INSERT INTO 
--         END;
-- 	END IF;
-- 	SELECT
-- 		a.UUID INTO $UUID
-- 	FROM
-- 		`Account` a
-- 	WHERE
-- 		a.Email = $Email
--         AND a.Password = $Password;
--         
-- 	SELECT
-- 		AccountUUID,
--         Username,
--         EntityUUID,
--         EntryValue AS EntityType,
--         Handle,
--         Name,
--         Detail
-- 	FROM
-- 		`vwAccountHelper`
-- 	WHERE
-- 		AccountUUID = $UUID;
-- END//
-- DELIMITER ;


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
		eh.Key AS EntityType,
		ah.UUID AS AssetUUID,
		ah.TypeKey AS AssetType,
		ah.Filename AS AssetFilename,
		ah.ExtEntryValue AS AssetExtType
	FROM
		`vwEntityHelper` eh
		LEFT JOIN `vwAssetHelper` ah
			ON eh.EntityID = ah.EntityID
	WHERE (
		eh.Handle = $Entity
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
			rh.LeftUUID = $Entity
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
		g.GroupDetail->>"$.name" AS GroupName,
        g.EntityUUID,
        g.EntityType,
        g.EntityHandle,
        g.EntityName,
        g.EntityDetail
	FROM
		`vwGroupHelper` g
	WHERE
		g.GroupType = "Family"
		AND EXISTS (
			SELECT
				*
			FROM
				`vwGroupHelper` g2
			WHERE
				g2.GroupType = "Family"
                AND g.GroupID = g2.GroupID
				AND (
					g2.EntityHandle = $Entity
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
		fh.PostUUID,
		fh.PostType,
		fh.PostCreatedDateTimeUTC,
		fh.PostDetail,
		fh.PostContent,
		fh.EntityUUID,
		fh.EntityHandle,
		fh.EntityName,
		fh.AssetUUID,
		fh.AssetType,
		fh.Filename,
		fh.PostChildren,
		fh.PostReactions
	FROM
		`vwFeedHelper` fh
	WHERE (
		fh.PostUUID = $Post
    );
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS GetFeed;
DELIMITER //
CREATE PROCEDURE GetFeed
(
	IN $Entity VARCHAR(255),
    IN $BeginDateTime DATETIME(3)
)
BEGIN
	SELECT
		fh.PostUUID,
		fh.PostType,
		fh.PostCreatedDateTimeUTC,
		fh.PostDetail,
		fh.PostContent,
		fh.EntityUUID,
		fh.EntityHandle,
		fh.EntityName,
		fh.AssetUUID,
		fh.AssetType,
		fh.Filename,
		fh.PostChildren,
		fh.PostReactions
	FROM
		`vwFeedHelper` fh
	WHERE
		fh.PostType = "Image"
		AND (
			(
				$BeginDateTime IS NOT NULL
				AND fh.PostCreatedDateTimeUTC >= $BeginDateTime
			)
            OR
            (
				$BeginDateTime IS NULL
			)
		)
		AND (
			fh.EntityUUID = $Entity
			OR fh.EntityHandle = $Entity
		)
	ORDER BY
		fh.PostCreatedDateTimeUTC DESC
	LIMIT 25;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS GetPets;
DELIMITER //
CREATE PROCEDURE GetPets
(
	IN $Entity VARCHAR(255)
)
BEGIN
	SELECT
		g.GroupUUID,
		g.EntityUUID,
		g.EntityType,
		g.EntityHandle,
		g.EntityName,
		g.EntityDetail
	FROM
		`vwGroupHelper` g
	WHERE
		g.GroupType = "Family"
		AND g.EntityType <> "Human"
		AND EXISTS (
			SELECT
				*
			FROM
				`vwGroupHelper` g2
			WHERE
				g2.GroupType = "Family"
                AND g.GroupID = g2.GroupID
				AND (
					g2.EntityHandle = $Entity
					OR g2.EntityUUID = $Entity
                )
		);
END//
DELIMITER ;

CALL Login("email@aol.com", "P@$sw0rd", @UUID);
CALL GetEntity("MrSir");
CALL GetFriends("MrSir");
CALL GetFamily("MrSir");