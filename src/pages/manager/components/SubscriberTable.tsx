// src/pages/manager/tabs/SubscribersTable.tsx
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../components/DataTable';
import { Badge } from '../components/Badge';

interface Subscriber {
  id: string;
  name: string;
  phone: string;
  meterCount: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'suspended';
}

const columnHelper = createColumnHelper<Subscriber>();

const columns: ColumnDef<Subscriber, any>[] = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: (info) => <span className="font-mono">{info.getValue()}</span>,
  }),
  columnHelper.accessor('meterCount', {
    header: 'Meters',
    cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Badge
        variant={
          info.getValue() === 'active'
            ? 'success'
            : info.getValue() === 'suspended'
            ? 'destructive'
            : 'secondary'
        }
      >
        {info.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor('totalSpent', {
    header: 'Total Spent',
    cell: (info) => (
      <span className="font-bold text-green-600">
        {info.getValue().toLocaleString()} TZS
      </span>
    ),
  }),
];

const mockSubscribers: Subscriber[] = [
  { id: '1', name: 'Amina Juma', phone: '+255 712 345 678', meterCount: 3, totalSpent: 2450000, status: 'active' },
  { id: '2', name: 'John Kweka', phone: '+255 789 123 456', meterCount: 1, totalSpent: 980000, status: 'active' },
  { id: '3', name: 'Fatma Ali', phone: '+255 655 987 654', meterCount: 2, totalSpent: 1670000, status: 'suspended' },
];

export const SubscribersTable = () => {
  return <DataTable columns={columns} data={mockSubscribers} />;
};