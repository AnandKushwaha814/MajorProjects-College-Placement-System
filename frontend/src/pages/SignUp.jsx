import { useEffect, useState } from "react";
import { useFirebase } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignUp() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [role, setRole] = useState(""); // Default empty role

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate('/login')
    }
  }, [firebase, navigate])

  const handleSignUp = async () => {
    if (!role) {
      setError("Please select a role before signing up.");
      return;
    }
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const userCredential = await firebase.signupUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Store user info in the database
      await firebase.putData(`users/${user.uid}`, { email });

      setSuccess("Account created successfully! Redirecting to login...");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000)

    } catch (err) {
      console.error("Signup Error:", err.message);
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center m-3 bg-gray-100">
      <div className="cards w-full max-w-md bg-white custom-shadow3 rounded-lg p-6 ">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

        {/* Success Message */}
        {success &&
          <div className="alert alert-success alert-dismissible fade show mt-4" role="alert">
            <strong>Success:</strong> {success}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        }

        {/* Error Message */}
        {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{error}</strong>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          </button>
        </div>}

        <label className="block text-gray-700 mb-2">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          required
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg custom-shadow3 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <label className="block text-gray-700 mb-2">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          required
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg custom-shadow3 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <label className="block text-gray-700 mb-2">Role</label>
        <select onChange={(e) => setRole(e.target.value)}
          value={role}
          className="w-full px-4 py-2 border rounded-lg custom-shadow3 outline-none focus:ring-2 focus:ring-blue-500 mb-4">
          <option value="" disabled>Select</option>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          onClick={handleSignUp}
          disabled={loading}
          className={`w-full py-2 mb-2 student text-white custom-shadow3 font-bold rounded-5 transition duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-green-600"
            }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <Link to="/login" className="text-blue-600 link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover" aria-label="Login">Already Have Account ?</Link>
      </div>
    </div>
  );
}

export default SignUp;
