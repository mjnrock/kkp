export default obj => (req, res) => {
    const message = req.body;
    const { email, password } = message;
    console.log("/login", message);

    if(!(email && password)) {
        return res.sendStatus(204);
    }

    obj.DatabaseHelper.Call("Login", [ email, password, [ "@UUID" ]])
    .then(results => {
        const token = obj.TokenHelper.CreateToken({
            email,
            password,
            expiration: 60 * 60 * 24 * 1000,
        });    // 24 Hours

        return res.send({
            Token: token,
            ...(results.first || {})
        });
    })
    .catch(e => res.sendStatus(204));
};