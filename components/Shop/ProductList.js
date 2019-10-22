import Product from './Product';

function ProductList({products}) {
  
  const list = [];

  //https://stackoverflow.com/questions/44309300/iterating-over-json-in-react  
  Object.keys(products).forEach(function(key) {
    const num = products[key].length/3;
    const numRows = Math.ceil(num);
    // console.log(numRows);

    let j = 0;
    
    for (let i = 0; i < numRows; i++){

        // console.log(j);
        list.push(
          <div className="container flex" style={{marginBottom: "40px"}}>
            <Product key={(i+(i+j+0))} product={products[key][(i+(i+j+0))]} />
            <Product key={(i+(i+j+1))} product={products[key][(i+(i+j+1))]} />
            <Product key={(i+(i+j+2))} product={products[key][(i+(i+j+2))]} />
          </div>
        );
        
        
        // console.log(i+(i+j+0))
        // console.log(i+(i+j+1))
        // console.log(i+(i+j+2))
        j = j + 1;
      }  
      console.log(list);  
  });

  return (list);

}

export default ProductList;
