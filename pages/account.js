import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';
import AccountActions from '../components/Account/AccountActions';

function Account({ user }) {
  return (
    <section className="section-my-account">
      <AccountHeader user={user} accountFeature={'ORDERS'}/>

      <div className="container" id="event-bubbling">
        <AccountOrders/>
        <AccountPermissions/>
        <AccountActions/>
      </div>
    </section>
  );
}

export default Account;
