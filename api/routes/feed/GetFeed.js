export default obj => (req, res) => {
    const handle = req.params.handle;
    console.log("/feed", handle);

    if(!(handle)) {
        return res.sendStatus(204);
    }

    /**
     * 0: $Entity (Handle|UUID)
     * 1: $BeginDateTime (DATETIME(3)|NULL)
     */
    obj.DatabaseHelper.Call("GetFeed", [ handle, [ "NULL" ] ])
    .then(results => res.send(results.all))
    .catch(e => res.sendStatus(204));
};