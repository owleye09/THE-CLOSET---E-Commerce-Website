import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const fetchAdminData = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("Error fetching products:", error));

    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log("Error fetching orders:", error));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.email !== "sriyaagudi@gmail.com") {
      navigate("/");
      return;
    }

    fetchAdminData();
  }, [navigate]);

  const addProduct = async (e) => {
    e.preventDefault();

    const productData = {
      name: e.target[0].value,
      price: Number(e.target[1].value),
      category: e.target[2].value.toLowerCase(),
      tag: e.target[3].value.toLowerCase(),
      image: e.target[4].value,
      description: e.target[5].value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Product added successfully!");
        e.target.reset();
        fetchAdminData();

        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage(data.message || "Failed to add product");
      }
    } catch (error) {
      setMessage("Server error. Try again.");
    }
  };

  return (
    <section className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="admin-stats">
        <div className="admin-card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div className="admin-card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="admin-card">
          <h3>Admin Access</h3>
          <p>Active</p>
        </div>
      </div>

      <div className="admin-content">
        <div className="add-product-box">
          <h2>Add Product</h2>

          <form onSubmit={addProduct}>
            <input type="text" placeholder="Product Name" required />
            <input type="number" placeholder="Price" required />
            <input type="text" placeholder="Category: clothing/accessories" required />
            <input type="text" placeholder="Tag: new/best seller" required />
            <input type="text" placeholder="Image URL" required />
            <textarea placeholder="Product Description" required></textarea>

            <button type="submit">Add Product</button>

            {message && <p className="admin-message">{message}</p>}
          </form>
        </div>

        <div className="product-table-box">
          <h2>Product List</h2>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Tag</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.tag}</td>
                  <td>${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="orders-box">
        <h2>Recent Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.customerName}</td>
                  <td>{order.email}</td>
                  <td>${order.totalAmount?.toFixed(2)}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default Admin;