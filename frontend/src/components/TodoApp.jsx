import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../TodoApp.css";
import Logout from "./Logout";
import Header from "./Header";
import ListTodos from "./ListTodos";
import Error from "./Error";
import Welcome from "./Welcome";
import Login from "./Login";
import AuthProvider, { AuthContext } from "../security/AuthContext";
import { useContext } from "react";

function AuthenticatedRoute({ children }) {
  const authContext = useContext(AuthContext);
  if (authContext.authenticated) return children;
  return <Navigate to="/" />;
}

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <Welcome />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodos />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <Logout />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
