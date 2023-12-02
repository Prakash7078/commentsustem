"use client";
import React, { useState, createContext, useEffect, useContext } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';

// Define the UserContext type
interface User {
  name: string;
  password: string;
  // ... other user properties
}

// Define a UserContextData type that includes the User | null
interface UserContextData {
  user: User | null;
}

export const UserContext = createContext<UserContextData>({ user: null });

export const useUser = () => {
  return useContext(UserContext);
};

export default function AppPage() {
  // Explicitly specify the type of the 'user' state variable
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if localStorage is available in the browser
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        // Parse the storedUser string into a User object
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      <Navbar />
      <Home />
    </UserContext.Provider>
  );
}
