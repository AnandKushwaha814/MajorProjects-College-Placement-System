import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import placementData from "../Data/placementData.json";

function PlacementDetails() {
  const { student_id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("student_id from URL:", student_id);
    const foundStudent = placementData.placements.find(
      (student) => student.student_id === student_id
    );
    console.log("Found Student:", foundStudent);

    if (!foundStudent) {
      setError("User not found");
    } else {
      setUser(foundStudent);
    }
    setIsLoading(false);
  }, [student_id]);

  if (isLoading)
    return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user)
    return <p className="text-center text-gray-500">User not found.</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white custom-shadow3 shadow-lg rounded-lg m-5">
      <h2 className="text-2xl font-bold text-center mt-4">{user.name}</h2>
      <p className="text-center text-gray-500">
        <span className="font-bold">Department: </span>
        {user.department}
      </p>
      <p className="text-center text-gray-500">
        <span className="font-bold">Graduation Year: </span>
        {user.graduation_year}
      </p>
      <p className="text-center text-gray-500">
        <span className="font-bold">Status: </span>
        {user.status}
      </p>
      {user.company && (
        <div className="mt-4">
          <p className="text-center text-gray-500">
            <span className="font-bold">Company: </span>
            {user.company.name}
          </p>
          <p className="text-center text-gray-500">
            <span className="font-bold">Location: </span>
            {user.company.location}
          </p>
          <p className="text-center text-gray-500">
            <span className="font-bold">Role: </span>
            {user.company.role}
          </p>
          <p className="text-center text-gray-500">
            <span className="font-bold">Package: </span>
            {user.company.package.currency} {user.company.package.amount}
          </p>
        </div>
      )}
      <p className="text-center text-gray-500 mt-4">
        <span className="font-bold">Placement Date: </span>
        {user.placement_date}
      </p>
    </div>
  );
}

export default PlacementDetails;
