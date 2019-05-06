import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss';

import Login from '../Login';
import VerifyNumber from '../VerifyNumber';
import Dashboard from '../Dashboard';

import { showDashboard } from '../../actions';

class Homepage extends React.Component {
    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.props.showDashboard();
        }
    }
    render() {
        console.log(this.props);
        return <div className="container">
            {this.props.screen === 'getMobileNumberScreen' && <Login />}
            {this.props.screen === 'verifyNumber' && <VerifyNumber />}
            {this.props.screen === 'dashboard' && <Dashboard />}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        screen: state.screen
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showDashboard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);