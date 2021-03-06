USE kkp;

DROP TABLE IF EXISTS Collection;
DROP TABLE IF EXISTS PostDetail;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS UserFollower;
DROP TABLE IF EXISTS UserDetail;
DROP TABLE IF EXISTS Pet;
DROP TABLE IF EXISTS Image;
DROP TABLE IF EXISTS `Group`;
DROP TABLE IF EXISTS `User`;


CREATE TABLE `User` (
	UserID INT AUTO_INCREMENT PRIMARY KEY,
	Email VARCHAR(255),
	`Password` VARCHAR(255),
	LastLoginDateTimeUTC DATETIME(3),
	CreatedDateTimeUTC DATETIME(3) DEFAULT (NOW()),
	UUID VARCHAR(255) DEFAULT (UUID())
);

CREATE TABLE Image (
	ImageID INT AUTO_INCREMENT PRIMARY KEY,
	AuthorUserID INT,
		FOREIGN KEY (AuthorUserID) REFERENCES `User`(UserID),	
	Filename VARCHAR(255),
	`Type` ENUM('JPEG', 'PNG', 'GIF'),	
	CreatedDateTimeUTC DATETIME(3) DEFAULT (NOW()),
	UUID VARCHAR(255) DEFAULT (UUID())
);

CREATE TABLE UserDetail (
	UserDetailID INT AUTO_INCREMENT PRIMARY KEY,
	UserID INT,
		FOREIGN KEY (UserID) REFERENCES `User`(UserID),
	PrimaryImageID INT NULL,
		FOREIGN KEY (PrimaryImageID) REFERENCES Image(ImageID),	
	Handle VARCHAR(255),
	`First` VARCHAR(255),
	`Last` VARCHAR(255),
	Bio TEXT
);

CREATE TABLE UserFollower (
	UserFollowerID INT AUTO_INCREMENT PRIMARY KEY,
	UserID INT,
		FOREIGN KEY (UserID) REFERENCES `User`(UserID),
	FollowerUserID INT,
		FOREIGN KEY (FollowerUserID) REFERENCES `User`(UserID)
);

CREATE TABLE `Group` (
	GroupID INT AUTO_INCREMENT PRIMARY KEY,
	PrimaryUserID INT,
		FOREIGN KEY (PrimaryUserID) REFERENCES `User`(UserID),
	`Type` ENUM('Family'),
	Name VARCHAR(255),
	Description TEXT,
	Members JSON,
	UUID VARCHAR(255) DEFAULT (UUID())
);

CREATE TABLE Pet (
	PetID INT AUTO_INCREMENT PRIMARY KEY,
	GroupID INT,
		FOREIGN KEY (GroupID) REFERENCES `Group`(GroupID),
	PrimaryImageID INT NULL,
		FOREIGN KEY (PrimaryImageID) REFERENCES Image(ImageID),	
	Name VARCHAR(255),
	`Type` ENUM('Cat', 'Dog'),
	Detail JSON
);

CREATE TABLE Post (
	PostID INT AUTO_INCREMENT PRIMARY KEY,
	ParentPostID INT NULL,
		FOREIGN KEY (ParentPostID) REFERENCES Post(PostID),	
	UserID INT,
		FOREIGN KEY (UserID) REFERENCES `User`(UserID),
	ImageID INT NULL,
		FOREIGN KEY (ImageID) REFERENCES Image(ImageID),	
	Content TEXT,
	`Type` ENUM('Image', 'Comment'),
	CreatedDateTimeUTC DATETIME(3) DEFAULT (NOW()),
	UUID VARCHAR(255) DEFAULT (UUID())
);

CREATE TABLE PostDetail (
	PostDetailID INT AUTO_INCREMENT PRIMARY KEY,
	PostID INT,
		FOREIGN KEY (PostID) REFERENCES Post(PostID),
	Tags JSON,
	Reactions JSON,
	Pets JSON
);

CREATE TABLE Collection (
	CollectionID INT AUTO_INCREMENT PRIMARY KEY,
	AuthorUserID INT,
		FOREIGN KEY (AuthorUserID) REFERENCES `User`(UserID),	
	Title VARCHAR(255),
	Description TEXT,
	Posts JSON,	
	CreatedDateTimeUTC DATETIME(3) DEFAULT (NOW()),
	UUID VARCHAR(255) DEFAULT (UUID())
);