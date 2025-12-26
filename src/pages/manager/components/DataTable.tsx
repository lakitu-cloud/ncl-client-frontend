// src/components/ui/DataTable.tsx
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { IoArrowDown, IoArrowUp, IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { cn } from '../components/utils';

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  className?: string;
}

export function DataTable<TData>({ columns, data, className }: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className={cn("rounded-md border border-gray-200 dark:bg-blackText dark:border-gray-700 overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="dark:bg-blackText dark:border-gray-700 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-whiteText uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-darkTheme transition"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <IoArrowDown className="w-4 h-4" />
                        ) : (
                          <IoArrowUp className="w-4 h-4" />
                        )
                      ) : (
                        <IoCaretDown className="w-4 h-4 opacity-30" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-blue-50/50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-5 text-sm text-gray-900">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
}