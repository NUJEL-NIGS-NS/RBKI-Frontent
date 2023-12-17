import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Login.css';
import { LoginPage } from './Components/LoginPage';
import { useState, useEffect } from 'react';
import { AuthContext } from './constant/AppContext';
import { Home } from './Components/Home';

function App() {
  // Initialize Token state with a value from local storage or null if not found
  const [Token, setToken] = useState(localStorage.getItem('token')||null);
  


  // Update the token in local storage and state
  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // useEffect(() => {
    
  //   const handleStorageChange = (e) => {
  //     if (e.key === 'token') {
  //       setToken(e.newValue);
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);


  return (
    <>
      <AuthContext.Provider value={{ Token: Token, updateToken: updateToken }}>
        {Token === null? <LoginPage /> : <Home />}
      </AuthContext.Provider>
     
    </>
  );
}

export default App;
