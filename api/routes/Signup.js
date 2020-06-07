export default obj => (req, res) => {
    //TODO This code is WIP and is more or less just a copy/paste template
    const message = req.body;
    const { email, password } = message;
    console.log("/signup", message);

    if(!(email && password)) {
        return res.sendStatus(204);
    }

    obj.DatabaseHelper.query(`CALL SignUp(?, ?, @NULL)`, [ email, password ], function (error, resultSets, fields) {
        const [ results ] = resultSets || [[]];
    
        if(results[ 0 ]) {
            const token = createToken(email, password, 60 * 60 * 24 * 1000);    // 24 Hours

            return res.send({
                Token: token,
                ...(results[ 0 ] || {})
            });
        }
        
        return res.sendStatus(204);
    });
};