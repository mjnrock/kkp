export default obj => (req, res) => {
    const handle = req.params.handle;
    console.log("/family", handle);

    if(!(handle)) {
        return res.sendStatus(204);
    }

    obj.DB.Call("GetFamily", [ handle ])
    .then(results => res.send(results.all))
    .catch(e => res.sendStatus(204));
};