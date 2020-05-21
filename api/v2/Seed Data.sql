USE kkp;

CALL CreateAccount("MrSir", "Matt", "email@aol.com", "P@$sw0rd", "MrStretch", NULL);
CALL CreateAccount("Sarazona", "Sarah", "shrah@aol.com", "P@$sw0rd", "SarahTheGreat", NULL);

CALL CreateFriendship(1, 2);

CALL CreateImagePost("MrStretch", 1, "GIF", NULL, @UUID);
CALL CreateImagePost("SarahTheGreat", 1, "GIF", NULL, @UUID);
CALL CreateImagePost("MrStretch", 1, "PNG", NULL, @UUID);
CALL CreateImagePost("SarahTheGreat", 2, "GIF", NULL, @UUID);
CALL CreateImagePost("SarahTheGreat", 2, "PNG", NULL, @UUID);

CALL CreateReplyPost(1, 1, "Hello there, children");
CALL CreateReplyPost(2, 1, "Oi thah, cheeldrin");

SELECT @UUID;