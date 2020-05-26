import React, { useState, useEffect, useContext } from "react";
// eslint-disable-next-line
import { Menu, Icon, Button, Dropdown } from "semantic-ui-react";
import {
    Link,
    withRouter,
} from "react-router-dom";

import { Context, EnumMessageType } from "./App";

const AuthButton = withRouter(({ history }) => {
    const { state, dispatch } = useContext(Context);

    function logout() {
        dispatch({ type: EnumMessageType.LOGOUT });
        history.push("/");
    }

    if(state.auth.token) {
        return (
            <Button
                icon
                color="orange"
                labelPosition="left"
                onClick={ logout }
            >
                <Icon name="sign out" />
                Sign Out
            </Button>
        );
    }

    return (
        <Button
            icon
            color="orange"
            labelPosition="left"
            as={ Link }
            to="/login"
        >
            <Icon name="sign in" />
            Sign In
        </Button>
    );
});

function NavBar(props) {
    const { state } = useContext(Context);

    if(!state.user.Handle) {
        return null;
    }

    return (
        <Menu stackable>
            <Menu.Item
                as={ Link }
                to="/"
            >
                <Icon name="paw orange" size="large" />
            </Menu.Item>

            <Menu.Item
                as={ Link }
                to={ `/profile/${ state.user.Handle }` }
            >
                Profile
            </Menu.Item>

            <Menu.Item
                as={ Link }
                to="/upload"
            >
                Upload
            </Menu.Item>

            <Menu.Item
                as={ Link }
                to={ `/friends/${ state.user.Handle }` }
            >
                Friends
            </Menu.Item>

            <Menu.Item
                as={ Link }
                to={ `/feed/${ state.user.Handle }` }
            >
                Feed
            </Menu.Item>

            {/* <Menu.Item
                as={ Link }
                to="/album/1"
            >
                Album #1
            </Menu.Item> */}

            {/* <Menu.Item
                as={ Link }
                to="/profile"
            >
                <Button
                    icon
                    color="orange"
                    labelPosition="left"
                    as={ Link }
                    to="/login"
                >
                    <Icon name="upload" />
                    Upload
                </Button>
            </Menu.Item> */}

            {/* <Menu.Item
                as={ Link }
                to="/album/1"
            >
                <Radio toggle color="orange" style={{ marginRight: 10 }} />
                Owner
            </Menu.Item> */}

            <Menu.Menu position="right">
                <Menu.Item>
                    <Dropdown text={ <span>Posting as: <span style={{ fontWeight: "bold", color: "#F2711C", color: "#21BA45" }}>{ state.user.Handle }</span></span> }>
                        <Dropdown.Menu>
                            <Dropdown.Item icon="star outline" text={ state.user.Handle } />
                            <Dropdown.Divider />
                            {
                                state.pets.map(pet => (
                                    <Dropdown.Item icon="paw" text={ pet.EntityHandle } />
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                
                <Menu.Item>
                    <AuthButton />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default NavBar;