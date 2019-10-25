import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary(prods, handleCheckout) {
console.log(prods)

  const { products } = prods;
  console.log(products);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const cartTotal = calculateCartTotal(products);

  useEffect(() => {
    setCartAmount(cartTotal[0]);
    setStripeAmount(cartTotal[1]);
    setIsCartEmpty(products.length === 0);
  }, [products]);

  

  return (
    <div className="container flex">
    <div className="checkout">
        <h3>
            CHECKOUT
        </h3>
        <StripeCheckout
        name="MERN STACK"
        amount={ stripeAmount }
        image={ products.length > 0 ? products[0].product.mediaUrl : '' }
        currency="USD"
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        token={handleCheckout}
        triggerEvent={onClick}
        >
            <button 
            disbaled={ isCartEmpty ? 1 : 0 }//index.js:1 Warning: Received `false` for a non-boolean attribute `disbaled`.
            //so  isCartEmpty ? disabled : null 
            className="btn btn-primary btn-full-width">PAY: ${ cartAmount }</button>
        </StripeCheckout>

    </div>
</div> 
  );
}

export default CartSummary;
