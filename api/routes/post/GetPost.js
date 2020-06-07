export default obj => (req, res) => {
    const uuid = req.params.uuid;
    console.log("/post", uuid);

    if(!(uuid)) {
        return res.sendStatus(204);
    }

    /**
     * 0: $UUID (UUID)
     */
    obj.DatabaseHelper.Call("GetPost", [ uuid ])
    .then(results => res.send(results.first))
    .catch(e => res.sendStatus(204));
};