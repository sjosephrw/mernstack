function AddProductToCart({productId}) {
    return (
      <div className="add-to-cart">
          <input type="number" min="1" name="quantity"/> 
          <button className="btn btn-primary">ADD TO CART</button>
      </div>
  );
}

export default AddProductToCart;
