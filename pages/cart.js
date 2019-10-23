import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';

function Cart() {
  return (
    <section className="section-cart-data">
    <h2 className="title" style={{marginTop: '150px'}}>CART.</h2>
    
    <div className="div-msg">
        <div className="msg msg-fail"><a href="/login">Login</a> to add products to your cart.</div>
    </div>
    

    <div className="container flex border margin-t">
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
        </div>       
</section>    
  );
}

export default Cart;
