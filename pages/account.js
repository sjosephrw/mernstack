import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';
import AccountActions from '../components/Account/AccountActions';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';


function Account({ user, orders }) {
  return (
    <section className="section-my-account">
      <AccountHeader user={user}/>

      <div className="container" id="event-bubbling">
        <AccountOrders orders={orders}/>
        <AccountPermissions/>
        <AccountActions/>
      </div>
    </section>
  );
}

//https://stackoverflow.com/questions/54867560/getinitialprops-in-next-js-does-not-get-data-from-server
//Note: getInitialProps can not be used in children components. Only in pages.
Account.getInitialProps = async (ctx) => {
  console.log(ctx);
  const { token } = parseCookies(ctx);
  if (!token) {
    return { orders: [] };
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/orders`;
  const response = await axios.get(url, payload);
  console.log(response)
  return response.data;
};


export default Account;
