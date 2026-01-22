// components/modals/DeleteManagerModal.tsx
import React from 'react';
import { useDeleteManager } from '../../hooks/useManager';
import { toast } from 'react-toastify';

type DeleteManagerModalProps = {
  id: string;
  value?: string;
  onClose: () => void;
};

const DeleteModal: React.FC<DeleteManagerModalProps> = ({id, value, onClose }) => {
  const deleteManager = useDeleteManager();

  const handleDelete = () => {
    deleteManager.mutate(id, {
      onSuccess: () => {
        toast.success(`${value} deleted successfully`);
        onClose();
      },
      onError: () => {
        toast.error("Failed to delete");
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-md bg-white dark:bg-blackText p-6 shadow-sm">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-whiteText">
            Delete 
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            Are you sure you want to delete <span className="font-bold">"{value}"</span>?
            <br />
            <span className="text-red-600">This will also unassign all their meters.</span>
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white dark:bg-blackText dark:hover:bg-blue-900 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteManager.isPending}
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-70"
            >
              {deleteManager.isPending ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;