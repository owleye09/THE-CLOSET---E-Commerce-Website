import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h2>THE CLOSET</h2>
          <p>
            A modern e-commerce platform for clothing and accessories with
            shopping cart, checkout, authentication, and admin features.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/?filter=best-seller">Best Sellers</Link>
          <Link to="/?filter=clothing">Clothing</Link>
          <Link to="/?filter=accessories">Accessories</Link>
        </div>

        <div className="footer-links">
          <h3>Account</h3>
          <Link to="/login">Sign In</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@thecloset.com</p>
          <p>Location: Hyderabad, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 THE CLOSET. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;