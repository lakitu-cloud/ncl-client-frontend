// src/pages/manager/tabs/MetersTable.tsx
import { Meter } from '../../../types/meterTypes';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../components/DataTable';
import { Badge } from '../components/Badge';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<Meter>();

const columns: ColumnDef<Meter, any>[] = [
  columnHelper.accessor('serial', {
    header: 'Serial Number',
    cell: (info) => (
      <span className="font-mono font-semibold text-indigo-700">
        {info.getValue() || info.row.original.id}
      </span>
    ),
  }),
  columnHelper.accessor('name', {
    header: 'Subscriber',
    cell: (info) => info.getValue() || <span className="text-gray-400">—</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Badge variant={info.getValue() === 'active' ? 'success' : 'secondary'}>
        {info.getValue() || 'unknown'}
      </Badge>
    ),
  }),
  columnHelper.accessor('phone', {
    header: 'Units Sold',
    cell: (info) => (
      <span className="font-medium">{(info.getValue() || 0).toFixed(1)} kWh</span>
    ),
  }),
  columnHelper.accessor('installedAt', {
    header: 'Revenue',
    cell: (info) => (
      <span className="font-bold text-green-600">
        {(info.getValue() || 0).toLocaleString()} TZS
      </span>
    ),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Added On',
    cell: (info) =>
      info.getValue() ? format(new Date(info.getValue()!), 'dd MMM yyyy') : '—',
  }),
];

interface MetersTableProps {
  meters: Meter[];
}

export const MetersTable = ({ meters }: MetersTableProps) => {
  return meters.length === 0 ? (
    <div className="text-center py-16 text-gray-500">
      <p className="text-lg">No meters assigned to this manager yet.</p>
    </div>
  ) : (
    <DataTable columns={columns} data={meters} />
  );
};