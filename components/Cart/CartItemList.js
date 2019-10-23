function CartItemList() {
  return (
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
  );
}

export default CartItemList;
