import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";
function Login(){
  const navigate=useNavigate();
  const[message,setMessage] = useState("");

  const handleLogin=async(e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await fetch("https://the-closet-e-commerce-website.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("Login successful!");
        e.target.reset();

        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 1500);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Server error. Try again.");
    }
  };
  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleLogin}>
        <h1>Sign In</h1>

        <input type="email" placeholder="Email Address" required/>
        <input type="password" placeholder="Password" required />

        <button type="submit">Login</button>
        {message && <p className="auth-message">{message}</p>}
        <p> Don't have an account? <Link to="/register">Create Account</Link></p>
      </form>
    </section>
  );
}

export default Login;
