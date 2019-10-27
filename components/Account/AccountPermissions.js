import React, { useState } from 'react';

function AccountPermissions() {


  const [showPanel, setShowPanel] = useState(false);

  function toggle(){
    showPanel ? setShowPanel(false) : setShowPanel(true);
  }

  // console.log(showPanel);

  const panel = showPanel ?
  <div className="panel-data" id="users">
    <ul className="list-data">
      <li><a href="/users">MANAGE USERS</a></li>
    </ul>
  </div>  
    :
    null;

  return (
    <div className="panel" id="data-users">
        <a onClick={toggle} className="panel-data-toggle">
        <h2><i className="fas fa-users"></i>&nbsp;&nbsp;Manage Users</h2>
    </a>

        {panel}      

  </div> 
  );
}

export default AccountPermissions;
