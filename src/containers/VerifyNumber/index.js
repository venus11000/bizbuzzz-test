import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { showLoginScreen, login } from '../../actions';

class VerifyNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                otp: ''
            },
            enableSubmit: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
    }
    handleChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;

        let data = { ...this.state.data };

        switch (fieldName) {
            default: data[fieldName] = fieldValue;
        }
        this.setState({ data });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.login({ ...this.props.loginData, otp: this.state.data.otp });
    }
    resendOTP() {
        //  API to Resend OTP
        console.log("Resend", this.state);
    }
    reset() {
        this.setState({
            data: {
                otp: '',
            },
            enableSubmit: false
        });
        this.props.showLoginScreen();
    }
    render() {
        let data = { ...this.state.data };
        return (
            <div className="login-container">
                <div className="login-content">
                    <div className="login-title">Verify your phone number</div>
                    <div className="verify-number">Enter the 6-digit code we sent to <span>+91 8495030355</span></div>
                    <div className="login-field-container">
                        <Input
                            label="6-digit code"
                            name="otp"
                            onChange={this.handleChange}
                            value={data.otp}
                        />
                    </div>
                    <div className="login-btn-container">
                        <Button
                            label="Cancle"
                            className="reset"
                            onClick={this.reset}
                        />
                        <Button
                            label="Continue"
                            onClick={this.handleSubmit}
                            disable={!this.enableSubmit}
                        />
                    </div>
                    <p className="login-desc">By tapping Continue you are indicating that you agree to the <a>Terms of Service</a></p>
                    <div className="flex-container">
                        <Button
                            label="Resend"
                            onClick={this.resendOTP}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        loginData: state.loginData
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showLoginScreen, login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyNumber);