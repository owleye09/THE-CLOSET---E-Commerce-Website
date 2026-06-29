import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://the-closet-e-commerce-website.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <h1>Loading product...</h1>;
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  return (
    <section className="product-details-page">
      <div className="product-details-container">
        <img src={product.image} alt={product.name} />

        <div className="product-details-info">
          <p className="product-tag">{product.tag}</p>
          <h1>{product.name}</h1>
          <p className="details-price">${product.price}</p>

          <p className="details-description">{product.description}</p>

          <button onClick={addToCart}>Add to Cart</button>

          <Link to="/" className="back-link">
            Back to Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
