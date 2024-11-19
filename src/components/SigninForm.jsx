import { useState } from "react";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

const SigninForm = ({ user, setUser, changeMode }) => {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({});

  const handleFormChange = (evt) => {
    setUserCredentials({
      ...userCredentials,
      [`${evt.target.name}`]: evt.target.value,
    });
  };

  const submitSignin = async () => {
    try {
      let response = await userService.signin(userCredentials);
      if (response.token) {
        // Store the token in local storage
        localStorage.setItem("authToken", response.token);
      }
      setUser(response.user);

      navigate("/");
    } catch (err) {}
  };

  return (
    <div>
      <h3>Sign In</h3>
      {!user?._id ? (
        <div>
          <div>
            <div>Username</div>
            <input
              onChange={handleFormChange}
              value={userCredentials.username}
              name="username"
            />
          </div>
          <div>
            <div>Password</div>
            <input
              onChange={handleFormChange}
              value={userCredentials.password}
              name="password"
              type="password"
            />
          </div>
          <button onClick={submitSignin}>Sign In</button>
          <button
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            Sign Up
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SigninForm;
