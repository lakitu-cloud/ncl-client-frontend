import React from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { baseUrl } from "../../config/urls";
import { Spinner } from "../../components/Spinner";
import { useGenerateTamper } from "../../hooks/useToken";
import { toast } from "react-toastify";

const ClearTamper = () => {
  const [serial, setSerial] = useState("");
  const { mutate, isPending, isSuccess } = useGenerateTamper()

  const handleClearTemper = async () => {
    if (!serial) {
      toast.error("Please enter a valid Meter Number.");
      return;
    }
      mutate(serial)
      
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleClearTemper();
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="serial" className="block text-gray-700 font-semibold">
          Name:
        </label>
        <input
          type="text"
          id="serial"
          className="w-full p-2 border rounded-md"
          value="Clear Temper"
          readOnly
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-gray-700 font-semibold">
          Meter Number:
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full p-2 border rounded-md"
          value={serial}
          aria-autocomplete="list"
          autoFocus
          required
          aria-label={`select ${serial}`}
          onChange={(e) => setSerial(e.target.value)}
          placeholder="Weka namba ya meter"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 flex items-center justify-center"
        disabled={isPending}
      >
        {isPending ? (
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
  );
};

export default ClearTamper;
