// src/components/WakalaTable.tsx (updated)
import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FiPlusSquare, FiTrash } from 'react-icons/fi';
import { FaCircleCheck } from 'react-icons/fa6';
import { Spinner } from '../../components/Spinner';
import { AiOutlinePlus } from 'react-icons/ai';
import { useWakalas, useDeleteWakala, useAddFloatToWakala } from '../../hooks/useWakala';
import { WakalaData } from '../../types/wakalaType';
import AddWakalaModal from '../../components/modal/addWakalaModel';

interface Wakala {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string; // Assuming lowercase like 'active'
  imei: string;
  password: string;
  float?: number;
  createdAt: string;
}

export function WakalaTable() {
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen ] = React.useState(false)
  const [float, setFloat] = React.useState<number>(0);
  const [showAddFloat, setShowAddFloat] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const { data: wakalas = [], isPending: isLoading, isError } = useWakalas();
  const deleteWakala = useDeleteWakala();
  const addFloatMutation = useAddFloatToWakala();

  const handleDelete = () => {
    if (selectedId) {
      deleteWakala.mutate(selectedId, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  const handleAddFloatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!float || float <= 0 || !selectedId) {
      return;
    }
    addFloatMutation.mutate({ id: selectedId, float }, {
      onSuccess: () => {
        setShowAddFloat(false);
        setFloat(0);
        setSelectedId(null);
      },
    });
  };

  const columns = React.useMemo<ColumnDef<WakalaData>[]>(() => [
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
      size: 2,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 10,
      cell: ({ getValue }) => (
        <FaCircleCheck
          className={`${
            getValue<string>().toLowerCase() === 'active' ? 'text-green-600' : 'text-red-600'
          } font-medium`}
        />
      ),
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              // setSelectedId(row.original.id);
              setShowAddFloat(true);
            }}
          >
            <FiPlusSquare />
          </button>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => {
              // setSelectedId(row.original.id);
              setIsModalOpen(true);
            }}
          >
            <FiTrash />
          </button>
        </div>
      ),
      size: 100,
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'imei',
      header: 'Device',
    },
    {
      accessorKey: 'float',
      header: 'Float',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      size: 150,
      cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
    },
  ], []);

  const filteredData = React.useMemo(() => {
    return wakalas.filter((item: any) =>
      statusFilter ? item.status.toLowerCase() === statusFilter.toLowerCase() : true
    );
  }, [wakalas, statusFilter]);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error loading wakalas.</div>;
  }

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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        {showAddFloat && (
          <form
            onSubmit={handleAddFloatSubmit}
            className={`flex gap-2 items-center transition-all duration-500 ${
              showAddFloat ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
            }`}
          >
            {addFloatMutation.isError && (
              <p className="text-red-500">{addFloatMutation.error?.message}</p>
            )}
            <input
              type="number"
              id="float"
              aria-label="float"
              name="float"
              value={float}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setFloat(isNaN(value) ? 0 : value);
              }}
              className={`p-2 shadow border transition-all duration-500 ${
                showAddFloat ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
              }`}
              placeholder="Enter float amount"
              min="0"
              step="0.01"
            />
            <button
              type="submit"
              className={`bg-blue-600 font-oswald text-md text-white py-2 px-4 rounded-md hover:bg-blue-500 flex items-center justify-center transition-all duration-500 ${
                showAddFloat ? 'opacity-100 translate-x-0' : 'opacity-0'
              }`}
              disabled={addFloatMutation.isPending}
            >
              {addFloatMutation.isPending ? (
                <span className="flex items-center">
                  <Spinner />
                  adding...
                </span>
              ) : (
                <span className="flex items-center">
                  <AiOutlinePlus className="mr-2" /> Add Float
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddFloat(false);
                setSelectedId(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </form>
        )}

         <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-oswald text-sm px-4 py-2 rounded-md"
        >
          <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add Wakala
        </button>
      </div>

      <table className="w-full table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100 p-2 rounded-lg font-oswald text-md uppercase">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 text-left text-sm font-medium text-gray-600"
                  style={{ width: header.column.columnDef.size }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`hover:bg-gray-50 ${row.getIsSelected() ? 'bg-blue-50' : ''}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-2 text-md font-oswald text-gray-800"
                  style={{ width: cell.column.columnDef.size }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && <AddWakalaModal IsAddModalOpen={isCreateModalOpen} setIsAddModalOpen={setIsCreateModalOpen} />}

      {isModalOpen && (
        <div
          id="deleteModal"
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md h-auto bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="p-4 text-center">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedId(null);
                }}
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
              <p className="mb-4 text-gray-500">Are you sure you want to delete this item?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedId(null);
                  }}
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                >
                  No, cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  disabled={deleteWakala.isPending}
                >
                  {deleteWakala.isPending ? 'Deleting...' : "Yes, I'm sure"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <select
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
  );
}