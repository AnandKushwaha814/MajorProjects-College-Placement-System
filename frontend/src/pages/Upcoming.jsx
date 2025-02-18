// import { useState } from "react";
// import upcomingDrives from "../Data/upcomingDrives.json";

// const Upcoming = () => {
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");

//   const apply = (company) => {
//     setLoading(true);
//     setSuccess("");
//     setTimeout(() => {
//       setLoading(false);
//       setSuccess(`✅ Successfully applied for ${company} drive!`);
//     }, 2000)
//   };
//   // Correct filtering approach
//   const filteredDrives = upcomingDrives.drives.filter((drive) =>
//     drive.company.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6">
//         📢 Upcoming Placement Drives
//       </h2>

//       {/* Search Bar */}
//       <input
//         type="search"
//         placeholder="Search by company name..."
//         className="w-full p-2 border rounded mb-4"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       {/* Success Message */}
//       {success && (
//         <p className="mt-4 text-green-600 text-center font-semibold">{success}</p>
//       )}
//       {upcomingDrives.drives.length === 0 ? (
//         <p className="text-center  text-gray-500">No upcoming drives available.</p>
//       ) : (
//         <div className="grid sm:grid-cols-1 b md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredDrives.length > 0 ? (
//             filteredDrives.map((drive) => (
//               <div
//                 key={drive.drive_id}
//                 className="custom-shadow3 p-4 rounded-xl shadow-lg bg-white hover:shadow-lg transition-shadow duration-300"
//               >
//                 <h3 className="text-xl font-semibold text-blue-600">
//                   {drive.company}
//                 </h3>
//                 <p className="text-gray-600 mt-1">
//                   📅 <span className="font-medium">{drive.date}</span>
//                 </p>
//                 <p className="text-gray-700 mt-2 font-medium">
//                   Min CGPA: <span className="font-semibold">{drive.minCGPA}</span>
//                 </p>
//                 <p className="text-gray-700 font-medium mt-2">
//                   Eligible Departments:
//                 </p>
//                 <ul className="text-gray-500 list-disc list-inside mb-4">
//                   {drive.eligibleDepartments.map((dept, index) => (
//                     <li key={index}>{dept}</li>
//                   ))}
//                 </ul>

//                 {/* Apply Now Button */}
//                 <button
//                   onClick={apply}
//                   disabled={loading}
//                   className={`w-full py-2 text-white font-bold rounded-5 transition duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-green-600"
//                     }`}
//                 >
//                   {loading ? "Applying....." : "Apply"}
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">No results found.</p>
//           )}
//         </div>
//       )}

//     </div>
//   );
// };

// export default Upcoming;


import { useState } from "react";
import upcomingDrives from "../Data/upcomingDrives.json";

const Upcoming = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState({}); // Track loading per drive
  const [successMessage, setSuccessMessage] = useState("");

  const apply = (driveId, company) => {
    setLoading((prev) => ({ ...prev, [driveId]: true })); // Set loading for the clicked drive
    setSuccessMessage(""); // Clear previous success message

    setTimeout(() => {
      setLoading((prev) => ({ ...prev, [driveId]: false })); // Reset loading for the clicked drive
      setSuccessMessage(`✅ Successfully applied for ${company} drive!`);
    }, 2000); // Simulated delay
  };

  // Filtering drives based on search input
  const filteredDrives = upcomingDrives.drives.filter((drive) =>
    drive.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        📢 Upcoming Placement Drives
      </h2>

      {/* Search Bar */}
      <input
        type="search"
        placeholder="Search by company name..."
        className="w-full p-2 border rounded mb-4 custom-shadow3 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Success Message */}
      {successMessage && (
        <p className="mt-4 text-green-600 text-center font-semibold">{successMessage}</p>
      )}
      {upcomingDrives.drives.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming drives available.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrives.length > 0 ? (
            filteredDrives.map((drive) => (
              <div
                key={drive.drive_id}
                className="custom-shadow3 cards p-4 rounded-xl bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-600">{drive.company}</h3>
                <p className="text-gray-600 mt-1">
                  📅 <span className="font-medium">{drive.date}</span>
                </p>
                <p className="text-gray-700 mt-2 font-medium">
                  Min CGPA: <span className="font-semibold">{drive.minCGPA}</span>
                </p>
                <p className="text-gray-700 font-medium mt-2">Eligible Departments:</p>
                <ul className="text-gray-500 list-disc list-inside mb-4">
                  {drive.eligibleDepartments.map((dept, index) => (
                    <li key={index}>{dept}</li>
                  ))}
                </ul>

                {/* Apply Now Button */}
                <button
                  onClick={() => apply(drive.drive_id, drive.company)}
                  disabled={loading[drive.drive_id]}
                  className={`w-full py-2 custom-shadow3 text-white font-bold rounded-5 transition duration-300 ${loading[drive.drive_id] ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-green-600"
                    }`}
                >
                  {loading[drive.drive_id] ? "Applying....." : "Apply"}
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
};

export default Upcoming;
