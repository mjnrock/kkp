export default obj => (req, res) => {
    const message = req.body;
    const { email, password } = message;
    const detail = JSON.stringify({
        IP: req.connection.remoteAddress,
        UserAgent: req.header("User-Agent")
    });
    console.log("/login", message);

    if(!(email && password)) {
        return res.sendStatus(204);
    }

    obj.DatabaseHelper.Call("Login", [ email, password, [ "@UUID" ]])
    .then(resultsLogin => {
        if(resultsLogin.hasResults) {
            obj.DatabaseHelper.Call("CreateSession", [ email, detail ])
            .then(results => {
                if(results.hasResults) {
                    const dbrow = results.first;
                    
                    //TODO Some precaution should be implemented when a session is already established (e.g. might suggest compromised account)
                    //TODO There are also several ways to spoof this token right now, as no meaningful check (other than expiration) currently takes place
                    const token = obj.TokenHelper.CreateToken({
                        session: dbrow.SessionUUID,
                        account: {
                            uuid: dbrow.AccountUUID,
                            username: dbrow.AccountUsername
                        },
                        account: {
                            uuid: dbrow.AccountUUID,
                            username: dbrow.AccountUsername
                        },
                        detail,
                        created: dbrow.CreatedDateTimeUTC,
                        expiration: dbrow.ExpirationDateTimeUTC
                    });

                    console.log(obj.TokenHelper.DecryptToken(token))
            
                    return res.send({
                        Token: token,
                        ...(resultsLogin.first || {})
                    });
                }

                throw new Error();
            });
        }
    })
    .catch(e => res.sendStatus(204));
};