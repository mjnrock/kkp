USE kkp;

DROP TABLE IF EXISTS `CollectionAsset`;
DROP TABLE IF EXISTS `Collection`;
DROP TABLE IF EXISTS `PostHierarchy`;
DROP TABLE IF EXISTS `PostReaction`;
DROP TABLE IF EXISTS `PostAsset`;
DROP TABLE IF EXISTS `PostDetail`;
DROP TABLE IF EXISTS `Post`;
DROP TABLE IF EXISTS `Relation`;
DROP TABLE IF EXISTS `Asset`;
DROP TABLE IF EXISTS `GroupEntity`;
DROP TABLE IF EXISTS `Group`;
DROP TABLE IF EXISTS `Account`;
DROP TABLE IF EXISTS `Entity`;

CREATE TABLE `Entity` (
	EntityID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	DEEntityTypeID INT NOT NULL,
		FOREIGN KEY (DEEntityTypeID) REFERENCES DictionaryEntry(DictionaryEntryID),
    `Name` VARCHAR(255) NOT NULL,
    Detail JSON NULL,
    UUID VARCHAR(255) UNIQUE NOT NULL DEFAULT (UUID())
);

CREATE TABLE `Account` (
	AccountID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	EntityID INT NOT NULL,
		FOREIGN KEY (EntityID) REFERENCES `Entity`(EntityID),
    Email VARCHAR(255) UNIQUE NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    Username VARCHAR(255) UNIQUE NOT NULL,
	CreatedDateTimeUTC DATETIME(3) NOT NULL DEFAULT (NOW()),
    UUID VARCHAR(255) UNIQUE NOT NULL DEFAULT (UUID())
);

CREATE TABLE `Relation` (
	RelationID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	DERelationTypeID INT NOT NULL,
		FOREIGN KEY (DERelationTypeID) REFERENCES DictionaryEntry(DictionaryEntryID),
	LeftEntityID INT NOT NULL,
		FOREIGN KEY (LeftEntityID) REFERENCES `Entity`(EntityID),
	RightEntityID INT NOT NULL,
		FOREIGN KEY (RightEntityID) REFERENCES `Entity`(EntityID)
);
ALTER TABLE `Relation` ADD UNIQUE `Unique_Entry_Index`(`DERelationTypeID`, `LeftEntityID`, `RightEntityID`);

CREATE TABLE `Asset` (
	AssetID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	AccountID INT NOT NULL,
		FOREIGN KEY (AccountID) REFERENCES `Account`(AccountID),
    UUID VARCHAR(255) UNIQUE NOT NULL DEFAULT (UUID()),    
	DEAssetTypeID INT NOT NULL,
		FOREIGN KEY (DEAssetTypeID) REFERENCES DictionaryEntry(DictionaryEntryID),
	DEAssetExtensionID INT NOT NULL,
		FOREIGN KEY (DEAssetExtensionID) REFERENCES DictionaryEntry(DictionaryEntryID),
    Detail JSON NULL
);

CREATE TABLE `Post` (
	PostID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	DEPostTypeID INT NOT NULL,
		FOREIGN KEY (DEPostTypeID) REFERENCES DictionaryEntry(DictionaryEntryID),
    UUID VARCHAR(255) UNIQUE NOT NULL DEFAULT (UUID())
);

CREATE TABLE `PostDetail` (
	PostDetailID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	PostID INT NOT NULL,
		FOREIGN KEY (PostID) REFERENCES `Post`(PostID),
	Detail JSON NOT NULL
);

CREATE TABLE `PostAsset` (
	PostAssetID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	PostID INT NOT NULL,
		FOREIGN KEY (PostID) REFERENCES `Post`(PostID),
	AssetID INT NOT NULL,
		FOREIGN KEY (AssetID) REFERENCES `Asset`(AssetID)
);

CREATE TABLE `PostReaction` (
	PostReactionID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	PostID INT NOT NULL,
		FOREIGN KEY (PostID) REFERENCES `Post`(PostID),
	EntityID INT NOT NULL,
		FOREIGN KEY (EntityID) REFERENCES `Entity`(EntityID),
	Reaction VARCHAR(255) NOT NULL
);

CREATE TABLE `PostHierarchy` (
	PostHierarchyID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	ParentPostID INT NOT NULL,
		FOREIGN KEY (ParentPostID) REFERENCES `Post`(PostID),
	PostID INT NOT NULL,
		FOREIGN KEY (PostID) REFERENCES `Post`(PostID)
);

CREATE TABLE `Collection` (
	CollectionID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	EntityID INT NOT NULL,
		FOREIGN KEY (EntityID) REFERENCES `Entity`(EntityID),	
	DECollectionTypeID INT NOT NULL,
		FOREIGN KEY (DECollectionTypeID) REFERENCES DictionaryEntry(DictionaryEntryID),
    Detail JSON NULL,
    UUID VARCHAR(255) UNIQUE NOT NULL DEFAULT (UUID())
);

CREATE TABLE `CollectionAsset` (
	CollectionAssetID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	CollectionID INT NOT NULL,
		FOREIGN KEY (CollectionID) REFERENCES `Collection`(CollectionID),
	AssetID INT NOT NULL,
		FOREIGN KEY (AssetID) REFERENCES `Asset`(AssetID),
	`Order` INT NULL
);

CREATE TABLE `Group` (
	GroupID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	DEGroupTypeID INT NOT NULL,
		FOREIGN KEY (DEGroupTypeID) REFERENCES DictionaryEntry(DictionaryEntryID),
    Detail JSON NULL,
    UUID VARCHAR(255) UNIQUE NOT NULL DEFAULT (UUID())
);

CREATE TABLE `GroupEntity` (
	GroupEntityID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	GroupID INT NOT NULL,
		FOREIGN KEY (GroupID) REFERENCES `Group`(GroupID),
	EntityID INT NOT NULL,
		FOREIGN KEY (EntityID) REFERENCES `Entity`(EntityID)
);