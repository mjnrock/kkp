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

    return (
        <Context.Provider value={{ state, dispatch }}>
            <Router>
                <Switch>
                    <Route path="/">
                        <Routes.Home />
                    </Route>
                </Switch>
            </Router>
        </Context.Provider>
    );
}

export default App;