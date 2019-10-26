function AccountHeader({user}) {
  return (

        <div className="jumbotron">
            <div className="container">
                <h1>My Account</h1>
                <h3>{user.name}</h3>
                <p>Welcome [{user.role}] : {user.email}</p>
                <p>Joined: {user.createdAt}</p>
            </div>
        </div>



  );
}



export default AccountHeader;
