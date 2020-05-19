/* eslint-disable */
import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Icon, Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { Context, EnumMessageType } from "../App";

function SignUpForm(props) {
    const { state, dispatch } = useContext(Context);

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    function isEmailValid() {
        return email.length;
    }
    function isPasswordValid() {
        return password.length > 4;
    }
    function isConfirmPasswordValid() {
        return confirmPassword.length > 4;
    }
    function arePasswordsValid() {
        return isPasswordValid()
            && isConfirmPasswordValid()
            && password === confirmPassword;
    }    
    function isValidSignUp() {
        return isEmailValid()
            && arePasswordsValid();
    }

    function attemptSignUp() {
        if(email.length && arePasswordsValid()) {
            fetch("http://192.168.86.100:3001/signup", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.token) {
                    dispatch({
                        type: EnumMessageType.ASSIGN_TOKEN,
                        payload: data.token
                    });
                }
            });
        }
    }

    if(state.auth.token) {
        return (
            <Redirect to="/" />
        );
    }

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="green" textAlign="center">
                    <Icon name="paw" /> Create New Account
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
                            error={ isPasswordValid() ? false : true }
                        />
                        <Form.Input
                            value={ confirmPassword }
                            onChange={ e => setConfirmPassword(e.target.value) }
                            fluid
                            icon={ arePasswordsValid() ? "check green" : "x red" }
                            iconPosition="left"
                            placeholder="Confirm Password"
                            type="password"
                            error={ arePasswordsValid() ? false : true }
                        />

                        <Button
                            color="green"
                            fluid
                            size="large"
                            onClick={ attemptSignUp }
                            disabled={ isValidSignUp() ? false : true }
                        >
                            Join Now
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already have account? <Link to="/login">Login</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default SignUpForm;