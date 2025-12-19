// src/components/transactions/Table.tsx
import React, { useEffect, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FiEdit, FiSettings, FiTrash } from 'react-icons/fi';
import { useFetchTxs } from '../../hooks/useTxs';
import { TransactionPayload } from '../../types/tsxTypes';
import { IoBusiness } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';

export function Table() {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [typeFilter, setTypeFilter] = useState("");


  const { data = [], isPending, isError } = useFetchTxs();

  const handleEdit = (transaction: TransactionPayload) => {
    console.log('Edit transaction:', transaction);
    // TODO: Open modal or navigate to edit page
  };

  const columns = React.useMemo<ColumnDef<TransactionPayload>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="size-4 rounded border-gray-300"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="size-4 rounded border-gray-300"
          />
        ),
        meta: { align: 'center' },
        size: 50,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <div className="flex items-center gap-3">
              <div
                className={`size-3 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                aria-label={status}
              />
              <button
                onClick={() => handleEdit(row.original)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Settings"
              >
                <FiSettings className="size-4" />
              </button>
              <button
                className="text-gray-600 hover:text-red-600 transition-colors"
                aria-label="Delete"
              // onClick={() => handleDelete(row.original.id)}
              >
                <FiTrash className="size-4" />
              </button>
            </div>
          );
        },
        size: 140,
        meta: { align: 'center' },
      },
      { accessorKey: 'receipt', header: 'Receipt ID', size: 180 },
      { accessorKey: 'serial', header: 'Serial', size: 140 },
      {
        accessorKey: 'units',
        header: 'Units',
        cell: ({ getValue }) => `${getValue()} UNITS`,
        size: 100,
        meta: { align: 'right' },
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        // cell: ({ getValue }) => {
        //   const value = getValue() as number; // explicit cast – safe because amount is number in your data
        //   return `TZS ${value.toLocaleString()}`;
        // },
        size: 130,
        meta: { align: 'right' },
      },
      { accessorKey: 'token', header: 'Token', size: 220 },
      { accessorKey: 'phone', header: 'Phone', size: 150 },
      {
        accessorKey: 'method',
        header: 'Method',
        cell: ({ getValue }) => {
          const value = getValue() as string | null | undefined;
          return value ? value.toUpperCase() : '-';
        },
        size: 120,
        meta: { align: 'center' },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ getValue }) => {
          const date = new Date(getValue() as string);
          return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        },
        size: 170,
      },
    ],
    []
  );

  useEffect(() => {
    const filters: ColumnFiltersState = [];
    if (statusFilter) filters.push({ id: "status", value: statusFilter });
    if (typeFilter) filters.push({ id: "type", value: typeFilter });
    setColumnFilters(filters);
  }, [statusFilter, typeFilter]);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 20 },
    },
  });

  if (isPending) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center justify-center text-red-600">Failed to load transactions</div>;
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <IoBusiness className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-lg">No sales transactions yet.</p>
        <p>Create your first manager to get started!</p>
      </div>
    )
  }

  const selectedCount = table.getSelectedRowModel().rows.length;

  return (
    <div className="space-y-4 p-4">
      {/* Header: Filters + Search + Add Button */}
      <div className="font-poppins mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-blackText dark:text-whiteText "
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="locked">Locked</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-blackText dark:text-whiteText "
          >
            <option value="">All Types</option>
            <option value="Token">Token</option>
            <option value="Card">Card</option>
            <option value="Direct">Direct</option>
          </select>
        </div>

        <div className="relative flex-1 min-w-auto text-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search transactions: Meter, Type, Method etc"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="px-12 py-1.5 w-full border rounded dark:bg-blackText border-gray-700 dark:text-white"
          />
        </div>


      </div>

      <table className='w-full table-auto'>
        <thead>
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

    </div>
  );
}