import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name : "",email: "", password: "" , cpassword : ""});
    let history = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      const host = " http://127.0.0.1:5000";
      //API Call
      const {name, email, password} = credentials;
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name, email, password
        }),
      });
      const json = await response.json();
      if (json.success) {
        //save the auth-token and redirect
        localStorage.setItem("token", json.authToken);
        //Go to homepage after getting auth token
        history("/");
        props.showAlert("Account Created Successfuly", "success");
      }else{
        props.showAlert("Invalid Details", "danger");
      }
    };
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value})}
  return (
    <div className="container mt-2">
      <h3>Create an account to use iNotebook</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
            required
            minLength={3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
