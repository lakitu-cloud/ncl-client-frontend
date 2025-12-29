// src/pages/MetersPage.tsx
import React, { useMemo, useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  FaSearch,
  FaSync,
  FaDownload,
  FaCog,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { FiEye, FiTrash } from "react-icons/fi";
import { TbAdjustmentsCancel } from "react-icons/tb";
import { FaCircleCheck, FaCircleXmark, FaCircleStop, FaChevronDown } from "react-icons/fa6";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { format } from "date-fns";

import { useGetAllMeter } from "../../hooks/useMeter";
import type { Meter } from "../../types/meterTypes";
import DeleteModel from "../../components/modal/deleteModel";
import Jobs from "./Jobs";
import Setting from "./Setting";
import { Link } from "react-router-dom";

export default function ZoneMeters() {
  const { data: meters = [], isLoading, isError, error, refetch } = useGetAllMeter();

  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [isModalOpen, setIsModalOpen] = useState<"delete" | "jobs" | "configure" | "">("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Real dropdown state (no Flowbite needed)
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      toast.success("Meters refreshed successfully");
    } catch {
      toast.error("Failed to refresh meters");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExport = () => {
    const exportData = table.getFilteredRowModel().rows.map((row) => row.original);
    const worksheet = XLSX.utils.json_to_sheet(
      exportData.map((m) => ({
        "Serial No": m.serial,
        Type: m.type,
        Status: m.status,
        Description: m.description,
        "Installed At": format(new Date(m.installedAt), "dd MMM yyyy, HH:mm"),
        Locked: m.lock ? "Yes" : "No",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Meters");
    XLSX.writeFile(workbook, `meters_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
    toast.success("Exported successfully");
  };

  const columns = useMemo<ColumnDef<Meter>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="w-4 h-4 rounded border-gray-300 dark:bg-blackText dark:border-gray-700"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4 rounded border-gray-300"
          />
        ),
        size: 2,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue() as string;
          return (
            <div className="flex justify-start">
              {status === "active" && <FaCircleCheck className="text-green-600 text-lg" />}
              {status === "inactive" && <FaCircleXmark className="text-red-600 text-lg" />}
              {status === "locked" && <FaCircleStop className="text-orange-600 text-lg" />}
            </div>
          );
        },
        size: -10,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedId(row.original.id);
                setIsModalOpen("configure");
              }}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              title="Configure"
            >
              <TbAdjustmentsCancel size={20} />
            </button>
            <button
              onClick={() => {
                setSelectedId(row.original.id);
                setIsModalOpen("jobs");
              }}
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600"
              title="View Jobs"
            >
              <FiEye size={18} />
            </button>

            <button
              onClick={() => {
                setSelectedId(row.original.id);
                setIsModalOpen("delete");
              }}
              className="text-gray-600 dark:text-gray-400 hover:text-red-600"
              title="Delete"
            >
              <FiTrash size={18} />
            </button>
          </div>
        ),
        size: 2,
      },
      {
        accessorKey: "serial",
        header: "Serial No",
        cell: ({ row }) => {
          const serial = row.original.serial;
          const id = row.original.id;

          return (
            <Link
              to={`/manager/zone/meter/${id}`}
              className="font-oswald font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              onClick={(e) => e.stopPropagation()} // Prevent row click if you add it later
            >
              {serial}
            </Link>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => (
          <p className="max-w-xs truncate dark:text-whiteText font-poppins text-nowrap text-md font-semibold" title={getValue() as string}>
            {getValue() as string}
          </p>
        ),
        size: 600

      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ getValue }) => <span className="uppercase font-bold dark:text-whiteTex dark:text-whiteText text-sm">{getValue() as string}</span>,
      },

      {
        accessorKey: "lock",
        header: "Locked",
        cell: ({ getValue }) => (
          <div className="flex justify-start">
            {getValue() ? (
              <FaToggleOn className="text-red-600 text-2xl w-8" />
            ) : (
              <FaToggleOff className="text-blue-600 text-2xl w-8" />
            )}
          </div>
        ),
      },
      {
        accessorKey: "installedAt",
        header: "Installed At",
        cell: ({ getValue }) => {
          return (
            <span className="dark:text-whiteText font-poppins">
              {format(new Date(getValue() as string), "dd MMM yyyy, HH:mm")}
            </span>
          )
        }

      },
    ],
    []
  );

  const table = useReactTable({
    data: meters,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      columnFilters: [
        ...(statusFilter ? [{ id: "status", value: statusFilter }] : []),
        ...(typeFilter ? [{ id: "type", value: typeFilter }] : []),
      ],
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedCount = Object.keys(rowSelection).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-600">
        Error: {(error as Error)?.message}
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6 w-full">

      <div className="flex flex-wrap items-center justify-between gap-4 max-w-full"  >

        <div className="flex space-x-4 mr-4">

          {/* Status Filter */}
          <div className="relative">
            <button
              // onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
              className="inline-flex items-center text-gray-500 bg-white border dark:bg-blackText dark:text-whiteText font-poppins dark:border-gray-700 border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-sm px-4 py-2 transition"
            >
              Status: {statusFilter || "All"} <FaChevronDown className="ml-2 w-3 h-3" />
            </button>
            {openStatusDropdown && (
              <div className="absolute top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 w-44">
                <ul className="py-2 text-sm text-gray-700">
                  {["", "active", "inactive", "locked"].map((status) => (
                    <li key={status || "all"}>
                      <button
                        onClick={() => {
                          setStatusFilter(status);
                          setOpenStatusDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 capitalize"
                      >
                        {status || "All"}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Type Filter */}
          <div className="relative">
            <button
              // onClick={() => setOpenTypeDropdown(!openTypeDropdown)}
              className="inline-flex items-center text-gray-500 bg-white border dark:bg-blackText dark:text-whiteText font-poppins dark:border-gray-700 border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-sm px-4 py-2 transition"
            >
              Type: {typeFilter || "All"} <FaChevronDown className="ml-2 w-3 h-3" />
            </button>
            {openTypeDropdown && (
              <div className="absolute top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 w-44">
                <ul className="py-2 text-sm text-gray-700">
                  {["", "Token", "Card", "Direct"].map((type) => (
                    <li key={type || "all"}>
                      <button
                        onClick={() => {
                          setTypeFilter(type);
                          setOpenTypeDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {type || "All"}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Search */}
        <div className="flex-1 relative max-w-auto mr-24">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " />
          <input
            type="text"
            placeholder="Search meters..."
            value={globalFilter}
            // onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-12 pr-4 py-2 w-full border border-gray-300 font-poppins rounded-md dark:bg-blackText dark:border-gray-700 dark:text-whiteText focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-6">
          <button
            // onClick={() => setToggle(!toggle)}
            className="text-xl transition"
            title={toggle ? "Hide inactive" : "Show all"}
          >
            {toggle ? <FaToggleOn className="text-blue-600 text-md dark:text-white text-lg" /> : <FaToggleOff className="text-gray-400 dark:text-gray-600 text-lg" />}
          </button>

          <button
            // onClick={handleRefresh} 
            disabled={isRefreshing}
            className="text-gray-600 hover:text-gray-800">
            <FaSync className={`text-lg dark:text-white ${isRefreshing ? "animate-spin" : ""}`} />
          </button>

          <button onClick={handleExport} className="text-gray-600 hover:text-gray-800">
            <FaDownload className="text-lg dark:text-white" />
          </button>

          <button onClick={() => setIsSettingsOpen(true)} className="text-gray-600 hover:text-gray-800">
            <FaCog className="text-lg dark:text-white " />
          </button>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white dark:bg-darkTheme rounded-md shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-600">
            <thead className="bg-gray-50 dark:bg-blackText/20">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-500 dark:text-whiteText uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white dark:bg-darkTheme divide-y divide-gray-600 max-h-lg">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-20 text-gray-500 dark:text-gray-400">
                    <div className="space-y-3">
                      <p className="text-xl font-medium">No meters found</p>
                      <p className="text-sm">Try adjusting filters or refresh the data</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-darkTheme">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-sm text-gray-900 dark:gray-200">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 dark:bg-blackText/20 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 dark:text-whiteText">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Next
            </button>

            {/* FIXED: Safe page display */}
            <span className="text-sm text-gray-600 dark:text-gray-300 mx-4">
              Page{" "}
              <strong>
                {table.getPageCount() === 0
                  ? 0
                  : table.getState().pagination.pageIndex + 1}
              </strong>{" "}
              of <strong>{Math.max(1, table.getPageCount())}</strong>
            </span>
          </div>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="text-sm max-w-md border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-blackText focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modals */}
      {/* {isModalOpen === "delete" && selectedId && (
        <DeleteModel
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setIsModalOpen={setIsModalOpen}
          setRowSelection={setRowSelection}
        />
      )} */}

      {/* {isModalOpen === "jobs" && selectedId && (
        <Jobs selectedId={selectedId} onClose={() => setIsModalOpen("")} />
      )} */}

      {/* {isModalOpen === "configure" && selectedId && (
        <Setting serial={selectedId} onClose={() => setIsModalOpen("")} />
      )} */}
    </div>
  );
}