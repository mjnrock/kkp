/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import { Icon, Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react"

const SignUpForm = () => (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="green" textAlign="center">
                <Icon name="paw" /> Create New Account
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

                    <Button color="green" fluid size="large" as={ Link } to="/">
                        Join Now
                    </Button>
                </Segment>
            </Form>
            <Message>
                Already have account? <Link to="/login">Login</Link>
            </Message>
        </Grid.Column>
    </Grid>
)

export default SignUpForm;