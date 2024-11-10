const express = require("express");
require("dotenv").config();
const cors = require("cors");

const dbConnection = require("./config/connection");
const verifyToken = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listing");

const app = express();
const PORT = process.env.PORT || 4040;

//------------------middleware-----------------------------------
// Updated CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',  
    'https://feelhome.netlify.app/'  
  ],
  credentials: true
}));

app.use(express.json());

//------------------DB Connection---------------------------------
dbConnection();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the FeelHome API' });
});

//------------------User Routes---------------------------
app.use("/auth", authRoutes);

//------------------Listing Routes---------------------------
app.use("/listings", listingRoutes);

// Test routes
app.get("/testRoute", verifyToken, async (req, res) => {
  return res.send("Welcome!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ------------------------------server connection-------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});