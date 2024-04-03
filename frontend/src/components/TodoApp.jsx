import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../TodoApp.css";
import Logout from "./Logout";
import Header from "./Header";
import ListTodos from "./ListTodos";
import Error from "./Error";
import Welcome from "./Welcome";
import Login from "./Login";
import AuthProvider from "../security/AuthContext";
export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/welcome/:username" element={<Welcome />} />
            <Route path="/todos" element={<ListTodos />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
