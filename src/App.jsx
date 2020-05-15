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

    console.log(state, message);

    if(message.type === "FAKE_AUTH") {
        return {
            ...state,
            auth: {
                token: Date.now()
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
    
    return (
        auth.token ? (
            <button onClick={ e => {
                dispatch({ type: "LOGOUT" });
                history.push("/");
            }}>Sign out</button>
        ) : (
            <p>You are not logged in.</p>
        )
    );
});

function App() {
    const [ state, dispatch ] = React.useReducer(reducer, initialState);

    console.log(state)

    return (
        <Router>
            <Context.Provider value={{ state, dispatch }}>
                <AuthButton auth={ state.auth } dispatch={ dispatch } />

                <Switch>
                    <Route path="/login">
                        <LoginForm onAuthAttempt={ dispatch } />
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