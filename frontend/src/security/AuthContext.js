import { createContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWorldApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // function login(username, password) {
  //   if (username === "anas" && password === "kazay") {
  //     setAuthenticated(true);
  //     setUsername(username);
  //     return true;
  //   } else {
  //     setAuthenticated(false);
  //     setUsername(null);
  //     return false;
  //   }
  // }

  async function login(username, password) {
    const baToken = "Basic " + window.btoa(username + ":" + password);
    try {
      const response = await executeBasicAuthenticationService(baToken);

      if (response.status == 200) {
        setAuthenticated(true);
        setUsername(username);
        setToken(baToken);
        apiClient.interceptors.request.use((config) => {
          //console.log("intercepting and adding a token");
          config.headers.Authorization = baToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setToken(null);
    setAuthenticated(false);
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
