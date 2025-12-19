// src/components/meters/MeterAssignment.tsx
import React, { useState } from 'react';
import { Loader2, Search, UserPlus, UserX } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  useAssignMeterToSubscriber,
  useUnassignMeter,
} from '../../hooks/useMeter';
import {
  useGetSubsById,
  useSearchSubscribers,
} from '../../hooks/useSubscriber';
import { SubscriberPayload } from '../../types/subscriberTypes'; // Make sure this exists!

interface MeterAssignmentProps {
  meterId: string;
  subscriberId?: string | null;
  onAssignmentChange?: () => void;
}

const MeterAssignment: React.FC<MeterAssignmentProps> = ({
  meterId,
  subscriberId,
  onAssignmentChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: searchResults = [], isFetching: searching } = useSearchSubscribers(searchQuery);
  const assignMutation = useAssignMeterToSubscriber();
  const unassignMutation = useUnassignMeter();

  // Correct usage: enabled option goes as second argument
  const {
    data: subscriberResponse,
    isPending: loadingSubscriber,
    isError: subscriberError,
  } = useGetSubsById(subscriberId as string);

  // Extract the actual subscriber from response (adjust based on your API shape)
  const subscriber: SubscriberPayload | undefined = subscriberResponse?.data;

  const isAssigned = !!subscriberId && subscriberId.length > 0;

  const handleAssign = (newSubscriberId: string) => {
    assignMutation.mutate(
      { meterId, subscriberId: newSubscriberId },
      {
        onSuccess: () => {
          toast.success('Meter assigned successfully!');
          onAssignmentChange?.();
          setSearchQuery('');
        },
        onError: () => toast.error('Failed to assign meter'),
      }
    );
  };

  const handleUnassign = () => {
    unassignMutation.mutate(
      { meterId },
      {
        onSuccess: () => {
          toast.success('Meter unassigned successfully');
          onAssignmentChange?.();
        },
        onError: () => toast.error('Failed to unassign meter'),
      }
    );
  };

  return (
    <div className="bg-white dark:bg-blackText rounded-md shadow-md border border-gray-200 p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Meter Assignment</h3>

        {isAssigned && subscriber && (
          <button
            onClick={handleUnassign}
            disabled={unassignMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
          >
            <UserX className="w-4 h-4" />
            {unassignMutation.isPending ? 'Unassigning...' : 'Unassign Meter'}
          </button>
        )}
      </div>

      {/* Assigned Subscriber View */}
      {isAssigned ? (
        loadingSubscriber ? (
          <div className="flex items-center gap-8 p-6 animate-pulse">
            <div className="w-28 h-28 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-64" />
              <div className="grid grid-cols-2 gap-6">
                <div className="h-6 bg-gray-200 rounded w-48" />
                <div className="h-6 bg-gray-200 rounded w-40" />
                <div className="h-6 bg-gray-200 rounded w-32" />
                <div className="h-6 bg-gray-200 rounded w-56" />
              </div>
            </div>
          </div>
        ) : subscriber ? (
          <div className="flex items-center gap-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              {subscriber.name}
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Subscriber Name</p>
                  <p className="text-xl font-bold text-gray-900">{subscriber.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                  <p className="text-lg font-semibold text-gray-800">{subscriber.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Account ID</p>
                  <p className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg inline-block">
                    {subscriber.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Balance</p>
                  <p className="text-xl font-bold text-green-700">
                    TSH {subscriber.balance?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>

              {subscriber.location && (
                <div className="mt-5">
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="text-gray-800 font-medium">{subscriber.location}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-red-600">
            Subscriber not found or failed to load details.
          </div>
        )
      ) : (
        /* Unassigned – Search & Assign UI */
        <div className="space-y-4">
          <p className="text-gray-600">This meter is not assigned to any subscriber yet.</p>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subscribers by name, phone or ID..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            {searching && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-gray-400 w-5 h-5" />
            )}
          </div>

          {searchQuery && searchResults.length > 0 && (
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-xl bg-gray-50 shadow-sm">
              {searchResults.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 hover:bg-white transition border-b border-gray-100 last:border-0 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {sub.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{sub.name}</p>
                      <p className="text-sm text-gray-600">{sub.phone}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAssign(sub.id)}
                    disabled={assignMutation.isPending}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                  >
                    <UserPlus className="w-4 h-4" />
                    {assignMutation.isPending ? 'Assigning...' : 'Assign'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {searchQuery && searchResults.length === 0 && !searching && (
            <p className="text-center text-gray-500 py-8">
              No subscribers found matching your search.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MeterAssignment;