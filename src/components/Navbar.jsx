import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchText.trim() === "") {
      navigate("/");
    } else {
      navigate(`/?search=${searchText}`);
    }

    setSearchText("");
  };

  return (
    <>
      <header className="navbar">
        <div className="nav-left">
          <button className="menu-btn" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        </div>

        <Link to="/" className="logo">
          THE CLOSET
        </Link>

        <div className="nav-right">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>

          <Link to="/login">Sign In</Link>
          <Link to="/cart">Bag</Link>
        </div>
      </header>

      <div className={menuOpen ? "side-menu active" : "side-menu"}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>

        <h2>Menu</h2>

        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/?filter=best-seller" onClick={() => setMenuOpen(false)}>Best Sellers</Link>
        <Link to="/?filter=clothing" onClick={() => setMenuOpen(false)}>Clothing</Link>
        <Link to="/?filter=accessories" onClick={() => setMenuOpen(false)}>Accessories</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
      </div>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}
    </>
  );
}

export default Navbar;