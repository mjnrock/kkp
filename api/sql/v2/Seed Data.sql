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

CALL ModifyEntityDetail("Kiszka", '{"breed": "Domestic Medium Hair", "color": "Calico", "sex": "Female", "weight": "12 lbs."}');
CALL ModifyEntityDetail("Buddha", '{"breed": "Domestic Short Hair", "color": "Black", "sex": "Male", "weight": "9 lbs."}');
CALL ModifyEntityDetail("Midge", '{"breed": "Cavalier King Charles Spaniel", "color": "Brown", "sex": "Female", "weight": "14 lbs."}');

CALL CreateFriendship(1, 2);

CALL CreateSession(
	"MrStretch",
    JSON_OBJECT("IP", "localhost", "UserAgent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0")
);
-- CALL DestroySession("MrStretch");
-- CALL HasSession("MrStretch");

-- CALL CreateImagePost("MrStretch", 1, "GIF", @UUID);
-- CALL CreateImagePost("SarahTheGreat", 1, "GIF", @UUID);
-- CALL CreateImagePost("MrStretch", 1, "PNG", @UUID);
-- CALL CreateImagePost("SarahTheGreat", 2, "GIF", @UUID);
-- CALL CreateImagePost("SarahTheGreat", 2, "PNG", @UUID);

-- CALL CreateReplyPost(1, 1, "Hello there, children");
-- CALL CreateReplyPost(2, 1, "Oi thah, cheeldrin");

-- CALL MapEntityAsset("Profile", 1, 1);