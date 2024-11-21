import { useState } from "react";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

import "./SignupForm";

const SigninForm = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (evt) => {
    setUserCredentials({
      ...userCredentials,
      [evt.target.name]: evt.target.value,
    });
  };

  const submitSignin = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await userService.signin(userCredentials);
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("username", response.username);
        localStorage.setItem("userId", response.user._id);

        // Update the user state
        if (typeof setUser === "function") {
          setUser({ username: response.username, _id: response.user._id });
        } else {
          console.error("setUser is not a function");
        }

        // Redirect to the dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Signin failed:", err);

      setErrorMessage(
        err.response?.data?.message ||
          "Signin failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false); // Ensure loading state is cleared
    }
  };

  const handleSignOut = () => {
    userService.signout();
    if (typeof setUser === "function") {
      setUser(null);
    } else {
      console.error("setUser is not a function");
    }
    navigate("/");
  };

  return (
    <div className="signin-form-container">
      {user ? (
        <div className="welcome-message">
          Welcome, {user.username}!{" "}
          <button onClick={handleSignOut} className="signout-button">
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <h3 className="signin-form-title">Sign In</h3>
          <form className="signin-form" onSubmit={submitSignin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                onChange={handleFormChange}
                value={userCredentials.username}
                name="username"
                id="username"
                type="text"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleFormChange}
                value={userCredentials.password}
                name="password"
                id="password"
                type="password"
                required
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="form-actions">
              <button type="submit" className="signin-button">
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="signup-button"
              >
                Sign Up
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default SigninForm;
