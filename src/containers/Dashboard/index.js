import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Breadcrumb, Pagination } from 'antd';
import './style.scss';

import { getItems, showItemPopup } from '../../actions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            end: 0,
            total: 0
        }
    }
    componentDidMount() {
        this.props.getItems();
    }
    showItemPopup(data) {
        console.log("Clicked...", data);
        this.props.showItemPopup(data);
    }
    componentWillReceiveProps(props) {
        console.log(props);
        let items = [ ...props.items ];
        this.setState({
            start: 0,
            end: items.length,
            total: items.length
        })
    }
    getItemsView() {
        const { items } = this.props;
        return items && items.map((item, index) => {
            return <div className={item.available > 0 ? "item" : "item disabled"} onClick={() => this.showItemPopup(item)}>
                {item.liked ? <i className="fas fa-heart liked red"></i> : <i className="far fa-heart liked"></i>}
                <div className="item-img-container">
                    <div className="item-img">
                        <img src={'data:image/jpeg;base64, ' + item.image} />
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
                    <div className="pagination-text">Showing {this.state.start} - {this.state.end} of {this.state.total} results for "{this.props.categoryFilter}"</div>
                    <div className="items-container">
                        {this.getItemsView()}
                    </div>
                    <div className="pagination">
                        <Pagination defaultCurrent={1} total={this.state.total} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        categoryFilter: state.categoryFilter,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getItems, showItemPopup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);