import React from "react";
import "./products.css";
import { useStateValue } from "./StateProvider";
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from 'react-awesome-button';


function ProductShown({ id, title, image, price, }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>

      <img src={image} alt="" />
      
<AwesomeButton type="primary">
  
      <button className="aws-btn" onClick={addToBasket}>Add to Wishlist</button>
</AwesomeButton >
<AwesomeButtonProgress type="secondary">
<a href={`/product/Details`}> 
      <button>Details</button>
      </a>
</AwesomeButtonProgress>
    </div>
  );
}

export default ProductShown;