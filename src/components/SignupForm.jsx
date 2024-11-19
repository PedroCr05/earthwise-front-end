import { useState } from "react";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ user, setUser }) => {
  const [userCredentials, setUserCredentials] = useState({});

  const navigate = useNavigate();
  const handleFormChange = (evt) => {
    setUserCredentials({
      ...userCredentials,
      [`${evt.target.name}`]: evt.target.value,
    });
  };

  const submitSignup = async () => {
    let obj = {
      ...userCredentials,
      address: [
        {
          street: userCredentials.street,
          state: userCredentials.state,
          zip: parseInt(userCredentials.zip),
        },
      ],
    };
    try {
      let response = await userService.signup(obj);
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
      <h3>Sign Up</h3>
      {!user?._id ? (
        <>
          {" "}
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
            />
          </div>
          <div>
            <div>Name</div>
            <input
              onChange={handleFormChange}
              value={userCredentials.name}
              name="name"
            />
          </div>
          <div>
            <div>Email</div>
            <input
              onChange={handleFormChange}
              value={userCredentials.email}
              name="email"
            />
          </div>
          <div>
            <div>Phone Number</div>
            <input
              onChange={handleFormChange}
              value={userCredentials.phoneNumber}
              name="phoneNumber"
            />
          </div>
          <div>
            <div>Company Name</div>
            <input
              onChange={handleFormChange}
              value={userCredentials.companyName}
              name="companyName"
            />
          </div>
          <div>
            <div>Street</div>
            <input
              onChange={handleFormChange}
              value={userCredentials.street}
              name="street"
            />
            <div>State</div>
            <input
              onChange={handleFormChange}
              value={userCredentials.state}
              name="state"
            />
            <div>Zip</div>
            <input
              onChange={handleFormChange}
              value={userCredentials.zip}
              name="zip"
              type="number"
            />
          </div>
          <button
            onClick={() => {
              submitSignup();
            }}
          >
            Signup
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SignupForm;
