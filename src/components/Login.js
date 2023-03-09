import loginImage from "../images/loginImage.jpg";
import { connect } from "react-redux";
import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { Navigate } from "react-router-dom";
const Login = (props) => {
  const [loggedUser, setLoggedUser] = useState("");

  function updateUser(e) {
    e.preventDefault();
    const signedUser = e.target.value;
    setLoggedUser(signedUser);
  }

  function signIn() {
    const currentUser = props.users.filter((user) => {
      return user.name === loggedUser;
    });
    if (currentUser.length !== 0) {
      props.dispatch(setAuthedUser(currentUser[0].id));
      const browserURL = new URLSearchParams(window.location.search);
      const redirectTO = browserURL.get("redirectTo");
      return <Navigate to={redirectTO ? redirectTO : "/"} />;
    }
  }
  return (
    <div
      className="flex flex-col sm:flex-row h-screen justify-center items-center bg-white"
      data-testid="login"
    >
      <div className="bg-white w-full sm:w-1/2 h-screen flex justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mt-4 text-center">Welcome Back</h1>
          <p className="text-gray-600 mt-2 text-center">
            Please sign in to your account
          </p>
          <img src={loginImage} alt="Logo" className="w-5/6  mb-4" />
        </div>
      </div>

      <div className=" bg-white w-full sm:w-1/2 h-screen flex justify-center items-center ">
        <div className=" mb-5 bg-white hover:bg-gray-100 p-10 rounded-lg w-5/6 shadow-lg border-gray-200 border-2">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="username"
            >
              Select a User
            </label>

            <select
              onChange={updateUser}
              value={loggedUser}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select an option</option>

              {props.users.map((user) => {
                return (
                  <option key={user.name} value={user.name}>
                    {" "}
                    {user.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={signIn}
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ users }) => ({
  users: Object.values(users),
});
export default connect(mapStateToProps)(Login);
