USE kkp;

DROP PROCEDURE IF EXISTS SignUp;

DELIMITER //
CREATE PROCEDURE SignUp
(IN
	$Email VARCHAR(255),
	$Password VARCHAR(255)
)
BEGIN
	IF(NOT EXISTS(SELECT * FROM `User` WHERE Email = $Email)) THEN
		BEGIN
			INSERT INTO `user` (Email, `Password`)
			VALUES ($Email, $Password);
		
			SELECT UUID AS "Result" FROM `user` WHERE Email = $Email;
		END;
	END IF;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS Login;

DELIMITER //
CREATE PROCEDURE Login
(IN
	$Email VARCHAR(255),
	$Password VARCHAR(255)
)
BEGIN
	SELECT UUID AS "Result" FROM `user` WHERE Email = $Email AND `Password` = $Password;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS ValidateUser;

DELIMITER //
CREATE PROCEDURE ValidateUser
(IN
	$UserID VARCHAR(255),
	$Password VARCHAR(255)
)
BEGIN
	SELECT UUID AS "Result" FROM `user` WHERE UserID = $UserID AND `Password` = $Password;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS CreateUserDetail;

DELIMITER //
CREATE PROCEDURE CreateUserDetail
(IN
	$UserID INT,
	$Handle VARCHAR(255),
	$FirstName VARCHAR(255),
	$LastName VARCHAR(255)
)
BEGIN
	IF(EXISTS(SELECT * FROM `User` WHERE UserID = $UserID)) THEN
		BEGIN
			INSERT INTO userdetail (UserID , `First`, `Last`, Handle, Friends)
			VALUES ($UserID, $FirstName, $LastName, $Handle, JSON_OBJECT());
		END;
	END IF;
		
	SELECT Handle AS "Result" FROM `UserDetail` WHERE UserID = $UserID;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS UpdateHandle;

DELIMITER //
CREATE PROCEDURE UpdateHandle
(IN
	$UserID VARCHAR(255),
	$Handle VARCHAR(255)
)
BEGIN
	IF(EXISTS(SELECT * FROM `UserDetail` WHERE UserID = $UserID)) THEN
		BEGIN
			UPDATE `UserDetail`
			SET
				Handle = $Handle
			WHERE
				UserID = $UserID;
		END;
	END IF;
		
	SELECT Handle AS "Result" FROM `UserDetail` WHERE UserID = $UserID;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS AddFriend;

DELIMITER //
CREATE PROCEDURE AddFriend
(IN
	$UserID INT,
	$FriendUserID INT
)
BEGIN
	IF(EXISTS(SELECT * FROM `UserDetail` WHERE UserID = $UserID)) THEN
		BEGIN
			UPDATE userdetail u
			SET
				Friends = JSON_INSERT(u.Friends, CONCAT('$."', $FriendUserID, '"'), $FriendUserID)
			WHERE
				UserID = $UserID;
		
			SELECT * FROM `UserDetail` WHERE UserID = $UserID;
		END;
	END IF;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS RemoveFriend;

DELIMITER //
CREATE PROCEDURE RemoveFriend
(IN
	$UserID INT,
	$FriendUserID INT
)
BEGIN
	IF(EXISTS(SELECT * FROM `UserDetail` WHERE UserID = $UserID)) THEN
		BEGIN
			UPDATE userdetail u
			SET
				Friends = JSON_REMOVE(u.Friends, CONCAT('$."', $FriendUserID, '"'))
			WHERE
				UserID = $UserID;
		
			SELECT * FROM `UserDetail` WHERE UserID = $UserID;
		END;
	END IF;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS CreateGroup;

DELIMITER //
CREATE PROCEDURE CreateGroup
(IN
	$UserID INT,
	$Name VARCHAR(255),
	$Type VARCHAR(255),
	$Description TEXT	
)
BEGIN
	IF(EXISTS(SELECT * FROM `User` WHERE UserID = $UserID)) THEN
		BEGIN
			INSERT INTO `Group` (PrimaryUserID, Name, `Type`, Description, Members)
			VALUES (
				$UserID,
				$Name,
				$Type,
				$Description,
				JSON_OBJECT()
			);
		END;
	END IF;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS AddGroupMember;

DELIMITER //
CREATE PROCEDURE AddGroupMember
(IN
	$GroupID INT,
	$UserID INT
)
BEGIN
	IF(EXISTS(SELECT * FROM `Group` WHERE GroupID = $GroupID)) THEN
		BEGIN
			UPDATE `Group` g
			SET
				Members = JSON_INSERT(g.Members, CONCAT('$."', $UserID, '"'), $UserID)
			WHERE
				GroupID = $GroupID;
		
			SELECT * FROM `Group` WHERE GroupID = $GroupID;
		END;
	END IF;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS RemoveGroupMember;

DELIMITER //
CREATE PROCEDURE RemoveGroupMember
(IN
	$GroupID INT,
	$UserID INT
)
BEGIN
	IF(EXISTS(SELECT * FROM `Group` WHERE GroupID = $GroupID)) THEN
		BEGIN
			UPDATE `Group` g
			SET
				Members = JSON_REMOVE(g.Members, CONCAT('$."', $UserID, '"'))
			WHERE
				GroupID = $GroupID;
		
			SELECT * FROM `Group` WHERE GroupID = $GroupID;
		END;
	END IF;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS CreatePet;

