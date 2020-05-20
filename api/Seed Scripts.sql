USE kkp;

CALL SignUp('matt', '123456');
CALL SignUp('sarah', '654321');
CALL SignUp('ttam', '123456');
CALL SignUp('haras', '654321');

CALL CreateUserDetail(1, 'Mart', 'Marty', 'Rocks');
CALL CreateUserDetail(2, 'Surr', 'Srah', 'Rocks');
CALL CreateUserDetail(3, 'Tram', 'Ytram', 'Skcor');
CALL CreateUserDetail(4, 'Rrus', 'Hars', 'Skcor');

CALL UpdateBio("Mart", "This is a test bio");

CALL AddFollower(2, 1, 1);
CALL AddFollower (3, 1, NULL);
CALL RemoveFollower(4, 1, NULL);
CALL AddFollower (3, 2, NULL);

CALL CreateGroup(1, "Rocks2", "Family", NULL);

CALL AddGroupMember(1, 1);
CALL AddGroupMember(1, 2);
CALL RemoveGroupMember(1, 1);

CALL CreatePet(1, "Kiszka", "Cat", JSON_OBJECT("color", "Calico", "breed", "DMH"));
CALL CreatePet(1, "Buddha", "Cat", JSON_OBJECT("color", "Black", "breed", "DSH"));

CALL CreatePost(1, "Comment", "This is a comment", NULL, NULL);	-- Comment Post
CALL CreatePost(1, "Comment", "This is a child comment", NULL, 1);	-- Comment Post


USE kkp;

CALL AddPostPet(1, 1);
CALL AddPostPet(1, 2);

CALL AddPostTag(1, "cat");
CALL AddPostTag(1, "dog");

CALL AddPostReaction(1, 1, ":dog2:");
CALL AddPostReaction(1, 1, ":cat2:");

SELECT * FROM Post;
SELECT * FROM PostDetail;

CALL RemovePostTag(1, "cat");

SELECT * FROM Post;
SELECT * FROM PostDetail;


CALL CreateImage(1, "PNG", "pusheen");

SELECT * FROM Image;