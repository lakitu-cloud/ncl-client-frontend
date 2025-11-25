import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import { TbAdjustmentsCancel } from "react-icons/tb";
import Setting from "./Setting";
import { HiX } from "react-icons/hi";
import DeleteModel from "../../components/modal/addMeterModal";
import Jobs from "./Jobs";
import { useGetMeter } from "../../hooks/useMeter";
import { MeterPayload } from "../../types/meter.types";
import { FaCircleCheck, FaCircleStop, FaCircleXmark } from "react-icons/fa6";
import {
  FaCog,
  FaDownload,
  FaSearch,
  FaSync,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import { toast } from "react-toastify";

export function MeterListPage() {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState({});
  const [isModalOpen, setIsModalOpen] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [meters, setMeters] = useState<MeterPayload[]>([]);
  const [checkJob, setCheckJobs] = useState(false);
  const { data, isFetching, isError, error } = useGetMeter();

  const [filter, setFilter] = useState("");
  const [toggle, setToggle] = useState(true);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Refresh data handler
  const { refetch } = useGetMeter();

  console.log(isModalOpen)

  const handleRefreshData = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
      toast.success("Data refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh data");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExportData = () => {
    const dataToExport = filteredData.map((meter) => ({
      "Meter No": meter.serial,
      Type: meter.type,
      Status: meter.status,
      "Price Per Unit": meter.price_per_unit,
      "Calibration Factor": meter.calibration_factor,
      "Last Updated": meter.created_at,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Meters");
    XLSX.writeFile(workbook, "meters_export.xlsx");
  };

  const handleToggleVisibility = (newState: boolean) => {
    // Implement your toggle logic here, e.g., filter visible columns
    console.log("Toggle state changed to:", newState);
    // Example: table.toggleAllColumnsVisible(newState);
  };

  useEffect(() => {
    if (data) {
      setMeters(data as MeterPayload[]);
      console.log(data);
    }
  }, [data]);

  // Define table columns
  const columns = React.useMemo<ColumnDef<MeterPayload>[]>(
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
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 20,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 10,
        cell: ({ getValue }: { getValue: () => any }) =>
          getValue() === "active" ? (
            <p className="text-green-600 font-medium">
              <FaCircleCheck />
            </p>
          ) : getValue() === "inactive" ? (
            <p className="text-red-600 font-medium">
              <FaCircleXmark />
            </p>
          ) : getValue() === "locked" ? (
            <>
              <button
                data-tooltip-target="tooltip-light"
                data-tooltip-style="light"
                type="button"
                className="text-red-600 font-medium"
              >
                <FaCircleStop />
              </button>
              <div
                id="tooltip-light"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 tooltip"
              >
                Tooltip content
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </>
          ) : null,
      },
      {
        header: "Action",
        cell: ({ row }: { row: any }) => (
          <div className="flex gap-4">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                setIsModalOpen("configure");
                setSelectedId(row.original.id);
              }}
            >
              <TbAdjustmentsCancel className="w-6 h-6" />
            </button>
            <button
              className="text-gray-500 hover:text-gray-700"
              // onClick={() => handleEdit(row.original)}
              onClick={() => {
                setIsModalOpen("jobs");
                setSelectedId(row.original.id);
              }}
            >
              <FiEye />
            </button>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                setIsModalOpen("delete");
                setSelectedId(row.original.id);
              }}
            >
              <FiTrash />
            </button>
          </div>
        ),
        size: 5,
      },
      {
        accessorKey: "serial",
        header: "Meter No",
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ getValue }: { getValue: any }) => (
          <span className="capitalize">{getValue()}</span>
        ),
      },
      {
        accessorKey: "phone",
        header: "SIM",
        cell: ({ getValue }: { getValue: any }) =>
          getValue() == null ? <p>No Simcard</p> : <p>{getValue()}</p>,
      },
      {
        accessorKey: "price_per_unit",
        header: "Price/Unit",
        cell: ({ getValue }: { getValue: any }) =>
          getValue() == null ? <p>Auto</p> : <p>{getValue()}</p>,
      },
      {
        accessorKey: "calibration_factor",
        header: "Calibration Factor",
        cell: ({ getValue }) => (getValue() === null ? "Self" : getValue()),
      },
      {
        accessorKey: "error",
        header: "Error",
        cell: ({ getValue }: { getValue: any }) => (
          <span
            className={`${
              getValue() === null
                ? "bg-blue-200 px-2 rounded-sm text-sm text-blue-600"
                : "text-red-600"
            } font-medium`}
          >
            {getValue() === null ? "NIL" : getValue()}
          </span>
        ),
      },
      {
        accessorKey: "lock_meter",
        header: "Locked",
        cell: ({ getValue }: { getValue: any }) => (
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={getValue()}
              readOnly
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            <span className="ms-3 text-sm font-medium text-gray-900"></span>
          </label>
        ),
      },

      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ getValue }: { getValue: any }) => {
          const date = new Date(getValue());
          return date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });
        },
      },
    ],
    []
  );

  const filteredData = React.useMemo(() => {
    return meters.filter(
      (meter) =>
        (!typeFilter || meter.type === typeFilter) &&
        (!statusFilter || meter.status === statusFilter) &&
        (!globalFilter ||
          meter.serial.toLowerCase().includes(globalFilter.toLowerCase()) ||
          meter.type.toLowerCase().includes(globalFilter.toLowerCase()))
    );
  }, [meters, typeFilter, statusFilter, globalFilter]);

  // Create the table instance using useReactTable
  const table = useReactTable({
    data: filteredData,
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

  // if (isFetching)
  //   return (
  //     <div>
  //       <div className="flex items-center justify-center h-screen">
  //         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
  //       </div>
  //     </div>
  //   );
  // if (isError)
  //   return <div className="">Failed to fetch Meters: {error.message}</div>;

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="flex flex-col gap-3 mb-4 w-full">
      {/* Filter Controls */}
      <div className="flex items-center gap-4 mb-4 ">
        {/* Status Filter */}
        <div>
          <button
            id="statusFilterButton"
            data-dropdown-toggle="statusFilter"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            Status: {statusFilter || "All"}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="statusFilter"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="statusFilterButton"
            >
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setStatusFilter("")}
                >
                  All
                </button>
              </li>
              {["active", "inactive", "locked"].map((status) => (
                <li key={status}>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white capitalize"
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <button
            id="typeFilterButton"
            data-dropdown-toggle="typeFilter"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            Type: {typeFilter || "All"}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="typeFilter"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="typeFilterButton"
            >
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setTypeFilter("")}
                >
                  All
                </button>
              </li>
              {["Token", "Card", "Direct"].map((type) => (
                <li key={type}>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setTypeFilter(type)}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search meters..."
            className="pl-8 p-2 w-full border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-4 space-x-2">
          <div className="text-gray-700 text-sm">
            Select {Object.keys(rowSelection).length} item
            {Object.keys(rowSelection).length !== 1 ? "s" : ""}
          </div>
          <div className="flex gap-2">
            {/* Toggle for Active/Inactive State */}
            <button
              onClick={() => {
                setToggle(!toggle);
                handleToggleVisibility(!toggle);
              }}
              className="text-xl"
              aria-label={toggle ? "Disable feature" : "Enable feature"}
            >
              {toggle ? (
                <FaToggleOn className="text-blue-600 hover:text-blue-700" />
              ) : (
                <FaToggleOff className="text-gray-400 hover:text-gray-500" />
              )}
            </button>

            {/* Refresh Data Button */}
            <button
              onClick={handleRefreshData}
              aria-label="Refresh data"
              disabled={isRefreshing}
            >
              <FaSync
                className={`text-gray-600 cursor-pointer hover:text-gray-700 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
            </button>

            {/* Export Data Button */}
            <button onClick={handleExportData} aria-label="Export data">
              <FaDownload className="text-gray-600 cursor-pointer hover:text-gray-700" />
            </button>

            {/* Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              aria-label="Open settings"
            >
              <FaCog className="text-gray-600 cursor-pointer hover:text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {!meters || meters.length === 0 ? (
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
              {table.getRowModel().rows.map((row: any) => (
                <tr key={row.id} className="hover:bg-gray-50">
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
      {isModalOpen === "delete" && (
        <DeleteModel
          // selectedId={selectedId}
          // setSelectedId={setSelectedId}
          // setIsModalOpen={setIsModalOpen}
          // setRowSelection={setRowSelection}
        />
      )}

      {isModalOpen === "jobs" && (
        <div
          id="drawer-right-example"
          className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800 ${
            isModalOpen === "jobs" ? "translate-x-0" : "translate-x-full"
          }`}
          tabIndex={-1}
          aria-labelledby="drawer-right-label"
        >
          <h5
            id="drawer-right-label"
            className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
          >
            <svg
              className="w-4 h-4 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            Logs
          </h5>

          <button
            type="button"
            onClick={() => setIsModalOpen("")}
            aria-controls="drawer-right-example"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <Jobs selectedId={selectedId} />
        </div>
      )}

      {isModalOpen === "configure" && (
        <section>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40" />
            <div className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
              <div className="bg-white rounded-md shadow-lg px-4 py-6">
                <div className="flex items-center justify-end">
                  <button
                  type="button"
                    onClick={() => setIsModalOpen("")}
                    className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <svg
                    className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M8 5.625c4.418 0 8-1.063 8-2.375S12.418.875 8 .875 0 1.938 0 3.25s3.582 2.375 8 2.375Zm0 13.5c4.963 0 8-1.538 8-2.375v-4.019c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353c-.193.081-.394.158-.6.231l-.189.067c-2.04.628-4.165.936-6.3.911a20.601 20.601 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244c-.053-.028-.113-.053-.165-.082v4.019C0 17.587 3.037 19.125 8 19.125Zm7.09-12.709c-.193.081-.394.158-.6.231l-.189.067a20.6 20.6 0 0 1-6.3.911 20.6 20.6 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244C.112 6.035.052 6.01 0 5.981V10c0 .837 3.037 2.375 8 2.375s8-1.538 8-2.375V5.981c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353Z" />
                  </svg>
                  <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                    Creating Configuration
                  </h3>
                  <div className="text-gray-500 dark:text-gray-400 mb-6">
                    Choosing the right server configuration solution is
                    essential for maintaining meter operation.
                    <p>{selectedId && <Setting serial={selectedId} />}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

