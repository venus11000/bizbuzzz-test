import React from 'react';
import './style.scss';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

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
        console.log(event.target.name, event.target.value);
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
        console.log(this.state);
    }
    resendOTP() {
        //  API to Resend OTP
        console.log("Resend");
    }
    reset() {
        this.setState({
            data: {
                otp: '',
            },
            enableSubmit: false
        })
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

export default VerifyNumber;