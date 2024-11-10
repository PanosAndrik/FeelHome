import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting registration at:', `${API_URL}/auth/register`);
      
      const response = await axios.post(`${API_URL}/auth/register`, {
        fullName,
        email,
        password
      });

      console.log('Registration response:', response.data);

      if (response.data.success) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(response.data.message || "Registration failed");
      }

    } catch (error) {
      console.error("Error during registration:", error);
      
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.msg 
        || "Registration failed. Please try again.";
      
      alert(errorMessage);
      
      setEmail("");
      setPassword("");
      setFullName("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-img">
      <div className="login-div">
        <h1 className="text-area t-h1">SIGN UP</h1>
        <p className="text-area">
          Please enter your full name, email and password to register to our page:
        </p>
        <TextField
          label="Full Name"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mb-4 text"
          disabled={loading}
          required
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 text"
          type="email"
          disabled={loading}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 text"
          disabled={loading}
          required
          fullWidth
        />
        <Button 
          variant="contained" 
          onClick={handleRegister}
          disabled={loading}
          fullWidth
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </div>
    </div>
  );
};

export default Register;