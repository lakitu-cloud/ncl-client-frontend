// src/pages/TransactionsPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FaSearch, FaChevronUp, FaChevronDown, FaCog, FaSyncAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useFetchTxs } from '../../hooks/useTxs';
import { TransactionPayload } from '../../types/tsxTypes';
import { formatSafeDate } from '../../lib/date';
import { IoCopyOutline } from 'react-icons/io5';

const TransactionsPage: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [methodFilter, setMethodFilter] = useState<string>('');
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { data: transactions = [], isPending, isError } = useFetchTxs();

  const totalRevenue = useMemo(
    () => transactions.reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  );

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

  useEffect(() => {
    const saved = localStorage.getItem('transactions-column-visibility');
    if (saved) {
      setColumnVisibility(JSON.parse(saved));
    }
  }, []);

  const columns = useMemo<ColumnDef<TransactionPayload>[]>(
    () => [
      {
        accessorKey: 'receipt',
        header: ({ column }) => (
          <SortableHeader column={column}>Receipt</SortableHeader>
        ),
        cell: ({ row }) => (
          <div className="font-poppins text-black text-sm font-semibold">{row.original.receipt}</div>
        ),
      },
      {
        accessorKey: 'serial',
        header: 'Meter Serial',
        cell: ({ row }) => <span className="font-medium">{row.original.serial}</span>,
      },
      {
        accessorKey: 'method',
        header: 'Method',
        cell: ({ row }) => (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {row.original.method}
          </span>
        ),
      },
      {
        accessorKey: 'units',
        header: 'Units (m³)',
        cell: ({ row }) => (
          <div className="text-start font-medium">{row.original.units}</div>
        ),
      },
      {
        accessorKey: 'amount',
        header: 'Amount (TSH)',
        cell: ({ row }) => (
          <div className="text-start font-bold text-green-600">
            {row.original.amount}
          </div>
        ),
      },
      {
        accessorKey: 'token',
        header: 'Token',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <code className="text-xs font-popping bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {row.original.token}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(row.original.token);
                toast.success('Token copied!', { autoClose: 1500 });
              }}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              <IoCopyOutline className="ml-2 text-gray-600 w-4 h-4 hover:text-gray-400"
                onClick={() => handleCopyToken(row.original.token)} />
            </button>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const isActive = row.original.status === 'active';
          return (
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${isActive
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
            >
              {isActive ? 'Active' : 'Inactive'}
            </span>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <SortableHeader column={column}>Date & Time</SortableHeader>
        ),
        cell: ({ row }) => <span>{formatSafeDate(row.original.createdAt)}</span>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: transactions,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  });

  const uniqueMethods = useMemo(() => {
    const methods = [...new Set(transactions.map((tx) => tx.method))];
    return methods.sort();
  }, [transactions]);

  const SortableHeader: React.FC<{ column: any; children: React.ReactNode }> = ({
    column,
    children,
  }) => (
    <button
      className="flex items-center gap-1 font-medium hover:text-indigo-600"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {children}
      {column.getIsSorted() === 'asc' ? (
        <FaChevronUp className="w-4 h-4" />
      ) : column.getIsSorted() === 'desc' ? (
        <FaChevronDown className="w-4 h-4" />
      ) : null}
    </button>
  );

  return (

    <div className="p-8 max-w-full">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-oswald uppercase text-gray-900 dark:text-white">
            All Transactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 font-poppins">
            Complete history of token purchases and payments
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">
            TSH {totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

  {/* Controls Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 items-center">
          {/* Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => {
              setMethodFilter(e.target.value);
              table.getColumn('method')?.setFilterValue(e.target.value || undefined);
            }}
            className="px-4 py-2.5 border font-poppins border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">All Methods</option>
            {uniqueMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>

          {/* Global Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search transactions..."
              className="pl-12 pr-4 py-2.5 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Refresh */}
          <button
            // onClick={() => refetch()}
            className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            title="Refresh"
          >
            <FaSyncAlt className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              title="Column settings"
            >
              <FaCog className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10 hidden group-focus-within:block hover:block">
              <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                Show / Hide Columns
              </div>
              {table.getAllColumns().map((column) => {
                if (!column.getCanHide()) return null;
                return (
                  <label
                    key={column.id}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={(e) => column.toggleVisibility(!!e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-poppins">
                      {(column.columnDef.header as any)?.props?.children || column.id}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
        {transactions.length === 0 ? (
          <>
            <div className="p-8 text-center">
              <p className="text-gray-500 uppercase font-oswald text-lg">
                No transactions found
              </p>
            </div>
          </>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 uppercase text-xs font-medium text-gray-600 dark:text-gray-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-4 text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between text-sm">
        <div className="text-gray-600 dark:text-gray-400">
          Showing {table.getRowModel().rows.length} of {transactions.length} transactions
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-5 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-5 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;