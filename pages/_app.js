import App from "next/app";
import Layout from '../components/_App/Layout'
import Router from 'next/router';
import ProgressBarExample from '../components/_App/Progressbar';
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '../utils/auth';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';

class MyApp extends App {
//https://stackoverflow.com/questions/55624695/loading-screen-on-next-js-page-transition
  constructor(){  
    super();
    this.state ={loaded: false}
  }

  componentDidMount() {
    
    //https://stackoverflow.com/questions/42089548/how-to-add-delay-in-reactjs
      setTimeout(function() { //Start the timer
        this.setState({ loaded: true }); //After 1 second, set render to true
    }.bind(this), 1000)//delay the page load by 1 second otherwise the progress bar is not visible instantly
    
    // this.setState({ loaded: true });
    Router.events.on('routeChangeStart', () => this.setState({ loaded: false }));
    Router.events.on('routeChangeComplete', () => this.setState({ loaded: true }));
 
  }

  //the method below is declared in pages/shop.js but it can be used here out side of that component because it's
  //a static method. 
  static async getInitialProps({ Component, ctx }){
    const { token } = parseCookies(ctx);//we can get the res and req objs. from ctx(this line of code must be placed at the very top)

    let pageProps = {};

    //first check whether the component has initial props
    if (Component.getInitialProps){
      //these functions get data from the server so we have to await them becuase they return a promise
      pageProps = await Component.getInitialProps(ctx);//then execute it, ctx is a bit more info that we have to provide into
      //getInitial props but he did not elaborate on it

    }

    if (!token){
      //we can get the res and req objs. from ctx
      //ctx.pathname is the current route being displayed
      //if a not logged in user is trying to access the below routes then redirect  
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create';
      if (isProtectedRoute){
          redirectUser(ctx, '/login');//redirecting using the server
      }
    
    } else {//get the users acount data
      try {
        const payload = { headers: { Authorization: token } }
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;
        pageProps.user = user;//put the retreived user data on the page props.
      } catch (error) {
        console.error(`Error getting user`, error);
        //1. throw out invalid token
        destroyCookie(ctx, "token");

        //2. redirect to login
        redirectUser(ctx, '/login');//redirecting using the server

      }
    }

    // return {pageProps: pageProps}
    return {pageProps};//these props will be passed down to the relavent page component as properties
  }

  render() {
    const { Component, pageProps } = this.props;

    const { loaded } = this.state;

    const visibleStyle = {
      display: '',
      transition: 'display 3s',
    };
    const inVisibleStyle = {
      display: 'none',
      transition: 'display 3s',
    };
    return (

        <>
        
        <Layout>
          <span style={loaded ? inVisibleStyle : visibleStyle}>
          <ProgressBarExample start={true}/>
          </span>
            <Component {...pageProps}/>
        </Layout>

        </>

    );
  }
}


export default MyApp;
