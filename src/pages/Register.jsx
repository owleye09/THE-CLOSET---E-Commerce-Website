import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";

function Register(){
  const navigate=useNavigate();
  const[message,setMessage]=useState("");

  const handleRegister=async(e) =>{
    e.preventDefault();
     const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("https://the-closet-e-commerce-website.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Account created successfully!");
        e.target.reset();

        setTimeout(() => {
          setMessage("");
          navigate("/login");
        }, 1500);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Server error. Try again.");
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1>Create Account</h1>

        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />

        <button type="submit">Register</button>
        {message && <p className="auth-message">{message}</p>}

        <p>Already have an account? <Link to="/login">Sign In</Link></p>     
      </form>
    </section>
  );
}

export default Register;
