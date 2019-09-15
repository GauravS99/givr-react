import * as React from "react";
import { hot } from "react-hot-loader";

import Header from "../shared/Header";

import AppBody from '../shared/AppBody';
import "./../assets/scss/App.scss";

class App extends React.Component<{}, undefined> {
    public render() {
        return (
            <React.Fragment>
                <Header/>
                <AppBody/>
            </React.Fragment>
        );
    }
}

declare let module: object;

export default hot(module)(App);
