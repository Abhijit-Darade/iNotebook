import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email : "", password : ""});
    let history = useNavigate();
    const handleSubmit = async(e, email, password) =>{
        e.preventDefault();
        const host = " http://127.0.0.1:5000";
        //API Call
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({email : credentials.email, password : credentials.password}),
    });
    const json =await response.json();
    if(json.success){
        //save the auth-token and redirect
        localStorage.setItem('token', json.authToken);
        //Go to homepage after getting auth token
        props.showAlert("Logged in Successfully", "success");
        history('/')


    }else{
        props.showAlert("Invalid Credentials", "danger");
    }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    <div className="mt-3">
      <h3 >Login to continue to iNotebook</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
