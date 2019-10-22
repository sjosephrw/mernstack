import React from 'react';
import axios from 'axios'
import ProductList from '../components/Shop/ProductList';
import baseUrl from '../utils/baseUrl';

function Shop({products}) {

  console.log(products);

  // //when ever we want to interact with the outside world we use the useEffect hook
  // React.useEffect(() => {

  // }, [getProducts()]);

  // //function inside a function
  // async function getProducts(){
  //   //in this project the api is also running on the same port
  //   //the file names in the pages/api folder are the api end points
  //   const url = 'http://localhost:3000/api/products'
  //   const response = await axios.get(url);
  //   console.log(response.data);//.data to get back only product data
  // }



    return (
      <>
        <section className="section-shop" style={{marginTop: '20px'}}>
          <h2 className="title">SHOP.</h2>
          <ProductList products={products}/>
        </section>
      </>
    );
  }
  
  //get the initial data that will be added to the props parameter
   Shop.getInitialProps = async () => {
    //fetch data on the server
    // return {hello: "world"};
    const url = `${baseUrl}/api/products`
    const response = await axios.get(url);
    return {products: response.data};
    //and return the data as an object

    //this obj. will be merged with existing props, it wont overide the other props

  };

  export default Shop;
  
