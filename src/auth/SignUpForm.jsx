/* eslint-disable */
import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Icon, Button, Form, Grid, Header, Message, Segment, Select, Input, Divider } from "semantic-ui-react";
import { Context, EnumMessageType } from "../App";

const genderOptions = [
    { key: "f", text: "Female", value: "female", icon: "woman" },
    { key: "m", text: "Male", value: "male", icon: "man" },
    { key: "o", text: "Non Binary", value: "other", icon: "transgender alternate" },
];

function SignUpForm(props) {
    const { state, dispatch, config } = useContext(Context);

    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
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
        if (email.length && arePasswordsValid()) {
            config.api.Post("signup", {
                "email": email,
                "password": password
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    dispatch({
                        type: EnumMessageType.ASSIGN_TOKEN,
                        payload: data.token
                    });
                }
            });
        }
    }

    if (state.auth.token) {
        return (
            <Redirect to="/" />
        );
    }

    return (
        <Grid textAlign="center" style={ { height: "100vh" } } verticalAlign="middle">
            <Grid.Column style={ { width: 550 } }>
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
                            value={ username }
                            onChange={ e => setUsername(e.target.value) }
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
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

                        <br />
                        <Divider horizontal>Bio</Divider>
                        
                        <Form.Group widths="equal">
                            <Form.Input
                                placeholder="First Name"
                            />
                            <Form.Input
                                placeholder="Last Name"
                            />
                        </Form.Group>
                        
                        <Form.Select
                            options={ genderOptions }
                            placeholder="Gender"
                        />

                        <br />
                        <Form.Checkbox label='I agree to the Terms and Conditions' />
                        <br />

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