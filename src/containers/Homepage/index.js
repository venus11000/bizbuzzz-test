import React from 'react';
import './style.scss';
import Login from '../Login';

class Homepage extends React.Component {
    render() {
        return <div className="container">
            <Login />
        </div>
    }
}

export default Homepage;