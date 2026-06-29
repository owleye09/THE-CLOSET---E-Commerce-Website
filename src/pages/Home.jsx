import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("filter");
  const search = searchParams.get("search");

  useEffect(() => {
    fetch("https://the-closet-e-commerce-website.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("Error fetching products:", error));
  }, []);

  let filteredProducts = products;

  if (filter === "best-seller") {
    filteredProducts = products.filter(
      (product) => product.tag === "best seller"
    );
  } else if (filter === "clothing") {
    filteredProducts = products.filter(
      (product) => product.category === "clothing"
    );
  } else if (filter === "accessories") {
    filteredProducts = products.filter(
      (product) => product.category === "accessories"
    );
  }

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const getTitle = () => {
    if (search) return `Search results for "${search}"`;
    if (filter === "best-seller") return "Best Sellers";
    if (filter === "clothing") return "Clothing";
    if (filter === "accessories") return "Accessories";
    return "Featured Products";
  };

  return (
    <main>
      <section className="hero-section">
        <div>
          <p className="hero-small">New Season Collection</p>
          <h1>Style Made Simple</h1>
          <p className="hero-text">
            Discover trendy clothing and accessories curated for everyday fashion.
          </p>

          <a href="#products" className="shop-btn">
            Shop Now
          </a>
        </div>
      </section>

      <section className="products-section" id="products">
        <h2>{getTitle()}</h2>

        {filteredProducts.length === 0 ? (
          <p className="no-products">No products found.</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
