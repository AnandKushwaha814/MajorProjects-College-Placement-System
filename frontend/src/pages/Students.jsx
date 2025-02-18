import { useState } from "react";
import StudentsData from "../Data/placementData.json";
import { useNavigate } from "react-router-dom";

function Students() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filterStudent = StudentsData.placements.filter((student) => {
    // If company is an object, use its name, otherwise use the string directly.
    const companyName =
      typeof student.company === "string"
        ? student.company
        : student.company?.name || "";
    return companyName.toLowerCase().includes(search.toLowerCase());
  });

  // Update the function to accept a student id as a parameter.
  const placeMentData = (studentId) => {
    navigate(`/placed/${studentId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto ">
      <h2 className="text-3xl font-bold text-center mb-6 ">
        Placement Records
      </h2>
      <input
        type="search"
        placeholder="Search By Company"
        className="w-full p-2 border rounded mb-4 custom-shadow3 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {StudentsData.placements.length === 0 ? (
        <p className="text-center text-gray-500">
          No placement records available.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterStudent.length > 0 ? (
            filterStudent.map((student) => (
              <div
                key={student.student_id}
                className="cards custom-shadow3 p-4 rounded-lg bg-white"
              >
                {/* <h3 className="text-xl font-semibold">
                  {student.student_id}
                </h3> */}
                <h3 className="text-xl font-semibold">{student.name}</h3>
                <p className="text-gray-600">{student.department}</p>
                <p className="text-gray-500">
                  Graduation Year: {student.graduation_year}
                </p>
                <p
                  className={`font-semibold ${student.status === "Placed"
                      ? "text-green-600"
                      : "text-red-600"
                    }`}
                >
                  Status: {student.status}
                </p>
                {student.company ? (
                  <div className="mt-2 ">
                    <p className="text-gray-700 font-semibold">
                      Company: {student.company.name}
                    </p>
                    <p className="text-gray-500">
                      Role: {student.company.role}
                    </p>
                    <p className="text-blue-600 font-semibold">
                      Package: {student.company.package.amount}{" "}
                      {student.company.package.currency}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No placement details available
                  </p>
                )}
                <button
                  onClick={() => placeMentData(student.student_id)}
                  className="student w-full custom-shadow3 bg-blue-600 text-white font-semibold py-2 rounded-5 hover:bg-green-500 transition-all duration-300"
                >
                  View More
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Students;
