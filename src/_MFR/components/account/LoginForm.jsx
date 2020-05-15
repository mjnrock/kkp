/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import { Icon, Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react"

const LoginForm = () => (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="orange" textAlign="center">
                <Icon name="paw" /> Welcome Back!
            </Header>
            <Form size="large">
                <Segment stacked>
                    <Form.Input fluid icon="mail" iconPosition="left" placeholder="Email" />
                    <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                    />

                    <Button color="orange" fluid size="large" as={ Link } to="/">
                        Login
                    </Button>
                </Segment>
            </Form>
            <Message>
                New to us? <Link to="/signup">Join Now</Link>
            </Message>
        </Grid.Column>
    </Grid>
)

export default LoginForm;