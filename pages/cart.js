import React, { useState } from 'react';
import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import catchErrors from '../utils/catchErrors';

function Cart({ user, products }) {

// const { prod } = products;

// console.log(products)
  const [cartProducts, setCartProducts] = useState(products.products);
  const [msg, setMsg] = useState({display: 'none', class: '', msg: '' }); 
  const [loading, setLoading] = useState(false);
 

  
  const router = useRouter();
//   console.log(products.products);
//   console.log(user)

//   const cartProds = products.products;

//   console.log(cartProds);
//   console.log(cartProducts);


  function displayError(errorMsg){
    setMsg({display: 'block', class: "msg msg-fail", msg: `Fail! ${errorMsg}.`});
  } 

  async function handleRemoveFromCart(e, productId){

    e.preventDefault();
    
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get('token');
    const payload = {
        params: {//because the productId is being passed as params we will have to get it in the end point as req.query;
            productId
        },
        headers: {
            Authorization: token
        }
    }
    const response = await axios.delete(url, payload);
    console.log(response.data);
    setCartProducts(response.data);

  }

  async function handleCheckout(paymentData){
    try {
        setLoading(true);
        const url = `${baseUrl}/api/checkout`;
        const token = cookie.get('token');
        const payload = { paymentData }
        const headers = {
            headers: { Authorization: token }
        }

        await axios.post(url, payload, headers);

        setMsg({display: 'block', class: "msg msg-success", msg: "Success! payment received."});

    } catch (error) {
        console.error(error);
        catchErrors(error, displayError);
    } finally {
        setLoading(false);
    }
  }


  
  function mapCartProducts(prods){
      if (prods.length !== 0){
        return prods.map(prod => <CartItemList 
            key={prod._id} 
            quantity={prod.quantity} 
            {...prod.product} 
            handleRemoveFromCart={handleRemoveFromCart}/>)
      } else {
          return null;
      }

  }  

  const message = msg.display === 'block' ? <div className={msg.class}>{msg.msg}</div> : null;

  
  if (cartProducts.length !== 0){
    return (
        <section className="section-cart-data">
        <h2 className="title" style={{marginTop: '150px'}}>CART.</h2>
        
        {!user && <> 
        <div className="div-msg">
            <div className="msg msg-fail"><a href="/login">Login</a> to add products to your cart.</div>
        </div></>}
        

    
        {/* <div className="container flex border margin-t">
                <div className="col-2">
                    <div className="div-product ">
                        <div className="img-product">
                            <img src="https://dummyimage.com/600x400/000/fff" alt="Product"/>
                        </div>
                    </div>                
                </div>
                <div className="col-2">
    
                    <div className="cart-info-product">
                        <p className="name-product">FISH AND CHIPS</p>
                        <p className="price-product">2 X $150.00</p>
                        <span><a href="#"><i className="fas fa-trash"></i></a></span>
                    </div>
                    
                </div>
            </div> 
            <div className="container flex">
                <div className="checkout">
                    <h3>
                        CHECKOUT
                    </h3>
                    <button className="btn btn-primary btn-full-width">PAY: $2000.00</button>
                </div>
            </div>        */}
            {/* {mapCartProducts(cartProds)}
            <CartSummary products={cartProds}/> */}
            {mapCartProducts(cartProducts)}
            <CartSummary products={cartProducts} handleCheckout={handleCheckout} />
            {console.log(cartProducts)}


    </section>    
      );

  } else if (loading){   
    return (
        <section className="section-cart-data">
            <div className="container" style={{textAlign: 'center', fontSize: '400%'}}>
            <i className="fas fa-spinner fa-spin"></i>
            </div>
        </section>
    )
  } else if (cartProducts.length === 0){
    return (
        <section className="section-cart-data">
        <h2 className="title" style={{marginTop: '150px'}}>CART.</h2>
            <div className="div-msg">
                {message}
            </div>  
        
        <div className="div-msg">
            <div className="msg msg-fail">TO <a onClick={() => router.push('/shop')}> SHOP</a> PAGE.</div>
        </div>
        </section>
          )      
  }    

}

  //get the initial data that will be added to the props parameter
  Cart.getInitialProps = async (ctx) => {//ctx give us access to the req. res objs.
    const { token } = parseCookies(ctx);

    if (!token){//if not logged in let the products array be empty
        return { products: [] };
    }

    //fetch data on the server
    // return {hello: "world"};
    const url = `${baseUrl}/api/cart`
    const payload = {headers: { Authorization: token } }
    const response = await axios.get(url, payload);
    return {products: response.data};
    //and return the data as an object

    //this obj. will be merged with existing props, it wont overide the other props

  };

export default Cart;
