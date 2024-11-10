import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Seller from "./pages/Seller.jsx";
import Searchbar from "./components/Shared/Searchbar.jsx";
import Header from "./components/Shared/Header.jsx";
import Footer from "./components/Shared/Footer.jsx";
import NewListing from "./pages/NewListing.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

const App = () => (
  <Router>
    {/* <div className="App"> */}
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/seller" element={<Seller />} />
      <Route path="/newlisting" element={<NewListing />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
    <Footer />
    {/* </div> */}
  </Router>
);

export default App;
