// components/modal/JobsSidebar.tsx
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../config/urls";
import { toast } from "react-toastify";
import { format } from "date-fns";

type JobsProps = {
  id: string;          // meter id
  isOpen: boolean;     // ← NEW: control visibility from parent
  onClose: () => void;
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

const Jobs: React.FC<JobsProps> = ({ id, isOpen, onClose }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/meter/${id}/jobs`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const jobsData = data.data?.job || [];
      setJobs(Array.isArray(jobsData) ? jobsData : jobsData ? [jobsData] : []);

    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to fetch jobs";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!window.confirm("Are you sure you want to cancel this job?")) return;

    try {
      const response = await fetch(`${baseUrl}/meter/job/${jobId}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`Delete failed: ${response.status}`);

      const data = await response.json();

      if (data.status === "success") {
        setJobs((prev) => prev.filter((job) => job.id !== jobId));
      } else {
        throw new Error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Failed to cancel job");
    }
  };

  useEffect(() => {
    if (isOpen && id) {
      fetchJobs();
    }
  }, [isOpen, id]);

  const formatDate = (isoString: string) => format(new Date(isoString), "dd MMM yyyy, HH:mm");

  const getStatusBadge = (status: string) => {
    const isPending = status.toLowerCase() === "pending";
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isPending
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        }`}
      >
        {isPending ? "Pending" : "Completed"}
      </span>
    );
  };

  return (
    <>
      {/* Backdrop - only shown when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-gray-900 
          shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b dark:border-gray-700">
          <h2 className="text-xl font-oswald font-bold text-gray-900 dark:text-white">
            Meter Jobs
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto h-[calc(100vh-130px)]">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              <p className="text-lg font-medium">No jobs found</p>
              <p className="text-sm mt-2">This meter has no pending or recent jobs.</p>
            </div>
          ) : (
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
              {jobs.map((job) => (
                <li key={job.id} className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM4.5 10a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0z" />
                    </svg>
                  </span>

                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {job.name.replace(/_/g, " ").toUpperCase()}
                    {getStatusBadge(job.status)}
                  </h3>

                  <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                    {formatDate(job.created_at)}
                  </time>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Tracking: {job.tracking}
                    </span>

                    {job.status.toLowerCase() === "pending" && (
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={fetchJobs}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-70"
          >
            {loading ? "Refreshing..." : "Reload Jobs"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Jobs;