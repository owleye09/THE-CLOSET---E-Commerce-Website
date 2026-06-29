import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="product-info">
        <p className="product-tag">{product.tag}</p>
        <h3>{product.name}</h3>
        <p className="product-price">${product.price}</p>

        <Link to={`/product/${product._id}`} className="view-btn">
          View Product
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;