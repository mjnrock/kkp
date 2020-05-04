import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Routes from "./routes/package";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Routes.Login />
                </Route>
                <Route path="/signup">
                    <Routes.SignUp />
                </Route>
                <Route path="/">
                    <Routes.Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;