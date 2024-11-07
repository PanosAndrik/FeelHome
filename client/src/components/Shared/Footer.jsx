import React from "react";
import "../../styles/footer.css" 

function Footer() {
    return (
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; {new Date().getFullYear()} Simply Feel at Home. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </footer>
    );
  }
  
export default Footer
