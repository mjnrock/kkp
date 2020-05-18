import React from "react";
import {
    Link,
    withRouter,
} from "react-router-dom";

// eslint-disable-next-line
import { Menu, Icon, Button, Radio } from "semantic-ui-react";
import { useContext } from "react";
import { Context, EnumMessageType } from "./App";

const AuthButton = withRouter(({ history }) => {
    const { state, dispatch } = useContext(Context);

    function logout() {
        dispatch({ type: EnumMessageType.LOGOUT });
        history.push("/");
    }

    console.log(state)

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
                to={ `/profile/${ state.auth.handle }` }
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
                to={ `/friends/${ state.auth.handle }` }
            >
                Friends
            </Menu.Item>

            <Menu.Item
                as={ Link }
                to={ `/feed/${ state.auth.handle }` }
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
                    <AuthButton />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default NavBar;