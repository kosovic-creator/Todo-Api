'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definicija tipa za stanje
interface GlobalState {
  user: string | null;
  setUser: (user: string | null) => void;
}

// Inicijalno stanje
const initialState: GlobalState = {
  user: null,
  setUser: () => {},
};

// Kreiranje konteksta
const GlobalContext = createContext<GlobalState>(initialState);

// Provider komponenta
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <GlobalContext.Provider value={{ user, setUser}}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook za korištenje konteksta
export const useGlobalContext = () => useContext(GlobalContext);