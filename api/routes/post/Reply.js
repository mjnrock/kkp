export default obj => (req, res) => {
    const message = req.body;
    const token = obj.TokenHelper.DecryptToken(req.header("X-Auth"));
    const { post, entity, reply } = message;
    console.log("/post/react", post, entity, reply, token);

    if(!(token && post && entity && reply)) {
        return res.sendStatus(204);
    }

    obj.DatabaseHelper.Call("CreateReplyPost", [ entity, post, reply ])
    .then(results => res.send(results.first))
    .catch(e => res.sendStatus(204));
};