
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebase } from "../context/authContext";
import { useNavigate } from "react-router-dom"; // Redirect after login
import { Link } from "react-router-dom";

const Login = () => {
  const { firebaseAuth } = useFirebase(); // Get auth instance correctly
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Store error message
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      alert("Login Successful!");
      navigate("/"); // Redirect to home after login
    } catch (error) {
      setError(error.message); // Show error to user
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 m-4  rounded-lg custom-shadow3">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>} {/* Show error if any */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded custom-shadow3 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 border  rounded  custom-shadow3 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={loading} type="submit" className={`w-full  py-2 mb-2 student text-white font-bold rounded-5 custom-shadow3 transition duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-green-600"
          }`}>
          {loading ? "Login....." : "Login"}
        </button>
        <Link to="/signup" className="text-blue-500 link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover" aria-label="Signup">Create Account!</Link>
      </form>
    </div>
  );
};

export default Login;
