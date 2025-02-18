import { useState, useEffect } from "react";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://jsonfakery.com/jobs"); // Replace with actual API
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filterJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p className="text-center text-gray-500">Loading jobs...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Available Jobs</h2>
      <input
        type="search"
        placeholder="Search Jobs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4 custom-shadow3 outline-none"
      />

      {filterJobs.length === 0 ? (
        <p className="text-center custom-shadow3  text-gray-500">No jobs available at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 custom-shadow3 gap-6">
          {filterJobs.map((job) => (
            <div key={job.id} className="p-4 custom-shadow3   rounded-lg">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company || "Unknown Company"}</p>
              <p className="text-gray-500">{job.location || "Location not specified"}</p>
              <p className="text-green-600 font-semibold">
                Salary: &#8377; {job.salary_to || "Not Disclosed"}
              </p>
              <a
                href={job.applyLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 link-offset-2 link-underline link-underline-opacity-0 custom-shadow3 inline-block bg-blue-500 text-white px-4 py-2 rounded-5 hover:bg-green-500 transition"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
