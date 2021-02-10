import React from 'react';
import './CheckoutProduct.css'
import { useStateValue } from "./StateProvider";
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonSocial,
  } from 'react-awesome-button';

function CheckoutProduct({ id, image, title, price, }) {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <AwesomeButton type="primary">

                    <button onClick={removeFromBasket}>Remove from Wishlist</button>
                </AwesomeButton>
                <AwesomeButton type="primary">
                    <button>Details</button>
                </AwesomeButton>
            </div>
        </div>
    )
}

export default CheckoutProduct