/* eslint-disable */
import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Icon, Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { Context } from "../App";

function LoginForm(props) {
    const { state } = useContext(Context);
    // let emailRef = React.createRef();
    // let passwordRef = React.createRef();

    function attemptLogin() {
        // const email = emailRef.current.value;
        // const password = passwordRef.current.value;

        props.onAuthAttempt({
            type: "FAKE_AUTH",
            // payload: {
            //     email,
            //     password
            // }
        });
    }

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
                            // ref={ emailRef }
                            fluid
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email"
                        />

                        <Form.Input
                            // ref={ passwordRef }
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                        />

                        <Button color="orange" fluid size="large" onClick={ attemptLogin }>
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