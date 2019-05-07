import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss';

import SiderMenu from '../../components/SiderMenu';

import { items } from '../../feed/data';
import { getItems } from '../../actions';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.getItems();
    }
    showItemPopup() {
        console.log("Clicked...");
    }
    getItemsView() {
        const { items } = this.props;
        return items && items.map((item, index) => {
            return <div className={item.quantity > 0 ? "item" : "item disabled"} onClick={this.showItemPopup}>
                <div className="item-img-container">
                    <div className="item-img">
                        <img src={item.image} />
                    </div>
                </div>
                <div className="item-description">
                    <div className="item-name">{item.name}</div>
                    <div className="item-footer">
                        <div className="price">₹ {item.price}</div>
                        <div className="quantity">{item.quantity}</div>
                    </div>
                </div>
            </div>
        })
    }
    render() {
        return (
            <div className="dashboard-container">
                <div>
                    <SiderMenu />
                </div>
                <div className="items-container">
                    {this.getItemsView()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getItems }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);