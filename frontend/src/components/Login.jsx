import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../security/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("anas");
  const [password, setPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  function handleSubmit() {
    if (username === "anas" && password === "kazay") {
      console.log("success");
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
      authContext.setAuthenticated(true);
      navigate(`/welcome/${username}`);
    } else {
      authContext.setAuthenticated(false);
      console.log("failed");
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
    }
  }
  return (
    <div className="Login">
      <h1>Login</h1>
      {showSuccessMessage && (
        <div className="successMessage">Authenticated Successfully</div>
      )}
      {showErrorMessage && (
        <div className="errorMessage">
          Authentication Failed. Please check your credentials.
        </div>
      )}
      <div className="LoginForm">
        <div className="">
          <label htmlFor="">User Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}>
            login
          </button>
        </div>
      </div>
    </div>
  );
}
