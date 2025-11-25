import React from "react";
import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../config/urls";

type SettingProps = {
  serial: string;
};

const Setting: React.FC<SettingProps> = ({ serial }) => {
  const [type, setType] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>();
  const [calibration, setCalibration] = React.useState<number>(0);
  const [removeUser, setRemoveUser] = React.useState<string[]>([]);
  const [lockMeter, setLockMeter] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      let bodyData = {};
      switch (type) {
        case "Price Per Unit":
          bodyData = { price_per_unit: price };
          break;
        case "Calibration":
          bodyData = { calibration_factor: calibration };
          break;
        case "Remove User":
          bodyData = { remove_user: [...removeUser] };
          break;
        case "Lock Meter":
          bodyData = { lock_meter: lockMeter };
          break;
        default:
          throw new Error("Invalid configuration type");
      }

      const response = await fetch(`${baseUrl}/meter/${serial}/config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        setIsError(`Error: ${response.status} ${response.statusText})`);
      }
      const data = await response.json();

      if (data.status === "success") {
        setIsSuccess("Configuration saved successfully");

        window.location.reload();
        
      } else {
        setIsError(data.message || "Failed to save configuration");
      }
      return data;
    },
    onMutate: (variables) => {
      // Mutation logic here
      return { id: 1 };
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="relative gap-4 my-4">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Select Configuration</option>
        <option value="Price Per Unit">Price Per Unit</option>
        <option value="Calibration">Calibration</option>
        <option value="Remove User">Remove User</option>
        <option value="Lock Meter">Lock Meter</option>
      </select>

      <div className="mb-6">
        {type === "Price Per Unit" && (
          <input
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            type="number"
            placeholder="Price Per Unit"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        )}

        {type === "Calibration" && (
          <div className="relative flex items-center max-w-xs mx-auto">
            <button
              type="button"
              id="decrement-button"
              onClick={() =>
                setCalibration((prev) => Math.max(0.1, prev - 0.1))
              }
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="number"
              value={calibration}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setCalibration(
                  isNaN(value) ? 0.1 : Math.max(0.1, Math.min(50, value))
                );
              }}
              min="0.1"
              max="50"
              step="0.1"
              className="bg-gray-50 border-x-0 border-gray-300 py-2 font-medium text-center text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <button
              type="button"
              id="increment-button"
              onClick={() => setCalibration((prev) => Math.min(50, prev + 0.1))}
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        )}

        {type === "Remove User" && (
          <div className="space-y-1">
            <input
              value={removeUser}
              onChange={(e) =>
                setRemoveUser(
                  e.target.value.split(",").map((user) => user.trim())
                )
              }
              type="text"
              placeholder="user1, user3"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500">
              Enter comma-separated user IDs
            </p>
          </div>
        )}

        {type === "Lock Meter" && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={lockMeter}
              onChange={(e) => setLockMeter(e.target.checked)}
              className="w-4 h-4"
            />
            <label>Lock Meter</label>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 w-full py-2 px-4"
        disabled={mutation.status === "pending"}
      >
        {mutation.status === "pending" ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default Setting;
