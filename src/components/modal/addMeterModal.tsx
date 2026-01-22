// components/modals/AddMeterModal.tsx
import React, { useEffect, useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { IoHelpCircleOutline } from "react-icons/io5";
import { useApp } from "../../context/ContextProvider";
import { useRefresh } from "../../hooks/useUser"; // Updated hook (no password param)
import { toast } from "react-toastify";

interface Props {
  onClose:() => void;
}

export const AddMeterModal: React.FC<Props> = ({ onClose }) => {
  const { setIsButtonPress } = useApp();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(6);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Use the clean, parameter-free useRefresh hook
  const refreshMutation = useRefresh();

  // Fake progress animation while the request is pending
  useEffect(() => {
    if (showProgress && !isComplete && refreshMutation.isPending) {
      const totalSteps = 13 - 6 + 2; // steps 6-13 + final processing
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 13) return prev;
          return prev + 1;
        });

        setProgressPercentage((prev) => {
          const next = prev + 100 / totalSteps;
          return next >= 100 ? 100 : next;
        });
      }, 600);

      return () => clearInterval(interval);
    }
  }, [showProgress, isComplete, refreshMutation.isPending]);

  // When mutation finishes (success or error) → stop progress
  useEffect(() => {
    if (refreshMutation.isSuccess || refreshMutation.isError) {
      setIsComplete(true);
      setProgressPercentage(100);
      setCurrentStep(14);
    }
  }, [refreshMutation.isSuccess, refreshMutation.isError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      toast.error("Please enter a password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.loading("Adding meters...", { toastId: "LOADING" });
    setShowProgress(true);
    setIsComplete(false);
    setProgressPercentage(0);
    setCurrentStep(6);

    // Trigger mutation – password is passed here
    // refreshMutation.mutate(password);
  };

  const closeModal = () => {
    setIsButtonPress(false);
    // refreshMutation.reset(); // Clean up mutation state if needed
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-2xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-oswald uppercase">
            Add Multiple Meters
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="Close modal"
          >
            <FiXCircle className="w-6 h-6 hover:text-red-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Please enter the vendor password to add multiple meters in bulk. 
            Ensure the password matches the vendor's records.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Password
                </label>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Confirm Password
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <IoHelpCircleOutline className="w-5 h-5" />
              <span className="text-xs">
                Contact your meter vendor if you don’t know this password.
              </span>
            </div>

            {/* Submit Button */}
            {!showProgress && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={refreshMutation.isPending}
                  className="px-8 py-2.5 rounded-lg border border-gray-400 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {refreshMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "SUBMIT"
                  )}
                </button>
              </div>
            )}
          </form>

          {/* Progress Section */}
          {showProgress && (
            <div className="mt-8 space-y-6">
              {/* Progress Bar */}
              <div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Action Status</span>
                  <span>{progressPercentage.toFixed(0)}%</span>
                </div>
              </div>

              {/* Step List */}
              <div className="text-sm space-y-1">
                {Array.from({ length: 8 }, (_, i) => i + 6).map((step) => (
                  <div
                    key={step}
                    className={`${
                      currentStep >= step ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {step <= 13
                      ? `Adding devices [step ${step}]...`
                      : "Processing credits..."}
                  </div>
                ))}
              </div>

              {/* Info Note */}
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                You can close this window at any time. Meters will continue being added in the background. 
                Once connected, their status will change to "Online".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};




