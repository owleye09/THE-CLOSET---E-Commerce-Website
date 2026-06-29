import { useState } from "react";

function Checkout() {
  const [message, setMessage] = useState("");

  const placeOrder = async (e) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalAmount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const orderData = {
      customerName: e.target[0].value,
      email: e.target[1].value,
      phone: e.target[2].value,
      address: e.target[3].value,
      items: cart,
      totalAmount,
    };

    try {
      const res = await fetch("https://the-closet-e-commerce-website.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        localStorage.removeItem("cart");
        e.target.reset();

        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage(data.message || "Order failed");
      }
    } catch (error) {
      setMessage("Server error. Try again.");
    }
  };

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <form className="checkout-form" onSubmit={placeOrder}>
        <div className="form-section">
          <h2>Shipping Details</h2>

          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="Phone Number" required />
          <textarea placeholder="Shipping Address" required></textarea>
        </div>

        <div className="form-section">
          <h2>Payment Details</h2>

          <input type="text" placeholder="Cardholder Name" required />
          <input type="text" placeholder="Card Number" required />
          <div className="payment-row">
            <input type="text" placeholder="MM/YY" required />
            <input type="text" placeholder="CVV" required />
          </div>

          <button type="submit">Place Order</button>

          {message && <p className="order-message">{message}</p>}
        </div>
      </form>
    </section>
  );
}

export default Checkout;
