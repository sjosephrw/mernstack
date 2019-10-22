import App from "next/app";
import Layout from '../components/_App/Layout'
import Router from 'next/router';
import ProgressBarExample from '../components/_App/Progressbar';

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
    let pageProps = {};

    //first check whether the component has initial props
    if (Component.getInitialProps){
      //these functions get data from the server so we have to await them becuase they return a promise
      pageProps = await Component.getInitialProps(ctx);//then execute it, ctx is a bit more info that we have to provide into
      //getInitial props but he did not elaborate on it

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
