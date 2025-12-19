import React from "react";
import { useState } from "react";
import { AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { Spinner } from "../../components/Spinner";
import { useGenerateToken } from "../../hooks/useToken";
import { IoCloseOutline } from "react-icons/io5";
const GenerateToken = () => {
  const [serial, setSerial] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { mutate } = useGenerateToken()

  const handleGenerateToken = async () => {
    if (!serial || (amount ?? 0) <= 0 || !account.trim()) {
      setIsError("Please enter a valid Meter ID, Units, and Phone Number.");
      return;
    }
    
    mutate({serial, amount, account})

  };

  return (
    <div className="max-w-md mx-auto">
       <div className="mb-6 p-4 z-50 bg-yellow-50 dark:bg-blackText rounded-lg border border-yellow-200 dark:border-gray-200">
        <button className="absolute text-end p-3 hover:bg-white/20 rounded-xl transition">
                          <IoCloseOutline className="w-6 h-6" />
                        </button>
        <h3 className="font-semibold mb-2 flex items-center gap-2 text-yellow-800 dark:text-gray-200">
          <AiOutlineInfoCircle className="shrink-0" />
          Before Generating Token:
        </h3>
        <ul className="list-disc pl-6 text-sm text-yellow-700 dark:text-gray-300 space-y-2">
          <li>Ensure the meter is registered and active</li>
          <li>Confirm subscriber account is active</li>
          <li>Meter must have a valid price per unit set</li>
          <li>Allow up to 5 minutes after activation</li>
        </ul>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateToken();
        }}
        className="space-y-6"
      >
        {isError && <p className="text-red-600 mb-4 font-oswald">{isError}</p>}
        <div>
          <div className="relative z-0">
            <input
              type="text"
              id="serial"
              aria-describedby="serial"
              className="block py-2.5 px-0 w-full text-md text-gray-700 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-whiteText dark:border-gray-400 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              value={serial}
              aria-label={`serial number ${serial}`}
              onChange={(e) => setSerial(e.target.value)}
            />
            <label
              htmlFor="serial"
              className="absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Meter Number
            </label>
          </div>
          
        </div>
        <div>
          <div className="relative z-0">
            <input
              type="tel"
              id="account"
              className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-whiteText dark:border-gray-500 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              value={account}
              aria-autocomplete="list"
              autoFocus
              required
              aria-label={`select ${account}`}
              onChange={(e) => setAccount(e.target.value)}
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="absolute text-md text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Card Number/Phone Number
            </label>
          </div>
        </div>
        <div>
        <div className="relative z-0">
          <input
            type="number"
            id="units"
            className="block py-2.5 px-0 w-full text-md text-gray-700 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            value={amount}
            placeholder=" "
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setAmount(isNaN(value) ? 0 : value);
            }}
          />
          <label htmlFor="units" 
          className="absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Kiasi (TZS)
          </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blueTheme dark:bg-whiteText hover:bg-blue-950 focus:ring-4 focus:ring-blue-600 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2  dark:hover:bg-gray-200 focus:outline-none dark:focus:ring-gray-800 dark:text-blackText w-full flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner /> Generating...
            </>
          ) : (
            <>
              <AiOutlinePlus className="mr-2" /> Generate Token
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GenerateToken;
