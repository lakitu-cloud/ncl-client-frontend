// src/components/modal/TokenActionsModal.tsx
import React, { useState } from "react";
import { HiX, HiInformationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { useGenerateTamper, useGenerateToken } from "../../hooks/useToken"; // your hook
import { Loader } from "lucide-react";
import { IoBriefcaseOutline, IoSettingsOutline } from "react-icons/io5";
import { MotionModal } from "../motion/motionModal";

type TokenActionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  meterSerial: string;
  meterId: string
};

const TokenActionsModal: React.FC<TokenActionsModalProps> = ({
  isOpen,
  onClose,
  meterSerial,
  meterId
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("token");

  // Generate Token Form
//   const [account, setAccount] = useState("");
  const [units, setUnits] = useState<number | "">("");
  const [generateError, setGenerateError] = useState<string | null>(null);

  // Clear Tamper Form
  const [tamperSerial, setTamperSerial] = useState(meterSerial);
  const [tamperError, setTamperError] = useState<string | null>(null);

  const { mutate: generateToken, isPending: isGenerating } = useGenerateToken();
    const { mutate: clearTamperMutation, isPending, isSuccess } = useGenerateTamper()
  

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerateError(null);

    // if (!account.trim()) return setGenerateError("Account/phone is required");
    if (!units || Number(units) <= 0) return setGenerateError("Unit must be > 0");

   generateToken(
    { 
      serial: meterSerial, 
      unit: Number(units) 
    },
    {
      onSuccess: () => {
        onClose();           // ← closes modal on success
      },
    }
  );
  };

  const handleClearTamper = (e: React.FormEvent) => {
    e.preventDefault();
    setTamperError(null);

    if (!tamperSerial.trim()) return setTamperError("Serial number is required");

    // TODO: Replace with your real clear tamper API/mutation
    clearTamperMutation(tamperSerial, {
      onSuccess: () => {
        onClose();
      }
    })
  };

    type Tab = "token" | "clear";


    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
      {
        id: "token",
        label: "Generate Token",
        icon: <IoBriefcaseOutline className="w-5 h-5" />,
      },
      {
        id: "clear",
        label: "Clear Tamper",
        icon: <IoSettingsOutline className="w-5 h-5" />,
      },
    ];

  if (!isOpen) return null;

  return (
    <MotionModal isOpen={isOpen} onClose={onClose}>

         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b dark:border-gray-800">
          <h2 className="text-2xl font-oswald font-bold text-gray-900 dark:text-white">
            TOKEN GENERATION
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Heads-up Info */}
        <div className="px-4 rounded-md mt-2 dark:border-amber-900/50 font-poppins">
  <div className="px-6 py-4 bg-amber-50 dark:bg-amber-950/30 border-b ">
          <div className="flex items-start gap-3 text-sm ">
            <HiInformationCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <div className="text-amber-800 dark:text-amber-300">
              <p className="font-medium">Important:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Ensure meter is active and registered</li>
                <li>Double-check amount and account</li>
                <li>Clear tamper only when confirmed</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      

        {/* Compact Tabs */}
        {/* <div className="flex justify-center gap-2 px-6 pt-4 pb-2 border-b dark:border-gray-800">
          <button
            onClick={() => setActiveTab("generate")}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "generate"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Generate Token
          </button>
          <button
            onClick={() => setActiveTab("clear")}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "clear"
                ? "bg-red-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Clear Tamper
          </button>
        </div> */}

           {/* Tabs */}
            <div className="mb-4 border-b px-4 dark:border-gray-700">
              <nav className="flex flex-wrap -mb-px text-sm font-medium text-center font-poppins">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-block p-4 border-b-2 rounded-t-base text-gray-800 dark:text-whiteText ${
                      activeTab === tab.id
                        ? "text-blueTheme border-blue-600"
                        : "text-gray-500 border-transparent dark:border-gray-700 hover:text-gray-400"
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

        {/* Content */}
        <div className="p-6">
          {/* Generate Token */}
          {activeTab === "token" && (
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Meter Serial (read-only) */}
              <div className="relative flex flex-col">
                <input
                  type="text"
                  value={meterSerial}
                  readOnly
                  className="peer w-full px-4 pt-6 pb-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="absolute px-6 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 rtl:peer-focus:left-auto">
                  Meter Number
                </label>
              </div>

              {/* Account / Phone */}
              {/* <div className="relative flex flex-col">
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder=" "
                  className="peer w-full px-4 pt-6 pb-2 text-gray-900 dark:text-white bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">
                  Account / Phone Number
                </label>
              </div> */}

              {/* Amount */}
              <div className="relative flex flex-col">
                <input
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder=" "
                  className="peer w-full px-4 pt-6 pb-2 text-gray-900 dark:text-white bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">
                  Units
                </label>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60 transition flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Token"
                )}
              </button>
            </form>
          )}

          {/* Clear Tamper */}
          {activeTab === "clear" && (
            <form onSubmit={handleClearTamper} className="space-y-6">
              <div className="relative flex flex-col">
                <input
                  type="text"
                  value={tamperSerial}
                  onChange={(e) => setTamperSerial(e.target.value)}
                  placeholder=" "
                  className="peer w-full px-4 pt-6 pb-2 text-gray-900 dark:text-white bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-red-500 focus:outline-none"
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">
                  Meter Number
                </label>
              </div>

              {/* {tamperError && (
                <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
                  {tamperError}
                </p>
              )} */}

              {/* <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
                  <HiInformationCircle className="w-5 h-5" />
                  Warning: This action resets tamper detection. Use carefully.
                </p>
              </div> */}

              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition flex items-center justify-center"
              >
                Clear Tamper
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    </MotionModal>
   
  );
};

export default TokenActionsModal;