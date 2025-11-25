import React, { useState, useEffect } from "react";
import { baseUrl } from "../../config/urls";

type JobsProps = {
  selectedId: string | null;
};

type Job = {
  id: string;
  name: string;
  created_at: string;
  status: string;
  tracking: string;
  value: string;
  meter: string;
  updated_at: string;
};

const Jobs: React.FC<JobsProps> = ({ selectedId }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try{
        const response = await fetch(`${baseUrl}/meter/job/${id}/delete`,{ 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }});

        console.log(response)

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));

        const data = await response.json()
        if(data.status === "success"){
            fetchJobs();
        }
      } catch (err) {
        console.error("Delete error:", err);
        setError(err instanceof Error ? err.message : "Failed to delete job");
      }
    };


  const fetchJobs = async () => {
    if (!selectedId) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/meter/${selectedId}/jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle API response structure
      const jobsData = data.data?.job;
      
      // Ensure we always have an array
      const normalizedJobs = Array.isArray(jobsData) 
        ? jobsData 
        : jobsData
          ? [jobsData] // Wrap single object in array
          : [];

      setJobs(normalizedJobs);

    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedId]);

  // Utility function to format date
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4 md:p-5">
      {error && (
        <div className="text-red-500 mb-4">
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Loading jobs...</div>
      ) : (
        <>
          <ol className="relative border-s border-gray-200 dark:border-gray-600 ms-3.5 mb-4 md:mb-5">
            {jobs.map((item) => (
              <li key={item.id} className="mb-10 ms-8">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
                  <svg
                    className="w-2.5 h-2.5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"
                    />
                  </svg>
                </span>
                <h3 className="flex font-oswald items-start mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {item.name.replace(/_/g, ' ').toUpperCase()}
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 ms-3">
                    {item.status === 'pending' ? 'Pending' : 'Completed'}
                  </span>
                </h3>
                <time className="block mb-3 font-poppins text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                  {formatDate(item.created_at)}
                </time>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-oswald text-gray-500">
                    {item.tracking}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="py-2 px-3 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ))}
          </ol>

          {jobs.length === 0 && !error && (
            <div className="text-gray-500">No jobs found for this meter</div>
          )}
        </>
      )}

      <button
        className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={fetchJobs}
        disabled={loading || !selectedId}
      >
        {loading ? "Refreshing..." : "Reload Jobs"}
      </button>
    </div>
  );
};

export default Jobs;