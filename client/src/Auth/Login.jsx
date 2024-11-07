import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4040/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      const userFullname = response.data.user.fullName;

      localStorage.setItem("token", token);
      localStorage.setItem("userFullname", userFullname);

      console.log(response);

      if (token) {
        alert("Logged in successfully!");
        navigate("/");
       
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login is not successful!");
      navigate("/");
     
    }
  };

  return (
    <div className="background-img">
      <div className="login-div">
        <h1 className="text-area t-h1">LOGIN</h1>
        <p className="text-area">
          Please enter your email and password to login:
        </p>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 text"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 text"
        />
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
