import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch the full list of users and filter by ID manually
        const response = await axios.get("https://jsonfakery.com/users");
        const foundUser = response.data.find((u) => u.id.toString() === id);

        if (!foundUser) {
          throw new Error("User not found");
        }

        setUser(foundUser);
      } catch (error) {
        console.error("Failed to fetch user details", error);
        setError("Failed to fetch user details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center text-gray-500">User not found.</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white custom-shadow2 shadow-lg rounded-lg">
      <img src={user.profile_pic} alt="Profile" className="w-32 h-32 mx-auto rounded-full" />
      <h2 className="text-2xl font-bold text-center mt-4"><span>Name:- </span> {user.first_name} {user.last_name}</h2>
      <p className="text-center text-gray-500"><span className="font-bold">Role:- </span>{user.role}</p>
      <p className="text-center text-gray-500"><span className="font-bold">Country:- </span>{user.address.country}</p>
      <p className="text-center text-gray-500"><span className="font-bold">Contact:- </span>{user.contact.personal}</p>
      {/* <p className="mt-4 text-gray-700">{user.bio || "No bio available."}</p> */}
    </div>
  );
}

export default UserDetails;
