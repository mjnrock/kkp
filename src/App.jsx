import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Routes from "./routes/package";
import APIHelper from "./lib/APIHelper";

import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import NavBar from "./NavBar";

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
    }
    return state;
};
const initialState = {
    auth: {},
    user: {},
    pets: [],
};
export const Context = React.createContext(initialState);

export const EnumMessageType = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
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

function App() {
    const [ state, dispatch ] = React.useReducer(reducer, initialState);
    
    const config = {
        api: null,
        // server: "http://192.168.86.100:3001",
        server: "http://192.168.86.43:3001",
        // server: "http://localhost:3001",
    };
    config.api = new APIHelper(config.server, state.auth.token);

    return (
        <Router>
            <Context.Provider value={{ state, dispatch, config }}>
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
        </Router>
    );
}

export default App;