import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Breadcrumb, Pagination } from 'antd';
import './style.scss';

import SiderMenu from '../../components/SiderMenu';
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
            return <div className={item.available > 0 ? "item" : "item disabled"} onClick={this.showItemPopup}>
                {item.liked ? <i className="fas fa-heart liked red"></i> : <i className="far fa-heart liked"></i>}
                <div className="item-img-container">
                    <div className="item-img">
                        <img src={item.image} />
                    </div>
                </div>
                <div className="item-description">
                    <div className="item-name">{item.name}</div>
                    <div className="item-quantity">{item.quantity}</div>
                    <div className="item-rating">
                        <div className="rating">{item.rating} <i className="fas fa-star"></i></div>
                        <div className="comment">({item.commentsCount})</div>
                    </div>
                    <div className="prices">
                        <div className="selling-price">₹{item.sellingPrice}</div>
                        <div className="actual-price">₹{item.actualPrice}</div>
                        <div className="discount-price">₹{item.discount} off</div>
                    </div>
                </div>
            </div>
        })
    }
    render() {
        return (
            <div className="dashboard-container">
                <div>
                    {/* <SiderMenu /> */}
                </div>
                <div>
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">Biscuits</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>All</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="pagination-text">Showing 1 - 40 of 710 results for "grocery"</div>
                    <div className="items-container">
                        {this.getItemsView()}
                    </div>
                    <div className="pagination">
                        <Pagination defaultCurrent={1} total={50} />
                    </div>
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