import React, { useState } from 'react';

function AccountOrders() {

  const [showPanel, setShowPanel] = useState(false);

  function toggle(){
    showPanel ? setShowPanel(false) : setShowPanel(true);
  }

  const panel = showPanel ?
  <div className="panel-data" id="orders">
    <ul className="list-data">
        <li><a href="/my-orders"><i className="fab fa-stripe"></i>&nbsp;&nbsp;MY ORDERS</a></li>
        <li><a href="/orders"><i className="fas fa-money-bill-wave"></i>&nbsp;&nbsp;ORDERS</a></li>
    </ul>
  </div>
    :
    null;

  return (

    <div className="panel" id="data-orders">
        <a onClick={toggle} className="panel-data-toggle">
            <h2><i className="fab fa-cc-stripe"></i>&nbsp;&nbsp;My Orders</h2>
        </a>
        { panel }
    </div>

                   
 
  );
}




export default AccountOrders;
