export default obj => (req, res) => {
    const handle = req.params.handle;
    console.log("/friends", handle);

    if(!(handle)) {
        return res.sendStatus(204);
    }

    obj.DatabaseHelper.Call("GetFriends", [ handle ])
    .then(results => res.send(results.all))
    .catch(e => res.sendStatus(204));
};