export default obj => (req, res) => {
    const message = req.body;
    const token = obj.TokenHelper.DecryptToken(req.header("X-Auth"));
    const { post, entity, reaction } = message;
    console.log("/post/react", post, entity, reaction, token);

    if(!(token && post && entity && reaction)) {
        return res.sendStatus(204);
    }

    obj.DatabaseHelper.Call("CreatePostReaction", [ entity, post, reaction ])
    .then(results => res.send(results.first))
    .catch(e => res.sendStatus(204));
};