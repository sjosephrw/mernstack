import React, { useState } from 'react';
import AccountHeader from '../components/Account/AccountHeader';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import catchErrors from '../utils/catchErrors';
import cookie from 'js-cookie';

function Users({ user, users }) {

    const [checkedItems, setCheckedItems] = useState({}); //plain object as state
    const [msg, setMsg] = useState({display: 'none', class: '', msg: '' });  

    function handleChangePermission(event){
      setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
      //console.log("checkedItems: ", checkedItems);
      updateUserPermission(event)
    }

    async function updateUserPermission(event){

        try {
            console.log(event.target.value);
            const url = `${baseUrl}/api/account`;
            const role = event.target.checked ? 'admin' : 'user';
            console.log(role);
            const token = cookie.get('token');
            const headers = {headers: { Authorization: token } }
            const payload = {_id: event.target.value, role: role};
            await axios.put(url, payload, headers);
            setMsg({display: 'block', class: "msg msg-success", msg: "Success! User updated."});            
        } catch (error) {
            console.error(error);
            catchErrors(error, displayError);
        } 
    }

    function displayError(errorMsg){
        setMsg({display: 'block', class: "msg msg-fail", msg: `Fail! ${errorMsg}.`});
    } 

    const list = [];

    //https://stackoverflow.com/questions/56273038/how-to-implement-multiple-checkbox-using-react-hook
    
    users.map((el, i)  => {
        list.push(
        <li style={{ padding: "10px 20px" }} key={i}>
            <label className="switch">
            <input type="checkbox" name={el.email} value={el._id} onChange={(e) => {handleChangePermission(e)}}  checked={checkedItems[el.name] && users.role === 'admin'}/>{/* if it is a admin checked will be true */}
            <span className="slider"></span>
            </label><span style={{ verticalAlign: 'bottom' }}>&nbsp;&nbsp;&nbsp;{el.email}</span>
        </li> 
        );
    });

    const usersList = list.length > 0 ? list : null;
    const message = msg.display === 'block' ? <div className={msg.class}>{msg.msg}</div> : null;

  return (
    <section className="section-my-account">
      <AccountHeader user={user} accountFeature={'ORDERS'}/>
            
        <div className="div-msg" style={{marginTop: '30px'}}>
            {message}
        </div> 

        <div className="container">
            <ul className="orders">
                {usersList}
            </ul>             
        </div>
    </section>
  );
}

//https://stackoverflow.com/questions/54867560/getinitialprops-in-next-js-does-not-get-data-from-server
//Note: getInitialProps can not be used in children components. Only in pages.
Users.getInitialProps = async (ctx) => {
  console.log(ctx);
  const { token } = parseCookies(ctx);
  if (!token) {
    return { users: [] };
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/users`;
  const response = await axios.get(url, payload);
  console.log(response)
  return response.data;
};


export default Users;
