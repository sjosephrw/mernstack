import ProductAttributes from "./ProductAttributes";


// function ProductContainer({prod}){

function ProductContainer({name, price, description, mediaUrl, sku, _id}){
    return (
        <ProductAttributes name={name} price={price} description={description}
        mediaUrl={mediaUrl} sku={sku} _id={_id}
        />
    )
}

export default ProductContainer;