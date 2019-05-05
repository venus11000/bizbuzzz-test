import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from '../../containers/Homepage';

export default class App extends React.Component {
    render() {
        return <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage} />
            </Switch>
        </BrowserRouter>
    }
}