import React from 'react';
import { Form, Icon, Input, Dropdown, Menu, Button, Col, Row } from 'antd';

import './style.scss';

const countryCode = ["+91", "+123", "+345"];

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: '+91',
            enableSubmit: false,
            data: {
                mobile: ''
            }
        }
        this.changeDropdown = this.changeDropdown.bind(this);
        this.setMobile = this.setMobile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.validate = this.validate.bind(this);
    }
    changeDropdown(event) {
        this.setState({ dropdown: countryCode[event.key] });
    }
    validate() {
        let data = { ...this.state.data };
        let enableSubmit = false;
        for (let key in data) {
            if (data[key]) {
                enableSubmit = true;
                break;
            } else {
                enableSubmit = false;
            }
        }
        this.setState({ enableSubmit });
    }
    setMobile(event) {
        let data = { ...this.state.data };
        data[event.target.name] = event.target.value;
        this.setState({ data }, () => this.validate());
    }
    onSubmit(event) {
        event.preventDefault();
        //API Call
        console.log("API", this.state.data);
    }
    resetForm() {
        this.setState({ data: { mobile: '' } });
    }
    render() {
        let data = { ...this.state.data };
        const { getFieldDecorator } = this.props.form;
        const menu = (
            <Menu onClick={this.changeDropdown}>
                {countryCode.map((country, index) => <Menu.Item key={index}>{country}</Menu.Item>)}
            </Menu>
        );
        return (
            <div className="login-form-container">
                <h1>Enter your phone number</h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Row type="flex" gutter={12}>
                        <Col span={6}>
                            <Form.Item>
                                <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link" href="#">
                                        <Button style={{ marginLeft: 8 }}>
                                            {this.state.dropdown} <Icon type="down" />
                                        </Button>
                                    </a>
                                </Dropdown>
                            </Form.Item>
                        </Col>
                        <Col span={18}>
                            <Form.Item>
                                {getFieldDecorator('mobile', {
                                    rules: [{ required: true, message: 'Please input your mobile!' }],
                                })(
                                    <Input
                                        onChange={this.setMobile}
                                        prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="mobile"
                                        value={data.mobile}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row type="flex" justify="end">
                        <Col>
                            <Button onClick={this.resetForm}>CANCEL</Button>
                        </Col>
                        <Col>
                            <Button type="primary" onClick={this.onSubmit} disabled={!this.state.enableSubmit}>VERIFY</Button>
                        </Col>
                    </Row>
                </Form>
                <p className="login-form-desc">By tapping Verify, an SMS may sent. Message & data rates may apply.</p>
            </div>
        );
    }
}