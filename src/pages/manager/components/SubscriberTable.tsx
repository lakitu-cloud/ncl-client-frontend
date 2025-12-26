// src/pages/manager/tabs/SubscribersTable.tsx
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../components/DataTable';
import { Badge } from '../components/Badge';
import { SubscriberPayload } from '../../../types/subscriberTypes';

// interface Subscriber {
//   id: string;
//   name: string;
//   phone: string;
//   meterCount: number;
//   totalSpent: number;
//   status: 'active' | 'inactive' | 'suspended';
// }

const columnHelper = createColumnHelper<SubscriberPayload>();

const columns: ColumnDef<SubscriberPayload, any>[] = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => <span className="font-medium font-poppins text-gray-600 dark:text-whiteText">{info.getValue()}</span>,
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: (info) => <span className="font-poppins  font-medium text-gray-600 dark:text-whiteText">{info.getValue()}</span>,
  }),

  columnHelper.accessor('location', {
    header: 'Description',
    cell: (info) => <Badge variant="outline" className='font-medium font-poppins text-gray-600 dark:text-whiteText dark-border-gray-700'>{info.getValue()}</Badge>,
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
  // columnHelper.accessor('totalSpent', {
  //   header: 'Total Spent',
  //   cell: (info) => (
  //     <span className="font-bold text-green-600">
  //       {info.getValue().toLocaleString()} TZS
  //     </span>
  //   ),
  // }),
];

interface SubscriberTableProps {
  subscribers: SubscriberPayload[];
}

export const SubscribersTable = ({ subscribers }: SubscriberTableProps) => {
  return subscribers.length === 0 ? ( 
    <div className="text-center py-16 text-gray-500">
      <p className="text-lg">No meters assigned to this manager yet.</p>
    </div> 
    ) : ( 
      <DataTable columns={columns} data={subscribers} /> 
    )
};