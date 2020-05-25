USE kkp;

CALL CreateGroup("Family", "Kiszkabuddhaski", @GroupUUID);

CALL CreateAccount("MrStretch", "Matt", "email@aol.com", "P@$sw0rd", "MrStretch", NULL);
CALL CreateAccount("Sarahhzona", "Sarah", "shrah@aol.com", "P@$sw0rd", "SarahTheGreat", NULL);

CALL MapGroupEntity(@GroupUUID, "MrStretch", @NULL);
CALL MapGroupEntity(@GroupUUID, "Sarahhzona", @NULL);
CALL CreateEntity("Cat", "Kiszka", "Kiszka", @UUID);
CALL MapGroupEntity(@GroupUUID, @UUID, @NULL);
CALL CreateEntity("Cat", "Buddha", "Buddha", @UUID);
CALL MapGroupEntity(@GroupUUID, @UUID, @NULL);
CALL CreateEntity("Dog", "Midge", "Margery Stuart Baxter", @UUID);
CALL MapGroupEntity(@GroupUUID, @UUID, @NULL);

CALL CreateFriendship(1, 2);

-- CALL CreateImagePost("MrStretch", 1, "GIF", @UUID);
-- CALL CreateImagePost("SarahTheGreat", 1, "GIF", @UUID);
-- CALL CreateImagePost("MrStretch", 1, "PNG", @UUID);
-- CALL CreateImagePost("SarahTheGreat", 2, "GIF", @UUID);
-- CALL CreateImagePost("SarahTheGreat", 2, "PNG", @UUID);

-- CALL CreateReplyPost(1, 1, "Hello there, children");
-- CALL CreateReplyPost(2, 1, "Oi thah, cheeldrin");

-- CALL MapEntityAsset("Profile", 1, 1);