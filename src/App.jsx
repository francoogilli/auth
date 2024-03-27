import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded);
    setUser(decoded);
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <>
      {user ? (
        <div className="user-info flex flex-col justify-center items-center">
          <img src={user.picture} alt={user.name} />
          <p className='text-xl font-bold italic'>{user.name}</p>
          <p className='text-lg'>{user.email}</p>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      )}
    </>
  );
}

export default App;
