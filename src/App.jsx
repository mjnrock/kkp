import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

import Routes from "./routes/package";

import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";

const reducer = (state, message) => {
    console.log("Dispatch:", message);

    if(message.type === "ASSIGN_TOKEN") {
        return {
            ...state,
            auth: {
                token: message.payload
            }
        }
    } else if(message.type === "LOGOUT") {
        return {
            ...state,
            auth: {
                token: null
            }
        }
    }

    return state;
};
const initialState = {
    auth: {
        token: null
    },
};
export const Context = React.createContext(initialState);

function PrivateRoute({ children, auth, ...rest }) {
    if(auth.token) {
        return (
            <Route { ...rest }>
                { children }
            </Route>
        );
    }

    return (        
        <Redirect to="/login" />
    );
}

const AuthButton = withRouter(({ history, auth, dispatch }) => {
    function logout() {
        dispatch({ type: "LOGOUT" });
        history.push("/");
    }

    if(auth.token) {
        return (
            <button onClick={ logout }>Sign out</button>
        );
    }
    
    return (
        <p>You are not logged in.</p>
    );
});

function App() {
    const [ state, dispatch ] = React.useReducer(reducer, initialState);

    function authAttempt(username, password) {
        dispatch({ type: "ASSIGN_TOKEN", payload: Date.now() });
    }

    return (
        <Router>
            <Context.Provider value={{ state, dispatch }}>
                <AuthButton auth={ state.auth } dispatch={ dispatch } />

                <Switch>
                    <Route path="/login">
                        <LoginForm onAuthAttempt={ authAttempt } />
                    </Route>
                    <Route path="/signup">
                        <SignUpForm onAuthAttempt={ dispatch } />
                    </Route>

                    <PrivateRoute path="/" auth={ state.auth }>
                        <Routes.Home />
                    </PrivateRoute>
                </Switch>
            </Context.Provider>
        </Router>
    );
}

export default App;