DELIMITER //
CREATE PROCEDURE CreatePet
(IN
	$GroupID INT,
	$Name VARCHAR(255),
	$Type VARCHAR(255),
	$Detail TEXT	
)
BEGIN
	IF(NOT EXISTS(SELECT * FROM `Pet` WHERE GroupID = $GroupID AND Name = $Name AND `Type` = $Type)) THEN
		BEGIN
			INSERT INTO pet (GroupID, Name, `Type`, Detail)
			VALUES (
				$GroupID,
				$Name,
				$Type,
				CAST($Detail AS JSON)
			);
		END;
	END IF;
END//
DELIMITER ;

    
DROP PROCEDURE IF EXISTS CreatePostDetail;

DELIMITER //
CREATE PROCEDURE CreatePostDetail
(IN
	$PostID INT,
    $Tags TEXT,
    $Pets TEXT
)
BEGIN    
	INSERT INTO PostDetail (PostID, Tags, Pets)
    VALUES (
		$PostID,
		CAST($Tags AS JSON),
		CAST($Pets AS JSON)
    );
END//
DELIMITER ;

    
DROP PROCEDURE IF EXISTS CreatePost;

DELIMITER //
CREATE PROCEDURE CreatePost
(IN
	$UserID INT,
    $Type VARCHAR(255),
    $Content TEXT,
    $ImageID INT,
    $ParentPostID INT
)
BEGIN
    DECLARE $PostID INT;
    
	INSERT INTO Post (UserID, Type, Content, ImageID, ParentPostID)
    VALUES ($UserID, $Type, $Content, $ImageID, $ParentPostID);
    
    SET $PostID = LAST_INSERT_ID();
    
    INSERT INTO PostDetail (PostID, Tags, Reactions, Pets)
    VALUES (
		$PostID,
        JSON_OBJECT(),
        JSON_OBJECT(),
        JSON_OBJECT()
	);
END//
DELIMITER ;

    
DROP PROCEDURE IF EXISTS CreateCommentPost;

DELIMITER //
CREATE PROCEDURE CreateCommentPost
(IN
	$UserID INT,
    $Content TEXT,
    $ParentPostID INT
)
BEGIN
	CALL CreatePost($UserID, "Comment", $Content, NULL, $ParentPostID);
END//
DELIMITER ;

    
DROP PROCEDURE IF EXISTS CreateImagePost;

DELIMITER //
CREATE PROCEDURE CreateImagePost
(IN
	$UserID INT,
    $ImageID INT,
    $ParentPostID INT
)
BEGIN
	CALL CreatePost($UserID, "Image", NULL, $ImageID, $ParentPostID);
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS AddPostReaction;

DELIMITER //
CREATE PROCEDURE AddPostReaction
(IN
	$PostID INT,
	$UserID INT,
    $Reaction VARCHAR(255)
)
BEGIN
	-- DECLARE $Reactions JSON;
    
	IF(EXISTS(SELECT * FROM `PostDetail` WHERE PostID = $PostID)) THEN
        -- SET $Reactions = (SELECT COALESCE(JSON_EXTRACT(c, CONCAT('$."', $UserID, '"')), JSON_ARRAY()) FROM `PostDetail` WHERE PostID = $PostID);
        
		BEGIN            
			UPDATE `PostDetail`
			SET
				Reactions = JSON_SET(Reactions, CONCAT('$."', $UserID, '"'), $Reaction)
			WHERE
				PostID = $PostID;
		END;
	END IF;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS AddPostPet;

DELIMITER //
CREATE PROCEDURE AddPostPet
(IN
	$PostID INT,
    $PetID INT
)
BEGIN
	IF(EXISTS(SELECT * FROM `PostDetail` WHERE PostID = $PostID)) THEN
		BEGIN
			UPDATE `PostDetail`
			SET
				Pets = JSON_SET(Pets, CONCAT('$."', $PetID, '"'), $PetID)
			WHERE
				PostID = $PostID;
		END;
	END IF;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS AddPostTag;

DELIMITER //
CREATE PROCEDURE AddPostTag
(IN
	$PostID INT,
    $Tag VARCHAR(255)
)
BEGIN
	IF(EXISTS(SELECT * FROM `PostDetail` WHERE PostID = $PostID)) THEN
		BEGIN
			UPDATE `PostDetail`
			SET
				Tags = JSON_SET(Tags, CONCAT('$."', $Tag, '"'), $Tag)
			WHERE
				PostID = $PostID;
		END;
	END IF;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS RemovePostTag;

DELIMITER //
CREATE PROCEDURE RemovePostTag
(IN
	$PostID INT,
    $Tag VARCHAR(255)
)
BEGIN
	IF(EXISTS(SELECT * FROM `PostDetail` WHERE PostID = $PostID)) THEN
		BEGIN
			UPDATE `PostDetail`
			SET
				Tags = JSON_REMOVE(Tags, CONCAT('$."', $Tag, '"'))
			WHERE
				PostID = $PostID;
		END;
	END IF;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS CreateImage;

DELIMITER //
CREATE PROCEDURE CreateImage
(IN
	$UserID INT,
    $Type VARCHAR(255),
    $Filename VARCHAR(255)
)
BEGIN
	IF(NOT EXISTS(SELECT * FROM `Image` WHERE Filename = $Filename)) THEN
		BEGIN
			INSERT INTO `Image` (AuthorUserID, Type, Filename)
            VALUES ($UserID, $Type, $Filename);
			
            SELECT UUID FROM `Image` WHERE ImageID = LAST_INSERT_ID();
		END;
	END IF;
END//
DELIMITER ;