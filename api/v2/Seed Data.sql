USE kkp;

CALL CreateAccount("Matt", "email@aol.com", "P@$sw0rd", "MrStretch", NULL);
CALL CreateAccount("Sarah", "shrah@aol.com", "P@$sw0rd", "SarahTheGreat", NULL);

CALL CreateFriendship(1, 2);

CALL CreateAsset(1, "Image", "GIF", NULL);