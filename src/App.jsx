import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si hay información de usuario en el localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    localStorage.setItem('user', JSON.stringify(decoded)); // Almacenar el usuario en localStorage
    setUser(decoded);
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Eliminar la información del usuario del localStorage
    setUser(null);
  };

  return (
    <>
      {user ? (
        <section className='flex flex-col justify-center items-center pt-[16.5rem]'>
        <div className="flex flex-col justify-center items-center text-white">
          <img className='rounded-full size-[100px] mb-3 border-[4px] border-[#efaaaa] select-none' src={user.picture} alt={user.name} />
          <p className='text-xl font-semibold '>{user.name}</p>
          <p className='text-lg'>{user.email}</p>
          <button className="text-white bg-gradient-to-r shadow-lg dark:shadow-blue-800/40 from-blue-500 via-blue-600 to-blue-700 border-none hover:bg-gradient-to-br rounded-xl font-medium text-sm px-5 py-2.5 text-center mt-4" onClick={handleLogout}>Cerrar sesión</button>
        </div>
        </section>
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
