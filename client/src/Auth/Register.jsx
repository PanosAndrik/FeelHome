import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:4040/auth/register", {
        fullName,
        email,
        password
      });

     navigate("/login");
      // Redirect or handle success
    } catch (error) {
      if (error.response && error.response.data) {
        alert(`Registration failed: ${error.response.data.msg}`);
        setEmail("");
        setPassword("");
        setFullName("");
      } 
      console.error("Error during registration:", error);
    }

  

  };

  return (
<div className="background-img">
    <div className="login-div">
      <h1 className="text-area t-h1">SIGN UP</h1>
      <p className="text-area">Please enter your full name, email and password to register to our page:</p>
       <TextField
        label="Full Name"
        variant="outlined"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="mb-4 text"
        />
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
      <Button variant="contained" onClick={handleRegister}>
        Sign up
      </Button>
    </div>
    </div>
  );
};

export default Register;
