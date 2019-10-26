import React, { useState } from 'react';

function AccountOrders(orders) {

  const [showPanel, setShowPanel] = useState(false);

  function toggle(){
    showPanel ? setShowPanel(false) : setShowPanel(true);
  }

  console.log(orders);

  const panel = showPanel ?
  <div className="panel-data" id="orders">
    <ul className="list-data">
        <li><a href="#">ORDER ID : abc11111111111111230</a></li>
        <li><a href="#">ORDER ID : abc11111111111111230</a></li>
        <li><a href="#">ORDER ID : abc11111111111111230</a></li>
        <li><a href="#">ORDER ID : abc11111111111111230</a></li>
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
