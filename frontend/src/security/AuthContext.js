import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  function login(username, password) {
    if (username === "anas" && password === "kazay") {
      setAuthenticated(true);
      setUsername(username);
      return true;
    } else {
      setAuthenticated(false);
      setUsername(null);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
}
