import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import "../styles/Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");

    console.log("Form submitted", { name, email, message });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="background-div">
      <Container className="form-container" maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <p>
            For any question or inquiry, please feel free to contact us via the
            form below:
          </p>
          <br />
          <label>Enter your name here:</label>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <label>Enter your email here:</label>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <label>Enter your message here:</label>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
          />
          <Button
            className="contact-btn"
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Send Message
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Contact;
