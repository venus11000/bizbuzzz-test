import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss';
import { Layout, Menu, Icon } from 'antd';

import { getCategories } from '../../actions';

class SiderMenu extends React.Component {
    componentDidMount() {
        this.props.getCategories();
    }
    getMenu() {
        const { SubMenu } = Menu;
        const { categories } = this.props;
        return categories && categories.map((category, index) =>
            <SubMenu key={index} title={<span>{category.label}</span>}>
                {category.types.map((item, index) => <Menu.Item key={index}>{item}</Menu.Item>)}
            </SubMenu>)
    }
    render() {
        const { Sider } = Layout;
        return (
            <div>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultOpenKeys={['0']}
                        defaultSelectedKeys={['0']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {this.getMenu()}
                    </Menu>
                </Sider>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getCategories }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);