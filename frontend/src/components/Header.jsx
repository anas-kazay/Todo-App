import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../security/AuthContext";

export default function Header() {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.authenticated;
  function handleLogout() {
    authContext.logout();
  }
  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to="/">
              TodoApp
            </Link>
            <div className="collapse navbar-collapse">
              {isAuthenticated && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/welcome/TodoApp">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/todos">
                      Todos
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <ul className="navbar-nav">
              {!isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
