import cookie from 'js-cookie';
import Router from 'next/router';

//no default exports here because we are exporting several functions
export function handleLogin(token){
    cookie.set('token', token);
    Router.push('/account');
}

//ctx is from react, it gives react access to the req. res. objs.
export function redirectUser(ctx, location){//redirecting using the server
    if(ctx.req){
        ctx.res.writeHead(302, { location: location });//writeHead is a node js way of redirecting
        ctx.res.end();
    } else {//or redirect using the client
        Router.push(location);
    }
}