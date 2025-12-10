import React, { useState, HTMLProps, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FiEdit, FiPlusSquare, FiTrash } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { useApp } from "../../context/ContextProvider";
import { SubscriberPayload } from "../../types/subscriberTypes";
import { baseUrl } from "../../config/urls";
import { toast } from "react-toastify";
import { useAssignSub, useGetSubs } from "../../hooks/useSubscriber";

export function SubscriberTable() {
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [serial, setSerial] = React.useState<string>("");
  const [assignMeter, setAssignMeter] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [subscriber, setSubscriber] = React.useState<SubscriberPayload[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setIsButtonPress, meters } = useApp();
  const { data, isPending, isSuccess, isError, error } = useGetSubs();
  const { mutate: assignMutate, isSuccess: successAssign } = useAssignSub();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}/subscriber/${deleteId}/delete`, {
        method: "DELETE",
        credentials: "include",
      });

      console.log(response);

      const data = await response.json();

      if (data.status === "success") {
        toast.dismiss("Wakala created successfully!");
        setDeleteId("");
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to create wakala.");
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message || "An error occurred.");
    } finally {
      setIsModalOpen(false);
      setDeleteId("");
    }
  };

  const handleAssignMeter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serial) {
      toast.warn("Please select a meter serial.");
      return;
    }

    try {
      assignMutate({id: deleteId, serial});

      setDeleteId("");
      setAssignMeter(false);
    } catch (err: any) {
      console.error("Assignment error:", err.message);
      toast.error("Failed to assign meter");
    }
  };

  useEffect(() => {
    if (data) {
      setSubscriber(data as SubscriberPayload[]);
      console.log(data);
    }
  }, [data]);

  const columns = React.useMemo<ColumnDef<SubscriberPayload>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }: { row: any }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 2,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 10, // Adjust width
        cell: ({ getValue }: { getValue: any }) => (
          <FaCircleCheck
            className={`${
              getValue() === "active" ? "text-green-600" : "text-red-600"
            } font-medium`}
          />
        ),
      },
      {
        header: "Action",
        size: 2,
        cell: ({ row }: { row: any }) => (
          <div className="flex gap-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => {
                setDeleteId(row.original.id);
                setAssignMeter(true);
              }}
            >
              <FiPlusSquare />
            </button>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                setDeleteId(row.original.id);
                setIsModalOpen(true);
              }}
            >
              <FiTrash />
            </button>
            <button
              className="text-yellow-500 hover:text-yellow-700"
              onClick={() => {
                setDeleteId(row.original.id);
                setIsModalOpen(true);
              }}
            >
              <FiEdit />
            </button>
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 10,
      },
      {
        accessorKey: "account_no",
        header: "Tracking No",
        size: 10,
        cell: ({ row }) => {
          // Explicit type handling
          const accountNo: string | null = row.getValue("account_no");
          const phone: string | null = row.original.phone;

          // Handle all cases explicitly
          const displayValue = (accountNo?.trim() || phone?.trim()) ?? "N/A";

          return <div className="cursor-pointer">{displayValue}</div>;
        },
      },
      {
        accessorKey: "type",
        size: 10,
        header: "Type",
      },
      {
        header: "Meters",
        accessorKey: "meter",
        size: 100,
        cell: (props: any) => {
          // Properly typed value access
          const meters = props.row.original.meter;

          return (
            <span className="text-blue-600 font-medium">
              {Array.isArray(meters) && meters.length > 0
                ? meters.join(", ")
                : "No meters assigned"}
            </span>
          );
        },
      },
      {
        header: "Price/Unit",
        accessorKey: "ppu",
        size: 10,
      },

      {
        header: "Balance",
        accessorKey: "balance",
        size: 10,
        cell: ({ getValue }: { getValue: any }) => `TZS ${getValue()}`,
      },

      {
        accessorKey: "region",
        header: "Region",
        size: 10,
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        size: 150,
        cell: ({ getValue }: { getValue: any }) =>
          new Date(getValue()).toLocaleDateString(),
      },
    ],
    []
  );

  // const filteredData = React.useMemo(() => {
  //   return subscriber.filter(
  //     item =>
  //       (statusFilter ? item.status === statusFilter : true)

  //   );
  // }, [subscriber, statusFilter, typeFilter,]);

  const table = useReactTable({
    data: subscriber.length > 0 ? subscriber : [],
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="p-2 shadow border"
            placeholder="Search all columns..."
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 shadow border text-sm font-oswald"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        {assignMeter ? (
          <div className="flex gap-2">
            <form
              onSubmit={handleAssignMeter}
              className={`flex gap-2 items-center transition-all duration-500 ${
                assignMeter
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              {isError && <p className="text-red-500">{error.message}</p>}

              <div className="flex space-x-2 items-center">
                <div className="flex">
                  <button
                    type="button"
                    aria-expanded={isDropdownOpen}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200"
                  >
                    {serial || "Select a Meter"}
                    <IoMdArrowDropdown className="w-4 h-4 ms-2" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 overflow-auto">
                      <ul className="mt-12 py-2 text-sm text-gray-700">
                        {meters.length > 0 ? (
                          meters.map((meter) => (
                            <li key={meter}>
                              <button
                                type="button"
                                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                onClick={() => setSerial(meter)}
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
                  )}
                </div>
              </div>
              {/* <input
                type="number"
                id="ppu"
                aria-label="price per unit"
                name="price-per-unit"
                value={ppu}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setPpu(isNaN(value) ? 0 : value);
                }}
                className={`p-2 shadow border text-sm transition-all duration-500 ${
                  assignMeter
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-full"
                }`}
                placeholder="Enter Price Per Unit"
              /> */}

              <button
                type="submit"
                className={`bg-blue-600 font-oswald text-md text-white py-2 px-4 rounded-md hover:bg-blue-500 flex items-center justify-center transition-all duration-500 ${
                  assignMeter ? "opacity-100 translate-x-0" : "opacity-0"
                }`}
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                    updating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <AiOutlinePlus className="mr-2" /> Update
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setAssignMeter(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setIsButtonPress((prevState) => !prevState)}
            type="button"
            className="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Add Subscriber
          </button>
        )}
      </div>
      {!subscriber || subscriber.length === 0 ? (
        <>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-600">
                No data available
              </p>
              <p className="text-sm text-gray-500">
                Please add some data to view it here.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {isPending ? (
            <div>
              <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
              </div>
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="bg-gray-100 p-2 rounded-lg font-owald text-md uppercase"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-2 text-left text-sm font-medium text-gray-600"
                        style={{ width: header.column.columnDef.size }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel()?.rows?.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50  ${
                      row.getIsSelected() ? "bg-blue-50" : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell: any) => (
                      <td
                        key={cell.id}
                        className="p-2 text-md font-oswald text-gray-800"
                        style={{ width: cell.column.columnDef.size }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {isModalOpen && (
            <div
              id="deleteModal"
              className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
            >
              <div className="relative p-4 w-full max-w-md h-auto bg-white rounded-lg shadow dark:bg-gray-800">
                {/* Modal Content */}
                <div className="p-4 text-center">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-900 rounded-lg"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <svg
                    className="text-gray-400 w-11 h-11 mx-auto mb-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="mb-4 text-gray-500">
                    Are you sure you want to delete this item?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                    >
                      No, cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                      Yes, I'm sure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {/* Pagination Buttons */}
            <div className="flex items-center gap-1">
              <button
                className="px-3 py-1.5 border rounded-md text-sm font-medium 
                bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50
                disabled:cursor-not-allowed transition-colors"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                aria-label="First page"
              >
                {"<<"}
              </button>
              <button
                className="px-3 py-1.5 border rounded-md text-sm font-medium 
                bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50
                disabled:cursor-not-allowed transition-colors"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Previous page"
              >
                {"<"}
              </button>

              <button
                className="px-3 py-1.5 border rounded-md text-sm font-medium 
                bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50
                disabled:cursor-not-allowed transition-colors"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Next page"
              >
                {">"}
              </button>
              <button
                className="px-3 py-1.5 border rounded-md text-sm font-medium 
                bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50
                disabled:cursor-not-allowed transition-colors"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                aria-label="Last page"
              >
                {">>"}
              </button>
            </div>

            {/* Page Info */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-sm text-gray-700">
                <span>Page</span>
                <span className="font-medium px-1.5 py-0.5 bg-gray-100 rounded">
                  {table.getState().pagination.pageIndex + 1}
                </span>
                <span>of</span>
                <span className="font-medium px-1.5 py-0.5 bg-gray-100 rounded">
                  {table.getPageCount()}
                </span>
              </span>
            </div>

            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
              <select
                className="pl-3 pr-8 py-1.5 border rounded-md text-sm 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                appearance-none bg-no-repeat"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                {[10, 20, 30, 40, 50].map((size) => (
                  <option key={size} value={size}>
                    Show {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
