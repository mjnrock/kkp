import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Routes from "./routes/package";

const reducer = (state, message) => {
    console.log(message);
    
    return state;
};
const initialState = { state: null, dispatch: null };
export const Context = React.createContext(initialState);

function App() {
    const [ state, dispatch ] = React.useReducer(reducer, initialState);

    //TODO In <Route path="/feed/:feedId?">, "?" makes it optional for testing purposes
    return (
        <Context.Provider value={{ state, dispatch }}>
            <Router>
                <Switch>
                    <Route path="/login">
                        <Routes.Login />
                    </Route>
                    <Route path="/signup">
                        <Routes.SignUp />
                    </Route>
                    <Route path="/album">
                        <Routes.Album />
                    </Route>
                    <Route path="/upload">
                        <Routes.Upload />
                    </Route>
                    <Route path="/feed/:feedId?">
                        <Routes.Feed />
                    </Route>
                    <Route path="/">
                        <Routes.Home />
                    </Route>
                </Switch>
            </Router>
        </Context.Provider>
    );
}

export default App;