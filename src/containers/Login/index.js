import React from 'react';
import './style.scss';
import LoginForm from '../../components/LoginForm';
import { Form, Row, Col } from 'antd';

class Login extends React.Component {
    render() {

        const WrappedLoginForm = Form.create({ name: 'loginForm' })(LoginForm);
        return <Row type="flex" justify="center" align="center">
            <Col md={10}>
                <WrappedLoginForm />
            </Col>
        </Row>
    }
}

export default Login;