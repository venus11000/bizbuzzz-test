import React from 'react';
import './style.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import Logo from '../../images/logo.png';
import ProfileDefault from '../../images/default-profile.png';
import { getCategories, getUserdetails, searchItems, filterItems, logout } from '../../actions';
import Popup from '../Popup';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectHome: false,
            data: {
                search: ''
            }
        }
        this.redirectHome = this.redirectHome.bind(this);
        this.logoutFUnction = this.logoutFUnction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filterItems = this.filterItems.bind(this);
    }
    componentWillMount() {
        this.props.getCategories();
        if (localStorage.getItem('token')) {
            this.props.getUserdetails();
        }
    }
    componentWillReceiveProps(props) {
        console.log("Update");
    }
    filterItems(data) {
        console.log(data);
        this.props.filterItems(data);
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
    handleChange(event) {
        let data = { ...this.state.data };
        data[event.target.name] = event.target.value;
        this.setState({ data });
    }
    getMenuItems() {
        return this.props.categories && this.props.categories.map((category, index) => {
            const menu = (
                category.types ? <Menu>{category.types.map((menu) =>
                    <Menu.Item>
                        <a rel="noopener noreferrer" onClick={() => this.filterItems({category: menu})}>{menu}</a>
                    </Menu.Item>)}
                </Menu> : <div></div>
            );
            return <div className="top-menu-item">
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                        {category.label} <Icon type="down" />
                    </a>
                </Dropdown>
            </div>
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log("Search for ", this.state.data);
        this.props.searchItems(this.state.data);
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
            <div>
                <Header className="header">
                    <div className="header-container">
                        <div className="logo-container">
                            <img className="logo" src={Logo} />
                        </div>
                        <div className="search-form">
                            <input className="search-input" name="search" onChange={this.handleChange} placeholder="Enter Product name" />
                            <button className="search-btn" type="button" onClick={this.handleSubmit}><i class="fas fa-search"></i></button>
                        </div>
                        {this.props.userDetails && <div className="profile-container">
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" href="#">
                                    <img className="profile-img" src={this.props.photoURL ? this.props.photoURL : ProfileDefault} />
                                    <span className="profile-name">{this.props.userDetails.displayName ? this.props.userDetails.displayName : this.props.userDetails.phoneNumber}</span>
                                </a>
                            </Dropdown>
                        </div>}
                        {<div className="cart-symbol">
                            <i className="fas fa-shopping-cart"></i>
                        </div>}
                    </div>
                </Header>
                <Header className="top-menu-bar">
                    {this.getMenuItems()}
                </Header>
                {this.redirectHome()}
                <Popup />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        userDetails: state.userDetails,
        screen: state.screen
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getCategories, getUserdetails, searchItems, filterItems, logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
