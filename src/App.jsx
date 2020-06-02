import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { fabric } from "fabric";

import Routes from "./routes/package";
import APIHelper from "./lib/APIHelper";

import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import NavBar from "./NavBar";
import ScrollToTop from "./ScrollToTop";

const reducer = (state, message) => {
    console.log("Dispatch:", message);
    const data = message.payload || {};

    if(message.type === EnumMessageType.LOGOUT) {
        return {
            ...state,
            auth: {},
            user: {}
        };
    } else if(message.type === EnumMessageType.LOGIN) {
        const { Token: token, ...user } = data;

        return {
            ...state,
            auth: {
                token: token
            },
            user: user
        }
    } else if(message.type === EnumMessageType.FABRIC_DATA) {
        console.log(data);
        
        return {
            ...state,
            fabric: data
        };
    }
    return state;
};
const initialState = {
    auth: {},
    user: {},
    pets: [],
    fabric: null
};
export const Context = React.createContext(initialState);

export const EnumMessageType = {
    FABRIC_DATA: "FABRIC_DATA",

    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

// eslint-disable-next-line
function AuthRoutes({ children, auth }) {
    if(auth.token) {
        return children;
    }

    return (        
        <Redirect to="/login" />
    );
}

const fabricCanvas = new fabric.Canvas();
fabricCanvas.on("mouse:down", (event) => {
    const target = event.target;    // This will be the Object or null

    if(event.button === 1) {
        console.log("canvas left click");
    }
    if(event.button === 2) {
        console.log("canvas middle click");
    }
    if(event.button === 3) {
        console.log("canvas right click");
    }
});

function App() {
    const [ state, dispatch ] = React.useReducer(reducer, initialState);
    
    const config = {
        api: null,
        server: "http://192.168.86.100:3001",
        // server: "http://localhost:3001",
    };
    config.api = new APIHelper(config.server, state.auth.token);

    return (
        <Router>
            <ScrollToTop>
                <Context.Provider value={{ state, dispatch, config, fabric: fabricCanvas }}>
                    <NavBar auth={ state.auth } dispatch={ dispatch } />

                    <Switch>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                        <Route path="/signup">
                            <SignUpForm />
                        </Route>
                        
                        <AuthRoutes auth={ state.auth }>
                            <Route path="/upload">
                                <Routes.Upload />
                            </Route>
                            <Route path="/studio/:uuid">
                                <Routes.Studio />
                            </Route>
                            <Route path="/feed/:handle">
                                <Routes.Feed />
                            </Route>
                            <Route path="/friends/:handle">
                                <Routes.Friends />
                            </Route>
                            <Route path="/profile/:handle">
                                <Routes.Profile />
                            </Route>
                            <Route path="/post/:uuid">
                                <Routes.Post />
                            </Route>
                            <Route exact path="/">
                                <Routes.Feed handle={ state.user.Handle } />
                            </Route>
                        </AuthRoutes>
                    </Switch>
                </Context.Provider>
            </ScrollToTop>
        </Router>
    );
}

export default App;