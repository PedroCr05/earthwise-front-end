import { useState } from "react";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    street: "",
    state: "",
    zip: "",
  });

  const navigate = useNavigate();

  const handleFormChange = (evt) => {
    setUserCredentials({
      ...userCredentials,
      [evt.target.name]: evt.target.value,
    });
  };

  const submitSignup = async (evt) => {
    evt.preventDefault();
    const obj = {
      ...userCredentials,
      address: [
        {
          street: userCredentials.street,
          state: userCredentials.state,
          zip: parseInt(userCredentials.zip),
        },
      ],
      role: "customer", 
    };
    try {
      let response = await userService.signup(obj);
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user)); 
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };
  

  const statesList = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  return (
    <div className="signup-form-container">
      <h3 className="signup-form-title">Sign Up</h3>
      <form className="signup-form" onSubmit={submitSignup}>
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

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleFormChange}
            value={userCredentials.name}
            name="name"
            id="name"
            type="text"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleFormChange}
            value={userCredentials.email}
            name="email"
            id="email"
            type="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            onChange={handleFormChange}
            value={userCredentials.phoneNumber}
            name="phoneNumber"
            id="phoneNumber"
            type="tel"
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            onChange={handleFormChange}
            value={userCredentials.companyName}
            name="companyName"
            id="companyName"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            onChange={handleFormChange}
            value={userCredentials.street}
            name="street"
            id="street"
            type="text"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <select
            className="state-input"
            name="state"
            id="state"
            value={userCredentials.state}
            onChange={handleFormChange}
            required
          >
            <option value="" disabled>
              Select a state
            </option>
            {statesList.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="zip">Zip</label>
          <input
            onChange={handleFormChange}
            value={userCredentials.zip}
            name="zip"
            id="zip"
            type="number"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;


{
  /* Role selection */
}
{
  /* <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={userCredentials.role}
            onChange={handleFormChange}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div> */
}
