import React from 'react';
import './style.scss';
import { Layout } from 'antd';

export default class Footer extends React.Component {
    render() {
        const { Footer } = Layout;
        return (
            <Footer style={{ textAlign: 'center' }}>
                Shop ©2019 Created by Venus
          </Footer>
        );
    }
}