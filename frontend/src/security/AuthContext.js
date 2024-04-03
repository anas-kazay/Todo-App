import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [number, setNumber] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ number, authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
