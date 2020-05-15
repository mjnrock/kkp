import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";

import Routes from "./routes/package";

import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";

const reducer = (state, message) => {
    console.log("Dispatch:", message);

    if(message.type === EnumMessageType.ASSIGN_TOKEN) {
        return {
            ...state,
            auth: {
                token: message.payload
            }
        }
    } else if(message.type === EnumMessageType.LOGOUT) {
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

export const EnumMessageType = {
    ASSIGN_TOKEN: "ASSIGN_TOKEN",
    LOGOUT: "LOGOUT",
};

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
        dispatch({ type: EnumMessageType.LOGOUT });
        history.push("/");
    }

    if(auth.token) {
        return (
            <button onClick={ logout }>Sign out</button>
        );
    }

    return null;
});

function App() {
    const [ state, dispatch ] = React.useReducer(reducer, initialState);

    return (
        <Router>
            <Context.Provider value={{ state, dispatch }}>
                <AuthButton auth={ state.auth } dispatch={ dispatch } />

                <Switch>
                    <Route path="/login">
                        <LoginForm />
                    </Route>
                    <Route path="/signup">
                        <SignUpForm />
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