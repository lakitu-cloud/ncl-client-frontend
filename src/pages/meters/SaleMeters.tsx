import React, { useMemo, useState } from 'react';
import Header from '../../layout/navbar/Header';
import {
  FaCog,
  FaDownload,
  FaSearch,
  FaSync,
  FaToggleOff,
  FaToggleOn,
} from 'react-icons/fa';
import { FiEye, FiTrash } from 'react-icons/fi';
import { TbAdjustmentsCancel } from 'react-icons/tb';
import { toast } from 'react-toastify';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';

import { Meter, MeterPayload } from '../../types/meterTypes';
import { useGetMeter } from '../../hooks/useMeter';
import { FaCircleCheck, FaCircleStop, FaCircleXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { MeterListCards } from '../../components/card/meterListCards';

const SaleMeters = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [toggle, setToggle] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: meters = [], isFetching, isError, error, refetch } = useGetMeter();

  const handleRefreshData = async () => {
    try {
      await refetch();
      toast.success('Data refreshed successfully');
    } catch (err) {
      toast.error('Failed to refresh data');
    }
  };

  const columns = useMemo<ColumnDef<Meter>[]>(
    () => [
      {
        id: 'select',
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
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        cell: ({ getValue }) => {
          const value = getValue<string>();
          if (value === 'active')
            return <FaCircleCheck className="text-green-600 dark:text-green-800 text-xl" />;
          if (value === 'inactive')
            return <FaCircleXmark className="text-red-600 dark:text-red-800 text-xl" />;
          if (value === 'locked')
            return (
              <div className="relative group">
                <FaCircleStop className="text-red-600 dark:text-red-800 text-xl" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block px-3 py-2 text-sm bg-gray-900 text-white rounded-lg whitespace-nowrap z-10">
                  Meter is locked
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            );
          return null;
        },
      },
      {
        id: 'actions',
        header: 'Action',
        size: 150,
        enableSorting: false,
        cell: ({ row }) => {
          const meterId = row.original.id; // ← Safe access to the meter ID

          return (
            <div className="flex items-center gap-4">
              {/* Configure / Adjust */}
              <button
                type="button"
                className="text-gray-600 dark:text-whiteText hover:text-blue-600"
                // onClick={() => handleConfigure(meterId)}
                aria-label="Configure meter"
              >
                <TbAdjustmentsCancel className="w-5 h-5" />
              </button>

              {/* View Details – Navigates to dynamic route */}
              <Link to={`/manager/sales/meter/${meterId}`}>
                <button
                  type="button"
                  className="text-gray-600 dark:text-whiteText hover:text-blue-600"
                  aria-label="View meter details"
                >
                  <FiEye className="w-5 h-5" />
                </button>
              </Link>

              {/* Delete */}
              <button
                type="button"
                className="text-gray-600 dark:text-whiteText hover:text-red-600"
                // onClick={() => handleDelete(meterId)}
                aria-label="Delete meter"
              >
                <FiTrash className="w-5 h-5" />
              </button>
            </div>
          );
        },
      },
      { accessorKey: 'serial', header: 'Meter No' },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ getValue }) => <span className="capitalize">{getValue<string>()}</span>,
      },
      {
        accessorKey: 'phone',
        header: 'SIM',
        cell: ({ getValue }) => (getValue() ? getValue<string>() : <span className="text-gray-400">No Simcard</span>),
      },
      // {
      //   accessorKey: 'price_per_unit',
      //   header: 'Price/Unit',
      //   cell: ({ getValue }) => (getValue() != null ? getValue<number>() : <span className="text-gray-400">Auto</span>),
      // },
      {
        accessorKey: 'calibration_factor',
        header: 'Calibration Factor',
        cell: ({ getValue }) => (getValue() != null ? getValue() : 'Self'),
      },
      {
        accessorKey: 'error',
        header: 'Error',
        cell: ({ getValue }) => {
          const value = getValue<string | null>();
          return (
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${value === null ? 'bg-blue-100 text-blue-700' : 'text-red-600'
                }`}
            >
              {value || 'NIL'}
            </span>
          );
        },
      },
        {
          accessorKey: 'lock_meter',
          header: 'Locked',
          cell: ({ getValue }) => (
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={!!getValue()} readOnly />
              <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-1 after:left-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
            </label>
          ),
        },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ getValue }) => {
          const date = new Date(getValue<string>());
          return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });
        },
      },
    ],
    []
  );

  // Client-side filtering (fast & reliable)
  const data = useMemo(() => {
    if (!meters) return [];
    return meters.filter((meter: any) => {
      const matchesType = !typeFilter || meter.type === typeFilter;
      const matchesStatus = !statusFilter || meter.status === statusFilter;
      const matchesSearch =
        !globalFilter ||
        meter.serial?.toLowerCase().includes(globalFilter.toLowerCase()) ||
        meter.type?.toLowerCase().includes(globalFilter.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [meters, typeFilter, statusFilter, globalFilter]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    enableGlobalFilter: true,
  });

  return (
    <>
      <MeterListCards meters={meters} isLoading={isFetching} />

      <div className="flex flex-col gap-3 my-8 w-full">
        <div className="font-poppins mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Filters */}
          <div className="flex items-center gap-4">
            {/* Status & Type Filters (simplified – you can use Flowbite dropdown with init if needed) */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-sm px-4 py-2 dark:bg-blackText dark:text-whiteText dark:border-gray-600 dark:hover:bg-darkTheme dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="locked">Locked</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-sm px-4 py-2 dark:bg-blackText dark:text-whiteText dark:border-gray-600 dark:hover:bg-darkTheme dark:hover:border-gray-700 dark:focus:ring-gray-700"
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
              placeholder="Search meters..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 p-2 w-full border rounded dark:bg-blackText dark:hover:bg-darkTheme dark:border-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-whiteText">
              {Object.keys(rowSelection).length} selected
            </span>
{/* 
            <button onClick={() => setToggle(!toggle)}>
              {toggle ? <FaToggleOn className="text-blue-600 dark:text-whiteText text-2xl" /> : <FaToggleOff className="text-gray-400 text-2xl" />}
            </button>

            <button onClick={handleRefreshData} disabled={isFetching}>
              <FaSync className={`dark:text-whiteText text-xl ${isFetching ? 'animate-spin' : ''}`} />
            </button>

            <button><FaDownload className="text-xl dark:text-whiteText" /></button>
            <button><FaCog className="text-xl dark:text-whiteText" /></button> */}
          </div>
        </div>

        {/* Table */}
        {isFetching && !meters.length ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading meters...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-semibold text-gray-600">No meters found</p>
            <p className="text-sm text-gray-500">Try adjusting filters or add new meters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md ">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 dark:bg-blackText border-b-2 dark:border-whiteText">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-whiteText uppercase tracking-wider"
                        style={{ width: header.getSize() }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white dark:bg-blackText divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-darkTheme">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-3 text-sm text-gray-800 dark:text-whiteText">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination (optional – add controls if needed) */}
      </div>
    </>
  );
};

export default SaleMeters;