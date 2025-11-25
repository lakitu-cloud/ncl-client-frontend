import React, { useEffect, useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useApp } from "../../context/ContextProvider";
import { Spinner } from "../../components/Spinner";
import { useAddMultipleMeter, useCreateMeter } from "../../hooks/useMeter";
import { IoHelpCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const AddMeterModal = () => {
  const { setIsButtonPress, meters } = useApp();
  const [selectedMeter, setSelectedMeter] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("manual");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mutate: createMutate, isPending } = useCreateMeter();
  const { mutate: addMultipleMutate, data, isLoading } = useAddMultipleMeter();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [showProgress, setShowProgress] = useState(false);

  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentStep, setCurrentStep] = useState(6);
  const [successCount, setSuccessCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (showProgress && !isComplete) {
      const totalSteps = 13 - 6 + 2; // Steps 6-13 + processing credits
      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 13) return prev;
          return prev + 1;
        });

        setProgressPercentage((prev) => {
          const newPercent = prev + 100 / totalSteps;
          return newPercent >= 100 ? 100 : newPercent;
        });
      }, 500);

      return () => clearInterval(stepInterval);
    }
  }, [showProgress, isComplete]);

  useEffect(() => {
    if (isComplete) {
      setProgressPercentage(100);
      setCurrentStep(14); // Show processing credits
    }
  }, [isComplete]);

  const handleDropdownToggle = () => setIsDropdownOpen((prev) => !prev);

  const handleMeterSelect = (meter: any) => {
    setSelectedMeter(meter);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createMutate(selectedMeter);
  };

  const handleAddingMeterMultiple = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowProgress(true);
    setIsComplete(false);

    try {
      addMultipleMutate({ meters, name, password });

      if (data?.addedCount !== undefined) {
        setSuccessCount(data.addedCount);
        setIsComplete(true);
      }
    } catch (error) {
      toast.dismiss("LOADING");
      toast.error("An error occurred while adding meters.");
      setIsComplete(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-2xl p-4">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-oswald uppercase">
            Create New Meter
          </h3>
          <button
            onClick={() => setIsButtonPress(false)}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FiXCircle className="w-5 h-5 hover:text-red-500" />
          </button>
        </div>

        <div className="text-sm font-medium text-center dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <p
                onClick={() => setSelectedTab("manual")}
                className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                  selectedTab === "manual"
                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent"
                }`}
              >
                Manual
              </p>
            </li>

            <li className="me-2">
              <p
                onClick={() => setSelectedTab("vendor")}
                className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                  selectedTab === "vendor"
                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent"
                }`}
              >
                Vendor
              </p>
            </li>
          </ul>
        </div>

        {selectedTab === "manual" && (
          <>
            <div className="m-4">
              <p className="text-sm text-wrap"></p>
              Please enter the serial number of the meter you wish to add.
              Ensure that the serial number is correct and unique to avoid any
              conflicts with existing meters. If you do not have a serial
              number, please contact the vendor or refer to the meter's
              documentation for assistance.
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex px-4">
                <button
                  type="button"
                  aria-expanded={isDropdownOpen}
                  onClick={handleDropdownToggle}
                  className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200"
                >
                  {selectedMeter || "Select a Meter"}
                  <IoMdArrowDropdown className="w-4 h-4 ms-2" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44">
                    <div className="mt-12 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                      {" "}
                      {/* Add max height and scroll */}
                      <ul className="py-2 text-sm text-gray-700">
                        {meters.length > 0 ? (
                          meters.map((meter) => (
                            <li key={meter}>
                              <button
                                type="button"
                                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                onClick={() => handleMeterSelect(meter)}
                              >
                                {meter}
                              </button>
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2 text-gray-500">
                            No meters available
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                <input
                  type="text"
                  className="block w-full py-2 px-4 text-sm text-gray-900 bg-gray-50 border rounded-r-lg"
                  placeholder="Enter meter serial number..."
                  value={selectedMeter}
                  onChange={(e) => setSelectedMeter(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 flex items-center justify-center text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
              >
                {isLoading ? <Spinner /> : <AiOutlinePlus className="mr-2" />}
                {isLoading ? "Processing..." : "Add Meter"}
              </button>
            </form>
          </>
        )}

        {selectedTab === "vendor" && (
          <>
            <div>
              <p className="text-sm text-wrap m-4">
                Please enter the meter type and password to add multiple meters.
                Ensure that the information provided is accurate and matches the
                vendor's records. If you encounter any issues, please contact
                the vendor for assistance.
              </p>
              <form className="flex px-4 mt-8 w-full text-sm items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer uppercase"
                    placeholder=" "
                  />
                  <label
                    htmlFor="small_outlined"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="password"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="confirm_password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="confirm_password"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Confirm Password
                  </label>
                </div>
                <IoHelpCircleOutline className="inline-block ml-2 text-gray-600 w-5 h-5 md:w-6 md:h-6 -mt-1 md:-mt-2" />
              </form>

              {!showProgress ? (
                <button
                  className="my-6 ml-auto mr-16 block rounded-lg border px-8 py-2"
                  onClick={handleAddingMeterMultiple}
                >
                  {!isLoading ? (
                    "SUBMIT"
                  ) : (
                    <div className="flex items-center">
                      <div className="spinner-border h-5 w-5 animate-spin rounded-full border-2 border-blue-800 border-t-transparent"></div>
                      <span className="ml-2">WAITIN...</span>
                    </div>
                  )}
                </button>
              ) : (
                <div className="p-4">
                  <div className="mb-4">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>ACTION STATUS</span>
                      <span>{progressPercentage.toFixed(0)}%</span>
                    </div>
                  </div>

                  <div className="text-sm space-y-2 mb-4">
                    {Array.from({ length: 8 }, (_, i) => i + 6).map((step) => (
                      <div
                        key={step}
                        className={`${
                          currentStep >= step
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step <= 13
                          ? `Adding devices [step ${step}]...`
                          : "Processing credits..."}
                      </div>
                    ))}
                  </div>

                  {progressPercentage >= 100 ? (
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-green-600 font-bold text-lg mb-2">
                        Successfully added all devices to the system
                      </div>
                      <div className="text-sm">
                        {meters.length} devices were successfully added
                      </div>
                      <div className="flex justify-center gap-4 mt-4">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded"
                          onClick={() => setShowProgress(false)}
                        >
                          NEXT
                        </button>
                        <button
                          className="px-4 py-2 border rounded"
                          onClick={() => setIsButtonPress(false)}
                        >
                          CLOSE
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-500">
                      You can close this window anytime, your device will be
                      added and continue connecting. Once your device has
                      connected, its status will change to "Online".
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddMeterModal;
