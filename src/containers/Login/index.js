import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { login } from '../../actions';

const countryCode = ["+91", "+123", "+345"];
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableSubmit: false,
            data: {
                mobileNumber: '',
                countryCode: countryCode[0]
            }
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
        this.props.login(this.state.data);
    }
    reset() {
        this.setState({
            data: {
                mobileNumber: '',
                countryCode: countryCode[0]
            }
        })
    }
    render() {
        let data = { ...this.state.data };
        return (
            <div className="login-container">
                <div className="login-content">
                    <div className="login-title">Enter your phone number</div>
                    <div className="login-field-container">
                        <select className="contry-code-select" name="countryCode" onChange={this.handleChange} value={data.countryCode}>
                            {countryCode.map((country, index) =>
                                <option key={index} value={country}>{country}</option>)}
                        </select>
                        <div>
                            <Input
                                label="Phone Number"
                                name="mobileNumber"
                                onChange={this.handleChange}
                                value={data.mobileNumber}
                            />
                        </div>
                    </div>
                    <div className="login-btn-container">
                        <Button
                            label="Cancle"
                            className="reset"
                            onClick={this.reset}
                        />
                        <Button
                            label="Verify"
                            onClick={this.handleSubmit}
                            disable={!this.enableSubmit}
                        />
                    </div>
                    <p className="login-desc">By tapping Verify, an SMS may be sent. Message & data rates may apply.</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mobileNumber: state.mobileNumber
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);