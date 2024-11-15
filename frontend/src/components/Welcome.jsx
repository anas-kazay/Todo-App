import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrieveHelloWorldPathVariable } from "../api/HelloWorldApiService";
import { AuthContext } from "./../security/AuthContext";

export default function Welcome() {
  const { username } = useParams();

  const authContext = useContext(AuthContext);

  const [message, setMessage] = useState(null);

  function callHelloWorldRestApi() {
    console.log("called");

    retrieveHelloWorldPathVariable("Anas", authContext.token)
      .then((response) => {
        successfulResponse(response);
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  function successfulResponse(response) {
    console.log(response);
    setMessage(response.data.message);
  }

  function errorResponse(error) {
    console.log(error);
  }

  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}!</h1>
      <div>
        Manage your todos. <Link to={"/todos"}>Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
          Call HelloWorld
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}
