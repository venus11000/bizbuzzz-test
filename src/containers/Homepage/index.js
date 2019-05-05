import React from 'react';
import './style.scss';
import Login from '../Login';
import VerifyNumber from '../VerifyNumber';
import { connect } from 'react-redux';

class Homepage extends React.Component {
    render() {
        console.log(this.props);
        return <div className="container">
            {/* <Login /> */}
            <VerifyNumber />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        mobile: state.mobile,
        otp: state.otp
    }
}
export default connect(mapStateToProps, null)(Homepage);