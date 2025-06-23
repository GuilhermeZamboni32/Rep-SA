import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Inicia usuarios vindo do localstorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user');
      
      // Verificar token
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.token) {
            setUser(parsedUser);
            setIsAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
          } else {
            logout();
          }
        } catch (err) {
          console.error('Failed to parse stored user', err);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  console.log('GlobalContext initialized with user:', user);


  // Login function
  const login = async (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };

  // Update do usuario
  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };


  return (
    <GlobalContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
