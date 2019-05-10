import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from '../Homepage';
import Profile from '../Profile';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/profile" component={Profile} />
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    }
}