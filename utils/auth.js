import cookie from 'js-cookie';
import Router from 'next/router';

//no default exports here because we are exporting several functions
export function handleLogin(token){
    cookie.set('token', token);
    Router.push('/account');
}