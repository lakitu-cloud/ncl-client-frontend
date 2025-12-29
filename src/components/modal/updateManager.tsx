// components/managers/UpdateSalesManager.tsx
import React, { useState, useEffect, useMemo } from "react";
import { IoBusiness, IoCloseOutline, IoPencilOutline } from "react-icons/io5";
import { useUpdateManager } from "../../hooks/useManager";
import { Manager } from "../../types/managerType";
import { useAvailableMeters } from "../../hooks/useUser";
import { queryClient } from "../..";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { MotionModal } from "../motion/motionModal";

interface UpdateSalesManagerProps {
  isOpen: boolean;
  onClose: () => void;
  manager: Manager | null;
}

export const UpdateSalesManager: React.FC<UpdateSalesManagerProps> = ({ isOpen, onClose, manager }) => {
  const [step, setStep] = useState(1);
  const [searchMeter, setSearchMeter] = useState("");
  const [assignedMeters, setAssignedMeters] = useState<string[]>([]);
  const updateManager = useUpdateManager();
  const { data: availableMeters = [], isLoading: loadingMeters } = useAvailableMeters();


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    ward: "",
    district: "",
    region: "Lindi",
    ppu: 2000,
  });

  // Inside your component
  useEffect(() => {
    if (manager && isOpen) {
      setFormData({
        name: manager.name || "",
        phone: manager.phone || "",
        ward: manager.ward || "",
        district: manager.district || "",
        region: manager.region || "Lindi",
        ppu: manager.ppu || 2000,
      });

      const serials = manager.meters.map((m: any) =>
        typeof m === "string" ? m : m.serial
      );
      setAssignedMeters(serials);

      setStep(1);
      setSearchMeter("");
    }
  }, [manager, isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSearchMeter("");
      setAssignedMeters([]);
    }
  }, [isOpen]);

  // Filtered available meters — memoized for performance
  const filteredAvailableMeters = useMemo(() => {
    const lowerSearch = searchMeter.toLowerCase().trim();
    return availableMeters.filter(
      (m) =>
        m.toLowerCase().includes(lowerSearch) &&
        !assignedMeters.includes(m)
    );
  }, [availableMeters, searchMeter, assignedMeters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!manager) return;

    updateManager.mutate(
      {
        id: manager.id,
        data: {
          name: formData.name,
          ward: formData.ward,
          district: formData.district,
          region: formData.region,
          ppu: Number(formData.ppu),
          meters: assignedMeters,
        },
      },
      {
        onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['availableMeters'] });

        queryClient.invalidateQueries({ queryKey: ['managers'] }); 
        queryClient.invalidateQueries({ queryKey: ['manager', manager.id] });

          toast.success('Manager updated successfully!');
          onClose();
        },
        onError: (err) => {
          toast.error('Failed to create manager');
          console.error(err);
        },
      }
    );
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, serial: string) => {
    e.dataTransfer.setData("text/plain", serial); 
  };

  const onDropAssign = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const serial = e.dataTransfer.getData("text/plain");
    if (serial && !assignedMeters.includes(serial)) {
      setAssignedMeters((prev) => [...prev, serial]);
    }
  };

  const onDropRemove = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const serial = e.dataTransfer.getData("text/plain");
    if (serial) {
      setAssignedMeters((prev) => prev.filter((m) => m !== serial));
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
    e.stopPropagation();
  };

  if (!isOpen || !manager) return null;

  return (
    <>
      <div className="fixed inset-0 font-poppins bg-black/60 dark:bg-white/60 backdrop-blur-md z-40" onClick={onClose} />

      <div className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center">
        <MotionModal isOpen={isOpen} onClose={onClose}>
        <div className="bg-white dark:bg-blackText rounded-md shadow-sm w-full max-w-6xl max-h-[95vh] flex flex-col">
          {/* Scrollable container including sticky header */}
          <div className="flex-1 overflow-y-auto">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-400 p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4 dark:text-whiteText ">
                  <div className="p-3 bg-green-500 rounded-md">
                    <IoPencilOutline className="w-6 h-6 text-white " />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-oswald">Update Sales Manager</h2>
                    <p className="text-gray-500 dark:text-whiteText  text-sm font-poppins">Edit details and reassign prepaid meters</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <IoCloseOutline className="w-7 h-7 text-gray-600 dark:text-whiteText " />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <div className="flex-1 p-8 space-y-10">
                {/* Step 1: Personal & Pricing Info */}
                {step === 1 && (
                  <div className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-8">
                      <input
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="px-5 py-3 rounded-md border-2 border-gray-200 dark:bg-darkTheme dark:text-whiteText focus:border-green-600 text-lg transition-colors"
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Phone Number (e.g. 0755481860)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="px-5 py-3 rounded-lg border-2 border-gray-200 dark:bg-darkTheme dark:text-whiteText focus:border-green-600 text-lg transition-colors"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <input
                        required
                        placeholder="Kata / Ward"
                        value={formData.ward}
                        onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                        className="px-5 py-3 rounded-lg border-2 border-gray-200 dark:bg-darkTheme dark:text-whiteText focus:border-green-600"
                      />
                      <input
                        required
                        placeholder="Wilaya / District"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="px-5 py-3 rounded-lg border-2 border-gray-200 dark:bg-darkTheme dark:text-whiteText focus:border-green-600"
                      />
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="px-5 py-3 rounded-lg border-2 border-gray-200 dark:bg-darkTheme dark:text-whiteText focus:border-green-600 bg-white"
                      >
                        <option>Lindi</option>
                        <option>Dar es Salaam</option>
                        <option>Mtwara</option>
                        <option>Morogoro</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-4 max-w-md">
                      <input
                        required
                        type="number"
                        min="0"
                        step="100"
                        value={formData.ppu}
                        onChange={(e) => setFormData({ ...formData, ppu: +e.target.value })}
                        className="flex-1 px-5 py-3 text-xl font-bold rounded-md dark:bg-darkTheme dark:text-whiteText border-2 border-gray-300 focus:border-green-600 transition-colors"
                      />
                      <span className="text-xl font-bold text-green-700">TZS</span>
                    </div>
                  </div>
                )}

                {/* Step 2: Meter Assignment */}
                {step === 2 && (
                  <div className="space-y-8 dark:text-whiteText">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-oswald font-bold ">Reassign Prepaid Meters</h3>
                      <span className="text-md font-poppins text-gray-600 font-medium">
                        {assignedMeters.length} meter{assignedMeters.length !== 1 ? "s" : ""} assigned
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={searchMeter}
                        onChange={(e) => setSearchMeter(e.target.value)}
                        placeholder="Search meter serial..."
                        className="w-full pl-14 pr-5 py-2 rounded-md border-2 border-gray-300 dark:bg-darkTheme focus:border-green-600 outline-none text-md"
                      />
                      <svg
                        className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 font-poppins">
                      {/* Available Meters */}
                      <div
                        onDragOver={onDragOver}
                        onDrop={onDropAssign}
                        className="bg-gray-100 dark:bg-blackText rounded-md p-6 border-2 border-dashed border-gray-400 min-h-96"
                      >
                        <h4 className="font-bold text-lg mb-6 text-gray-800 dark:text-whiteText">Available Meters ({filteredAvailableMeters.length})</h4>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {loadingMeters ? (
                            <p className="text-center py-8 text-gray-500"> <Loader /></p>
                          ) : filteredAvailableMeters.length === 0 ? (
                            <p className="text-center py-8 text-gray-500">No meters found</p>
                          ) : (
                            filteredAvailableMeters.map((m) => (
                              <div
                                key={m}
                                draggable
                                onDragStart={(e) => onDragStart(e, m)}
                                onClick={() => {
                                  if (!assignedMeters.includes(m)) {
                                    setAssignedMeters((prev) => [...prev, m]);
                                  }
                                }}
                                className="px-6 py-2 bg-white dark:bg-darkTheme rounded-md shadow-md border-2 border-transparent cursor-move hover:shadow-xl hover:border-green-400 transition-all flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="p-3 bg-green-100 rounded-xl">
                                    <IoBusiness className="w-7 h-7 text-green-700" />
                                  </div>
                                  <code className="font-mono font-bold text-lg">{m}</code>
                                </div>
                                <span className="opacity-0 group-hover:opacity-100 text-sm bg-green-100 text-green-800 px-4 py-2 rounded-full transition-opacity">
                                  Drag or Click
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Assigned Meters */}
                      <div
                        onDragOver={onDragOver}
                        onDrop={onDropRemove}
                        className={`rounded-md p-6 border-4 min-h-96  transition-all ${assignedMeters.length
                          ? "bg-green-100 dark:bg-blackText border-green-400"
                          : "bg-gray-50 border-dashed border-gray-400"
                          }`}
                      >
                        <div className="flex justify-between items-center mb-6">
                          <h4 className="font-bold text-lg text-gray-800 dark:text-whiteText">Assigned Meters</h4>
                          {assignedMeters.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setAssignedMeters([])}
                              className="text-red-600 hover:text-red-700 font-medium text-sm underline"
                            >
                              Remove all
                            </button>
                          )}
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {assignedMeters.length === 0 ? (
                            <p className="text-center text-gray-500 py-24 text-lg">Drop meters here to assign</p>
                          ) : (
                            assignedMeters.map((s) => (
                              <div
                                key={s}
                                draggable
                                onDragStart={(e) => onDragStart(e, s)}
                                className="px-6 py-2 bg-white dark:bg-darkTheme rounded-md shadow-sm border-2 border-green-300 flex justify-between items-center group cursor-move"
                              >
                                <code className="text-md font-bold font-oswald text-green-800">{s}</code>
                                <button
                                  type="button"
                                  onClick={() => setAssignedMeters((p) => p.filter((x) => x !== s))}
                                  className="opacity-0 group-hover:opacity-100 p-3 hover:bg-red-100 rounded-md transition-all"
                                >
                                  <IoCloseOutline className="w-7 h-7 text-red-600" />
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fixed Footer */}
              <div className="p-6 font-poppins border-t border-gray-300 dark:border-gray-700 flex justify-between items-center">
                <button
                  type="button"
                  onClick={step === 1 ? onClose : () => setStep(1)}
                  className="px-4 py-2 rounded-md border-2 border-gray-400 hover:bg-gray-200 font-bold font-oswald text-gray-700 dark:text-whiteText  transition"
                >
                  {step === 1 ? "Cancel" : "Back"}
                </button>

                {step === 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition shadow-sm"
                  >
                    Next: Reassign Meters
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="submit"
                    disabled={updateManager.isPending || assignedMeters.length === 0}
                    className="px-16 py-5 bg-green-600 text-white font-bold text-lg rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xl flex items-center gap-3"
                  >
                    {updateManager.isPending ? (
                      <> <Loader /></> ) : ( <>Update Manager</>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        </MotionModal>
      </div>
    </>
  );
};