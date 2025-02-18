import { useState } from "react";
import placed_student from "../Data/placed_students.json";

const TracStatus = () => {
  const [search, setSearch] = useState("");

  // Filter students based on search input
  const filteredStudents = placed_student.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">College Placement Cell</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search students..."
        className="w-full p-2 border rounded mb-4 custom-shadow3 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
 
      <section className="mb-6 ">
        <h2 className="text-xl font-semibold mb-2">Students</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div key={student.id} className=" p-4 border border-none rounded-md custom-shadow3">
                <h3 className="font-semibold text-lg">{student.name}</h3>
                <p className="text-sm text-gray-600">Status: {student.status}</p>
                <p className="text-sm text-gray-600">Company: {student.company}</p>
                <p className="text-sm text-gray-600">Date: {student.date}</p>
                <p className="text-sm text-gray-600">Salary: {student.salary}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No students found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default TracStatus;
