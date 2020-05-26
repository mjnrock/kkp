/* eslint-disable */
import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Icon, Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { Context, EnumMessageType } from "../App";

function LoginForm(props) {
    const { state, dispatch, config } = useContext(Context);

    const [ email, setEmail ] = useState("email@aol.com");
    const [ password, setPassword ] = useState("P@$sw0rd");

    function attemptAuth() {
        //TODO Encrypt password before sending
        if(email.length && password.length > 7) {
            config.api.Post("login", {
                "email": email,
                "password": password,
            })
            .then(response => response.json())
            .then(data => {
                if(data.Token) {
                    dispatch({
                        type: EnumMessageType.LOGIN,
                        payload: data
                    });
                }
            });
        }
    }

    console.log(state);

    if(state.auth.token) {
        return (
            <Redirect to="/" />
        );
    }

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="orange" textAlign="center">
                    <Icon name="paw" /> Welcome Back!
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            value={ email }
                            onChange={ e => setEmail(e.target.value) }
                            fluid
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email"
                        />

                        <Form.Input
                            value={ password }
                            onChange={ e => setPassword(e.target.value) }
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                        />

                        <Button color="orange" fluid size="large" onClick={ attemptAuth }>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to="/signup">Join Now</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default LoginForm;