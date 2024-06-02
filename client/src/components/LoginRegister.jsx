import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateValue } from '../contex/AppContext';

const LoginRegister = () => {
  const { dispatch } = useStateValue();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: ""
  });

  const navigate = useNavigate();
  
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = () => {
    // Directly navigate to homepage without authentication
    toast.success("Welcome");
    navigate("/homepage");
  }

  return (
    <div className="containerAuthor">
      <div className="form signup">
        <h2>{state}</h2>
        {state === "Sign Up" ? (
          <div className="inputBox">
            <input name='name' value={formData.name} onChange={changeHandler} type="text" required="required" />
            <i className="fa-regular fa-user"></i><span>username</span>
          </div>
        ) : null}
        <div className="inputBox">
          <input name='email' value={formData.email} onChange={changeHandler} type="text" required="required" />
          <i className="fa-regular fa-envelope"></i><span>email address</span>
        </div>
        <div className="inputBox">
          <input name='password' value={formData.password} onChange={changeHandler} type="password" required="required" />
          <i className="fa-solid fa-lock"></i><span>password</span>
        </div>
        {state === "Sign Up" ? (
          <div className="inputBox">
            <input name='confirmPassword' value={formData.confirmPassword} onChange={changeHandler} type="password" required="required" />
            <i className="fa-solid fa-lock"></i><span>confirm password</span>
          </div>
        ) : null}
        <div className="inputBox">
          <input type="submit" value={state === "Sign Up" ? "Create Account" : "Login"} onClick={handleSubmit} />
        </div>
        {state === "Sign Up" ? (
          <p>Already a member? <span onClick={() => { setState("Login") }} style={{ fontWeight: 'bold', color: 'white', cursor: 'pointer' }}>Log in</span></p>
        ) : (
          <p>No account? <span onClick={() => { setState("Sign Up") }} style={{ fontWeight: 'bold', color: 'white', cursor: 'pointer' }}>Create an account</span></p>
        )}
      </div>
    </div>
  )
}

export default LoginRegister;
