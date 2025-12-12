// components/managers/ManagerList.tsx
import React, { useState } from "react";
import { IoTrashOutline, IoBusiness, IoPencilOutline } from "react-icons/io5";
import { useGetManagers, useDeleteManager } from "../../hooks/useManager";
import { toast } from "react-toastify";
import { Manager } from "../../types/managerType";
import DeleteModal from "../../components/modal/deleteModel";
import { UpdateSalesManager } from "../../components/modal/updateManager";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const ManagerList: React.FC = () => {
  const { data: managers = [], isLoading, error } = useGetManagers();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [managerToEdit, setManagerToEdit] = useState<Manager | null>(null);
  
  const navigate = useNavigate()

  const openUpdateModal = (manager: Manager) => {
    setManagerToEdit(manager);
    setIsUpdateModalOpen(true);
  };

  const deleteManager = useDeleteManager(); 

  const openDeleteModal = (id: string, name: string) => {
    setManagerToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setManagerToDelete(null);
  };

  const handleGetManager = (id: string, name: string) => {
    toast.loading(`Getting manager ${name}` as string)
    navigate(`manager/sales/manager/${id}`)
    
  }

  const handleDelete = (id: string, name: string) => {
    if (!toast.warning(`Are you sure you want to delete manager "${name}"?`)) return;

    deleteManager.mutate(id, {
      onSuccess: () => {
        toast.success(`Manager "${name}" deleted successfully`);
      },
      onError: () => {
        toast.error("Failed to delete manager");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        Failed to load managers. Please try again.
      </div>
    );
  }

  if (managers.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <IoBusiness className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-lg">No sales managers yet.</p>
        <p>Create your first manager to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-200 text-left">
            <th className="py-4 px-6 font-bold text-gray-700">Manager</th>
            <th className="py-4 px-6 font-bold text-gray-700">Contact</th>
            <th className="py-4 px-6 font-bold text-gray-700">Location</th>
            <th className="py-4 px-6 font-bold text-gray-700 text-center">Meters</th>
            <th className="py-4 px-6 font-bold text-gray-700 text-right">Price Per Unit</th>
            <th className="py-4 px-6 font-bold text-gray-700 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager: Manager) => (
            <tr
              key={manager.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition"
            >
              {/* Name + Avatar */}
             <td className="py-5 px-6">
              <Link to={`/manager/zone/manager/${manager.id}`} className="flex items-center gap-4 hover:opacity-80 transition">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-700">
                    {manager.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-lg hover:text-indigo-600 transition">{manager.name}</p>
                  <p className="text-sm text-gray-500">Sales Manager</p>
                </div>
              </Link>
            </td>

              {/* Phone */}
              <td className="py-5 px-6">
                <p className="font-mono font-semibold">{manager.phone}</p>
              </td>

              {/* Location */}
              <td className="py-5 px-6">
                <div>
                  <p className="font-medium">{manager.ward}, {manager.district}</p>
                  <p className="text-sm text-gray-500">{manager.region}</p>
                </div>
              </td>

              {/* Meters Count */}
              <td className="py-5 px-6 text-center">
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-bold text-md">
                  {manager.meters.length} meter{manager.meters.length !== 1 ? 's' : ''}
                </span>
              </td>

              {/* PPU */}
              <td className="py-5 px-6 text-right">
                <span className="text-lg font-bold text-green-600">
                  {manager.ppu.toLocaleString()} TZS
                </span>
              </td>

              {/* Actions */}
              <td className="py-5 px-6">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => openDeleteModal(manager.id, manager.name)}
                    disabled={deleteManager.isPending}
                    className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
                    title="Delete manager"
                  >
                    <IoTrashOutline className="w-5 h-5" />
                  </button>

                  {/* You can add Edit button later */}
                  <button
                    type="button"
                    onClick={() => openUpdateModal(manager)}
                    className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition">
                    <IoPencilOutline className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDeleteModalOpen && managerToDelete && (
        <DeleteModal
          managerId={managerToDelete.id}
          managerName={managerToDelete.name}
          onClose={closeDeleteModal}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateSalesManager
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          manager={managerToEdit}
        />
      )}
    </div>
  );
};