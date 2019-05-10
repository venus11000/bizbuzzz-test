import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss';

import { ItemDescription } from './ItemDescription';

import { hidePopup } from '../../actions';

class Popup extends React.Component {
    render() {
        return (
            <div className="popup-container">
                {this.props.showPopup === 'item-description' && <ItemDescription item={this.props.selectedItem} closePopup={this.props.hidePopup} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showPopup: state.showPopup,
        selectedItem: state.selectedItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ hidePopup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);