import React, { useState, HTMLProps, useEffect } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { FiEdit, FiPlusSquare, FiTrash } from 'react-icons/fi';
import { FaCircleCheck } from 'react-icons/fa6';
import { Spinner } from '../../components/Spinner';
import { AiOutlinePlus } from 'react-icons/ai';
import { PopupAlert } from '../../components/Alert';
import { baseUrl } from '../../config/urls';

interface Wakala {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  imei: string;
  password: string;
  float?: number;
  createdAt: string;
}

export function WakalaTable() {
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [float, setFloat] = React.useState<number>(0);
  const [addFloat, setAddFloat] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [wakala, setWakala] = React.useState<Wakala[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}wakala/${deleteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSuccessMessage('Wakala created successfully!');
        setDeleteId(null);
        setIsModalOpen(false);
      } else {
        setErrorMessage(data.message || 'Failed to create wakala.');
      }

    } catch (err: any) {
      console.error(err.message);
      setErrorMessage(err.message || 'An error occurred.');
    } finally {
      setIsModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async () => {
    if (!float || float === null) {
      setErrorMessage('Please enter a float value.');
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://unwilling-leontine-products-6889bcfb.koyeb.app/api/backend/wakala/${deleteId}/float`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ float }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSuccessMessage('update float successfully!');
        setDeleteId(null);
        setAddFloat(false)
        setIsSubmitting(false);
      } else {
        setErrorMessage(data.message || 'Failed to update float.');
      }

      const result = await response.json();
      console.log(result);
      setDeleteId(null);
      setFloat(0);
      setAddFloat(false);
    } catch (err: any) {
      console.error(err.message);
    }
    finally {
      setAddFloat(false)
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://unwilling-leontine-products-6889bcfb.koyeb.app/api/backend/wakala/', {
          method: 'GET',
          credentials: 'include',
        });

        const result = await response.json();

        setWakala(result.data);
        setErrorMessage(null);
      } catch (err: any) {
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo<ColumnDef<Wakala>[]>(() => [
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
      size: 10, // Adjust width
      cell: ({ getValue }: { getValue: any }) => (

        <FaCircleCheck className={`${getValue() === 'active'
          ? 'text-green-600'
          : 'text-red-600'
          } font-medium`} />
      ),
    },
    {
      header: 'Action',
      cell: ({ row }: { row: any }) => (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              setDeleteId(row.original.id);
              setAddFloat(true)
            }
            }
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
      accessorKey: 'created_at',
      header: 'Created At',
      size: 150,
      cell: ({ getValue }: { getValue: any }) =>
        new Date(getValue()).toLocaleDateString(),
    }
  ], []);


  // const filteredData = React.useMemo(() => {
  //   return wakala?.filter(item => (statusFilter ? item.status === statusFilter : true) || []

  //   );
  // }, [wakala, statusFilter, typeFilter,]);

  const table = useReactTable({
    data: wakala,
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

  if (isLoading) return <div>
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50">
      </div>
    </div>
  </div>;

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <input
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            className="p-2 shadow border"
            placeholder="Search all columns..."
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="p-2 shadow border text-sm font-oswald"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        {addFloat && (
          <div className="flex gap-2">
            <form
              onSubmit={handleSubmit}
              className={`flex gap-2 items-center transition-all duration-500 ${addFloat ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
                }`}
            >
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <input
                type="number"
                id="float"
                aria-label="float"
                name="float"
                value={float}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFloat(isNaN(value) ? 0 : value);
                }}
                className={`p-2 shadow border transition-all duration-500 ${addFloat ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
                  }`}
                placeholder="Enter float amount"
              />

              <button
                type="submit"
                className={`bg-blue-600 font-oswald text-md text-white py-2 px-4 rounded-md hover:bg-blue-500 flex items-center justify-center transition-all duration-500 ${addFloat ? "opacity-100 translate-x-0" : "opacity-0"
                  }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
                onClick={() => setAddFloat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
      
          <table className="w-full table-auto">
            <thead >
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-gray-100 p-2 rounded-lg font-owald text-md uppercase">
                  {headerGroup.headers.map(header => (
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
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}
                  className={`hover:bg-gray-50  ${row.getIsSelected() ? 'bg-blue-50' : ''}`}>
                  {row.getVisibleCells().map((cell: any) => (
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
                  <p className="mb-4 text-gray-500">Are you sure you want to delete this item?</p>
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
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
    

    </div>
  );
}