import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/authContext"; // Import Firebase auth context

function Header() {
  const { isLoggedIn, logout } = useFirebase(); // Get authentication status and logout function

  

  return (
    <div className="bg-[#0d6efd] p-4 text-white flex justify-between items-center">
      {/* Logo */}
      <span className="text-xl font-bold">Placement Portal</span>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-7 text-xl ">
        <Link to="/" className="text-white link-light link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover" aria-label="Home">Home</Link>
        <Link to="/jobs" className="text-white link-light link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover" aria-label="Jobs">Jobs</Link>
        <Link to="/students" className="text-white link-light link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover" aria-label="Students">Students</Link>
        <Link to="/drives" className="text-white link-light link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover" aria-label="Upcoming Drives">Upcoming Drives</Link>
        {/* Show track application only if logged in */}
        {isLoggedIn && (
          <Link to="/track" className="text-white link-light link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover" aria-label="Track Application">Track Application</Link>
        )}

        {/* Show Login only if not logged in */}
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="text-white link-light link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover" aria-label="Login">Login</Link>
            <Link to="/signup" className="text-white link-light link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover" aria-label="Signup">SignUp</Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="text-white link-offset-3  hover:underline"
            aria-label="Logout"
          >
            Logout
          </button>
        )}
      </nav>

      {/* Search Box */}
      <div className="flex items-center space-x-2 bg-blue-500 p-2 rounded-lg">
        <input
          className="bg-transparent text-white px-3 py-2 rounded-lg outline-none placeholder-white"
          type="search"
          placeholder="Search for jobs, students, or drives"
          aria-label="Search"
        />
        <IoSearch className="text-white cursor-pointer" aria-label="Search icon" />
      </div>
    </div>
  );
}

export default Header;
