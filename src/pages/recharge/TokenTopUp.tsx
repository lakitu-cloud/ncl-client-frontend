import { useEffect, useState } from "react";
import { IoCopyOutline, IoRefresh, IoSettings } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { PopupAlert } from "../../components/Alert";
import { Spinner } from "../../components/Spinner";
import { AiOutlineClear, AiOutlinePlus } from "react-icons/ai";
import { baseUrl } from "../../config/urls";
import { GiToken } from "react-icons/gi";
import { useApp } from "../../context/ContextProvider";
import ClearTamper from "./ClearToken";
import GenerateToken from "./GenerateToken";
import { TopUpPayload } from "../../types/rechargeTypes";
import { useFetchTokens } from "../../hooks/useToken"


const TokenTopUp = () => {
  const [selectedMeter, setSelectedMeter] = useState<TopUpPayload | null>(null);
  const [areAllChecked, setAllChecked] = useState<boolean>(false);
  const [checkboxItems, setCheckboxItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [serial, setSerial] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [account, setAccount] = useState<string>("");
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenType, setTokenType] = useState<string | null>("set");
  const { meters } = useApp();
  const { data: tableItems = [], isPending, isError } = useFetchTokens()


  useEffect(() => {
    const initialCheckboxState = tableItems.reduce((acc, item) => {
      acc[item.serial] = false;
      return acc;
    }, {} as { [key: string]: boolean });

    setCheckboxItems((prev) => {
      const isSame = Object.keys(initialCheckboxState).every(
        (key) => initialCheckboxState[key] === prev[key]
      );
      if (isSame) return prev;
      return initialCheckboxState;
    });
  }, [tableItems]);

  const handleSelectAll = () => {
    const newAreAllChecked = !areAllChecked;
    const newCheckboxItems = Object.fromEntries(
      Object.keys(checkboxItems).map((key) => [key, newAreAllChecked])
    );
    setCheckboxItems(newCheckboxItems);
    setAllChecked(newAreAllChecked);
    if (newAreAllChecked) {
      setSelectedMeter(null);
    }
  };

  const handleCheckboxChange = (serial: string) => {
    const newCheckboxItems = {
      ...checkboxItems,
      [serial]: !checkboxItems[serial],
    };
    setCheckboxItems(newCheckboxItems);
    setAllChecked(Object.values(newCheckboxItems).every((checked) => checked));

    const selectedItem = tableItems.find((item) => item.serial === serial);
    if (selectedItem && newCheckboxItems[serial]) {
      setSelectedMeter(selectedItem);
      setSerial(selectedItem.serial);
    } else {
      setSelectedMeter(null);
      setSerial("");
      setAmount(0);
    }
  };

  const handleCopyToken = (token: string | null) => {
    if (!token) {
      setCopyMessage("No token to copy.");
      return;
    }
    navigator.clipboard.writeText(token).then(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    });
  };

  return (
    <div className="w-full mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-3">
        {/* Left Panel: Data Table and Search */}
        <div className="md:col-span-6 mt-2 bg-dimWhite rounded-lg p-3">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col lg:flex-row gap-4 items-center"
          >
            <div className="flex items-center w-full gap-1 px-2 bg-gray-50 dark:bg-blackText border rounded-lg">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2 py-2 text-gray-500 bg-transparent rounded-md outline-none"
              />
            </div>
            <div className="flex items-center space-x-4 px-4 dark:text-whiteText">
              <p className="text-sm whitespace-nowrap font-poppins">
                Showing 0 of {tableItems.length} items
              </p>
              <IoSettings
                className="text-gray-600 dark:text-gray-200 w-6 h-6 hover:text-gray-400"
                onClick={() => console.log("Settings clicked")}
              />
              <IoRefresh
                className="text-gray-600 dark:text-gray-200 w-6 h-6 hover:text-gray-400"
                onClick={() => setSearchQuery("")}
              />
            </div>
          </form>

          <div className="mt-12 shadow-sm border rounded-md overflow-x-auto font-oswald">
            <table className="w-full table-auto text-sm text-left">
              <thead className="text-gray-600 font-medium border-b bg-gray-50 dark:bg-blackText dark:text-whiteText">
                <tr>
                  <th className="py-3 px-6 flex items-center gap-x-4 dark:text-whiteText">
                    <input
                      type="checkbox"
                      id="checkbox-all-items"
                      checked={areAllChecked}
                      onChange={handleSelectAll}
                    />
                    Meter No
                  </th>
                  <th className="py-3 px-6 uppercase dark:text-whiteText">Ref Number</th>
                  <th className="py-3 px-6 uppercase dark:text-whiteText">Token</th>
                  <th className="py-3 px-6 uppercase dark:text-whiteText">Units</th>
                  <th className="py-3 px-6 uppercase dark:text-whiteText">Price</th>
                  <th className="py-3 px-6 uppercase dark:text-whiteText">Type</th>
                  <th className="py-3 px-6 uppercase dark:text-whiteText">Status</th>
                  <th className="py-3 px-6 uppercase dark:text-whiteText">Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {isPending ? (
                  <tr>
                    <td colSpan={8} className="text-center justify-center  py-4">
                      <Spinner />
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-red-500">
                      Error loading data
                    </td>
                  </tr>
                ) : (
                  tableItems.map((item) => (
                    <tr
                      key={item.serial}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      <td className="px-6 py-2 flex items-center gap-x-4">
                        <input
                          type="checkbox"
                          checked={checkboxItems[item.serial] || false}
                          onChange={() => handleCheckboxChange(item.serial)}
                        />
                        {item.serial}
                      </td>
                      <td className="px-6 py-2">{item.reference}</td>
                      <td className="px-6 py-2 flex items-center">
                        {item.token}
                        {showPopup && (
                          <PopupAlert message="Token copied to clipboard!" />
                        )}
                        <IoCopyOutline
                          className="ml-2 text-gray-600 w-4 h-4 hover:text-gray-400"
                          onClick={() => handleCopyToken(item.token)}
                        />
                      </td>
                      <td className="px-6 py-2">
                        {item.units ? `${item.units} units` : "0"}
                      </td>
                      <td className="px-6 py-2">
                        {item.price ? `${item.price} TZS` : "0 TZS"}
                      </td>
                      <td className="px-6 py-2">
                        {item.type === "clear" ? (
                          <div className="flex items-center space-x-2 justify-center bg-yellow-200 px-1 py-1 rounded-md text-gray-700">
                            <AiOutlineClear />
                            <span>Tamper</span>
                          </div>
                        ) : item.type === "recharge" ? (
                          <div className="flex items-center space-x-2 justify-center bg-green-200 px-1 py-1 rounded-md text-gray-700">
                            <GiToken />
                            <span>Recharge</span>
                          </div>
                        ) : null}
                      </td>
                      <td className="px-6 py-2 text-gray-500 dark:text-gray-400">
                        {item.status === "active" ? (
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 me-2 text-green-500 dark:text-green-400 shrink-0"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            Success
                          </div>
                        ) : item.status === "pending" ? (
                          <div className="flex items-center text-red-500 ">
                            <div role="status">
                              <svg
                                aria-hidden="true"
                                className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div>
                            Waiting...
                          </div>
                        ) : null}
                      </td>
                      <td className="px-6 py-2">
                        {new Date(item.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Token Generation Form */}
        <div className="md:col-span-2 mt-2 dark:text-whiteText p-4 rounded-lg font-poppins">
          <div className="text-lg text-start border-b border-gray-200 font-oswald font-bold mb-4 uppercase">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <button
                  onClick={() => setTokenType("set")}
                  className={`inline-block p-4 border-b-2 rounded-t-lg  hover:text-gray-600 ${
                    tokenType === "set"
                      ? "border-blue-600 hover:text-blue-600"
                      : "border-b-transparent hover:text-gray-600"
                  }`}
                >
                  Generate Token
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => setTokenType("clear")}
                  className={`inline-block p-4 border-b-2 rounded-t-lg hover:border-gray-300 ${
                    tokenType === "clear"
                      ? "border-blue-600 hover:text-blue-600"
                      : "border-b-transparent hover:text-gray-600"
                  }`}
                >
                  Clear Temper
                </button>
              </li>
            </ul>
          </div>

          {tokenType === "set" && <GenerateToken />}

          {tokenType === "clear" && <ClearTamper />}
        </div>
      </div>
    </div>
  );
};

export default TokenTopUp;
