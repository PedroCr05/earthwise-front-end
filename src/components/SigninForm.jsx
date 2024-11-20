import { useState } from "react";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import "./SigninForm.css";

const SigninForm = ({ setUser }) => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

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

    const obj = {
      username: userCredentials.username,
      password: userCredentials.password,
    };

    try {
      let response = await userService.signin(obj);
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user)); 
        setUser(response.user); 
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Signin failed:", err);
      setErrorMessage("Invalid username or password. Please try again."); 
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="signin-form-container">
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

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

        <div className="form-actions">
          <button type="submit" className="signin-button" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
