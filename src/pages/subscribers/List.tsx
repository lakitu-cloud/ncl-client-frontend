// src/components/pages/SubscriberTable.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FiEdit, FiPlusSquare, FiTrash } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useGetSubs, useAssignSub, useDeleteSubs } from "../../hooks/useSubscriber";
import { useQueryClient } from "@tanstack/react-query";
import AddSubscriberModal from "../../components/modal/addSubscriberModal";
import { SubscriberPayload } from "../../types/subscriberTypes";
import DeleteModalSubs from "../../components/modal/deleteModalSubs";

export function SubscriberTable() {

  // React Query data
  const { data = [], isPending } = useGetSubs(); // data is now the array directly
  const { mutate: assignMutate } = useAssignSub();
  const deleteSubscriber = useDeleteSubs();

  // UI state
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [assignMeter, setAssignMeter] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [serial, setSerial] = useState<string>("");

  // Delete state
  const [subscriberToDelete, setSubscriberToDelete] = useState<{ id: string; name: string } | null>(null);

  // Filters effect
  useEffect(() => {
    const filters: ColumnFiltersState = [];
    if (statusFilter) filters.push({ id: "status", value: statusFilter });
    if (typeFilter) filters.push({ id: "type", value: typeFilter });
    setColumnFilters(filters);
  }, [statusFilter, typeFilter]);

  // Columns definition (clean, performant, memoized)
  const columns = useMemo<ColumnDef<SubscriberPayload>[]>(
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
        size: 50,
        enableSorting: false,
      },
     
      {
        header: "Action",
        size: 100,
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <button
              className="text-blue-600 hover:text-blue-800 transition-colors"
              onClick={() => {
                setSelectedId(row.original.id);
                setAssignMeter(true);
              }}
              title="Assign Meter"
            >
              <FiPlusSquare size={18} />
            </button>
            <button
              className="text-red-600 hover:text-red-800 transition-colors"
              onClick={() => {
                setSubscriberToDelete({
                  id: row.original.id,
                  name: row.original.name,
                });
              }}
              title="Delete Subscriber"
            >
              <FiTrash size={18} />
            </button>
            <button className="text-yellow-600 hover:text-yellow-800 transition-colors opacity-50" title="Edit (soon)">
              <FiEdit size={18} />
            </button>
          </div>
        ),
      },

      {
        accessorKey: "name",
        header: "Name",
        size: 180,
      },
       {
        id: "profile",
        header: "Profile",
        size: 80,
        enableSorting: false,
        cell: ({ row }) => {
          const profile = row.original.profile?.trim();
          const name = row.original.name || "Unknown";
          const initials =
            name
              .split(" ")
              .map((n) => n[0])
              .filter(Boolean)
              .slice(0, 2)
              .join("")
              .toUpperCase() || "NA";

          if (!profile) {
            return (
              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                  {initials}
                </div>
              </div>
            );
          }

          return (
            <div className="flex justify-center">
              <img
                src={profile}
                alt={`${name}'s profile`}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                loading="lazy"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  const fallback = img.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="hidden w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-semibold">
                {initials}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "ref",
        header: "Ref No.",
        size: 120,
        cell: ({ getValue }) => <span className="font-mono text-sm">{getValue() as string }</span>,
      },

      {
        id: "serial",
        header: "Meter Number",
        size: 150,
        cell: ({ row }) => {
          const meters = row.original.meters || [];
          if (meters.length === 0) return <span className="text-gray-500 text-sm">No meter</span>;
          return (
            <div className="flex flex-wrap gap-1">
              {meters.map((m) => (
                <span key={m.id} className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {m.serial}
                </span>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 100,
        cell: ({ getValue }) => <span className="capitalize font-medium">{getValue() as string}</span>,
      },
      {
        accessorKey: "balance",
        header: "Balance",
        size: 120,
        cell: ({ getValue }) => `TZS ${Number(getValue()).toLocaleString()}`,
      },
            {
        accessorKey: "status",
        header: "Status",
        size: 80,
        cell: ({ getValue }) => (
          <FaCircleCheck
            className={`text-xl ${getValue() === "active" ? "text-green-600" : "text-red-600"}`}
          />
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        size: 160,
        cell: ({ getValue }) => getValue() || "—",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 140,
        cell: ({ getValue }) => {
          const date = new Date(getValue() as string);
          return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter,
      columnFilters,
    },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 overflow-x-auto">
      {/* Header: Filters + Search + Add Button */}
      <div className="font-poppins mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="locked">Locked</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            <option value="">All Types</option>
            <option value="Token">Token</option>
            <option value="Card">Card</option>
            <option value="Direct">Direct</option>
          </select>
        </div>

        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search subscribers..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8 p-2 w-full border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-oswald text-sm px-4 py-2 rounded-md"
        >
          <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add Subscriber
        </button>
      </div>

      {/* Loading / Empty / Table */}
      {isPending ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-center">
          <div>
            <p className="text-lg font-semibold text-gray-600">No subscribers found</p>
            <p className="text-sm text-gray-500">Add one using the button above.</p>
          </div>
        </div>
      ) : (
        <table className="w-full table-auto">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100 font-oswald text-md uppercase">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 text-left text-sm font-medium text-gray-600" style={{ width: header.column.columnDef.size }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={`hover:bg-gray-50 ${row.getIsSelected() ? "bg-blue-50" : ""}`}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 text-md font-oswald text-gray-800" style={{ width: cell.column.columnDef.size }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            {"<<"}
          </button>
          <button className="px-3 py-1.5 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            {"<"}
          </button>
          <button className="px-3 py-1.5 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            {">"}
          </button>
          <button className="px-3 py-1.5 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            {">>"}
          </button>
        </div>
        <span className="text-sm text-gray-700">
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of <strong>{table.getPageCount()}</strong>
        </span>
        <select
          className="pl-3 pr-8 py-1.5 border rounded-md text-sm"
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

      {/* Modals */}
      {isAddModalOpen && <AddSubscriberModal IsAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />}

      {/* Generic Delete Modal (shared with managers) */}
      {subscriberToDelete && (
        <DeleteModalSubs
          title="Delete Subscriber"
          name={subscriberToDelete.name}
          warning="This action cannot be undone and will remove all associated data."
          isPending={deleteSubscriber.isPending}
          onConfirm={() => {
            deleteSubscriber.mutate(subscriberToDelete.id, {
              onSuccess: () => setSubscriberToDelete(null),
              onError: () => setSubscriberToDelete(null),
            });
          }}
          onClose={() => setSubscriberToDelete(null)}
        />
      )}
    </div>
  );
}