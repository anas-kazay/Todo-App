import "../TodoApp.css";
export default function TodoApp() {
  return (
    <div className="TodoApp">
      Todo Management Application <LoginComponenet />
      {/* <WelcomeComponenet /> */}
    </div>
  );
}

function LoginComponenet() {
  return (
    <div className="Login">
      <div className="LoginForm">
        <div className="">
          <label htmlFor="">User Name</label>
          <input type="text" name="username" />
        </div>
        <div className="">
          <label htmlFor="">Password</label>
          <input type="password" name="username" />
        </div>
        <div>
          <button type="button" name="login">
            login
          </button>
        </div>
      </div>
      password
    </div>
  );
}

function WelcomeComponenet() {
  return <div className="Welcome">Welcome Component</div>;
}
