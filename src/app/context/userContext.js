"use client"
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [session, setSession] = useState()
  return (
    <UserContext.Provider value={{
        user, 
        setUser,
        session, 
        setSession
      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}