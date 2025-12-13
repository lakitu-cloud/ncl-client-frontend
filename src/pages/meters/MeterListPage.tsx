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

export default function MetersPage() {
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
            className="w-4 h-4 rounded border-gray-300"
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
            <div className="flex justify-center">
              {status === "active" && <FaCircleCheck className="text-green-600 text-lg" />}
              {status === "inactive" && <FaCircleXmark className="text-red-600 text-lg" />}
              {status === "locked" && <FaCircleStop className="text-orange-600 text-lg" />}
            </div>
          );
        },
        size: 2,
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
              className="text-gray-600 hover:text-blue-600"
              title="Configure"
            >
              <TbAdjustmentsCancel size={20} />
            </button>
            <button
              onClick={() => {
                setSelectedId(row.original.id);
                setIsModalOpen("jobs");
              }}
              className="text-gray-600 hover:text-indigo-600"
              title="View Jobs"
            >
              <FiEye size={18} />
            </button>
            <button
              onClick={() => {
                setSelectedId(row.original.id);
                setIsModalOpen("delete");
              }}
              className="text-gray-600 hover:text-red-600"
              title="Delete"
            >
              <FiTrash size={18} />
            </button>
          </div>
        ),
        size: 5,
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
        accessorKey: "type",
        header: "Type",
        cell: ({ getValue }) => <span className="capitalize">{getValue() as string}</span>,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => (
          <p className="max-w-xs truncate" title={getValue() as string}>
            kdjskdjksjdksjd
          </p>
        ),
      },
      {
        accessorKey: "lock",
        header: "Locked",
        cell: ({ getValue }) => (
          <div className="flex justify-center">
            {getValue() ? (
              <FaToggleOn className="text-red-600 text-2xl" />
            ) : (
              <FaToggleOff className="text-gray-400 text-2xl" />
            )}
          </div>
        ),
      },
      {
        accessorKey: "installedAt",
        header: "Installed At",
        cell: ({ getValue }) =>
          format(new Date(getValue() as string), "dd MMM yyyy, HH:mm"),
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
    <div className="p-6 space-y-6 w-full">

      <div className="flex flex-wrap items-center gap-4 max-w-full"  >
        {/* Status Filter */}
        <div className="relative">
          <button
            // onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 transition"
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

        <div className="grid grid-flow-col gap-x-4 max-w-full ">
          {/* Type Filter */}
          <div className="relative">
            <button
              // onClick={() => setOpenTypeDropdown(!openTypeDropdown)}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 transition"
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

          {/* Search */}
          <div className="flex-1 relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search meters..."
              value={globalFilter}
              // onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">


            <div className="flex items-center gap-3">
              <button
                // onClick={() => setToggle(!toggle)}
                className="text-xl transition"
                title={toggle ? "Hide inactive" : "Show all"}
              >
                {toggle ? <FaToggleOn className="text-blue-600" /> : <FaToggleOff className="text-gray-400" />}
              </button>

              <button
                // onClick={handleRefresh} 
                disabled={isRefreshing}
                className="text-gray-600 hover:text-gray-800">
                <FaSync className={`text-xl ${isRefreshing ? "animate-spin" : ""}`} />
              </button>

              <button onClick={handleExport} className="text-gray-600 hover:text-gray-800">
                <FaDownload className="text-xl" />
              </button>

              <button onClick={() => setIsSettingsOpen(true)} className="text-gray-600 hover:text-gray-800">
                <FaCog className="text-xl" />
              </button>
            </div>
          </div>
        </div>


      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow ring-1 ring-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-12 text-gray-500">
                    No meters found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-sm text-gray-900">
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
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
            <span className="text-sm text-gray-600">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
          </div>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="text-sm border rounded px-2 py-1"
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