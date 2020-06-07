export default obj => (req, res) => {
    const handle = req.params.handle;
    console.log("/entity", handle);

    if(!(handle)) {
        return res.sendStatus(204);
    }

    obj.DatabaseHelper.Call("GetEntity", [ handle ])
    .then(results => res.send(results.first))
    .catch(e => res.sendStatus(204));
};