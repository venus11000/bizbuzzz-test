import React from 'react';
import './style.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Dropdown } from 'antd';
import Logo from '../../images/logo.png';
import ProfileDefault from '../../images/default-profile.png';
import { logout } from '../../actions';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectHome: false
        }
        this.redirectHome = this.redirectHome.bind(this);
        this.logoutFUnction = this.logoutFUnction.bind(this);
    }
    redirectHome() {
        if (this.state.redirectHome) {
            this.setState({ redirectHome: false });
            return <Redirect to="/" />
        }
    }
    logoutFUnction() {
        this.setState({ redirectHome: true });
        this.props.logout();
    }
    render() {
        const { Header } = Layout;
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link to="/settings">Settings</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" onClick={this.logoutFUnction}>Logout</Menu.Item>
            </Menu>
        );
        return (
            <Header className="header">
                <div className="header-container">
                    <div className="logo-container">
                        <img className="logo" src={Logo} />
                    </div>
                    <div className="profile-container">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                                <img className="profile-img" src={ProfileDefault} />
                            </a>
                        </Dropdown>
                    </div>
                </div>
                {this.redirectHome()}
            </Header>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        // mobileNumber: state.mobileNumber
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
