"use client";
import React,{ useState, createContext, useEffect } from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar';
export const UserContext = createContext(null);

function Page() {
  const [user, setUser] = useState<any | null>(null);
  useEffect(() => {
    // Check if localStorage is available in the browser
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);
  return (
    <UserContext.Provider value={user}>
      <Navbar/>
      <Home />
    </UserContext.Provider>
   
  )
}

export default Page