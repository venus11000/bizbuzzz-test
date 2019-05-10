import React from 'react';

export const ItemDescription = (props) => {
    console.log(props)
    return (
        <div className="popup-content">
            <div className="popup-background"></div>
            <div className="popup-inner-container">
                <div className="popup-image-container">
                    <div className="like-container">
                        {props.item.liked ? <i className="fas fa-heart liked red"></i> : <i className="far fa-heart liked"></i>}
                    </div>
                    <div className="item-img-container">
                        <div className="item-img">
                            <img src={'data:image/jpeg;base64, ' + props.item.image} />
                        </div>
                    </div>
                    <div className="buttons-checkout-addcart">
                        <button className="buttons">Add to Cart</button>
                        <button className="buttons checkout-btn">Checkout</button>
                    </div>
                </div>
                <div className="popup-description-container">
                    {/* Close button */}
                    <div className="close-btn" onClick={props.closePopup}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                    <div className="popup-title">{props.item.name}</div>
                    <div className="special-price">Special price</div>
                    <div className="popup-ratings prices">
                        <div className="selling-price">₹ {props.item.sellingPrice}</div>
                        <div className="actual-price">₹ {props.item.actualPrice}</div>
                        <div className="discount-price">₹ {props.item.discount}</div>
                        <div className="red">  Hurry, only {props.item.quantity} left!</div>
                    </div>
                    <div className="popup-ratings">
                        <div>{props.item.rating}</div>
                        {props.item.commentsCount} ratings and {props.item.commentsCount} reviews
                    </div>
                    <div className="popup-ratings"><b>Category:</b> {props.item.category}</div>
                </div>
            </div>
        </div>
    );
}