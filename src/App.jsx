import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Routes from "./routes/package";

import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import NavBar from "./NavBar";

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
// const initialState = {
//     auth: {
//         token: null
//     },
// };
const initialState = {
    auth: {
        token: Date.now(),
        user: "MrStretch",
        email: "email@host.com",
        first: "Matt",
        last: "Kiszkabuddhaski",
    },
};
export const Context = React.createContext(initialState);

export const EnumMessageType = {
    ASSIGN_TOKEN: "ASSIGN_TOKEN",
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
// function PrivateRoute({ children, auth, ...rest }) {
//     if(auth.token) {
//         return (
//             <Route { ...rest }>
//                 { children }
//             </Route>
//         );
//     }

//     return (        
//         <Redirect to="/login" />
//     );
// }

function App() {
    const [ state, dispatch ] = React.useReducer(reducer, initialState);

    return (
        <Router>
            <Context.Provider value={{ state, dispatch }}>
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
                        <Route path="/profile/:handle">
                            <Routes.Profile />
                        </Route>
                        <Route path="/album/:albumId">
                            <Routes.Album />
                        </Route>
                        <Route path="/post/:postId">
                            <Routes.Post />
                        </Route>
                        <Route exact path="/">
                            <Routes.Home />
                        </Route>
                    </AuthRoutes>
                </Switch>
            </Context.Provider>
        </Router>
    );
}

export default App;