// components/managers/UpdateSalesManager.tsx
import React, { useState, useEffect } from "react";
import { IoBusiness, IoCloseOutline, IoPencilOutline } from "react-icons/io5";
import { useApp } from '../../context/ContextProvider';
import { useUpdateManager } from "../../hooks/useManager";
import { Manager } from "../../types/managerType";

interface UpdateSalesManagerProps {
  isOpen: boolean;
  onClose: () => void;
  manager: Manager | null;
}

export const UpdateSalesManager: React.FC<UpdateSalesManagerProps> = ({ isOpen, onClose, manager }) => {
  const [step, setStep] = useState(1);
  const [searchMeter, setSearchMeter] = useState("");
  const [assignedMeters, setAssignedMeters] = useState<string[]>([]);
  const { meters } = useApp();
  const updateManager = useUpdateManager();

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
      name: manager.name,
      phone: manager.phone,
      ward: manager.ward,
      district: manager.district,
      region: manager.region,
      ppu: manager.ppu,
    });

    // FIX 1: Extract only the serial strings from manager.meters
    const meterSerials = manager.meters.map((m) => 
      typeof m === "string" ? m : (m as any).serial ?? m.id
    );
    setAssignedMeters(meterSerials);

    setStep(1);
    setSearchMeter("");
  }
}, [manager, isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSearchMeter("");
    }
  }, [isOpen]);

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
        onClose();
      },
    }
  );
};

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, serial: string) => {
    e.dataTransfer.setData("meter", serial);
  };

  const onDropAssign = (e: React.DragEvent) => {
    e.preventDefault();
    const serial = e.dataTransfer.getData("meter");
    if (serial && !assignedMeters.includes(serial)) {
      setAssignedMeters((prev) => [...prev, serial]);
    }
  };

  const onDropRemove = (e: React.DragEvent) => {
    e.preventDefault();
    const serial = e.dataTransfer.getData("meter");
    if (serial) {
      setAssignedMeters((prev) => prev.filter((m) => m !== serial));
    }
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  if (!isOpen || !manager) return null;

  return (
    <>
      <div className="fixed inset-0 font-poppins bg-black/60 backdrop-blur-md z-40" onClick={onClose} />

      <div className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center">
        <div className="bg-white rounded-md shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col">
          {/* Scrollable container including sticky header */}
          <div className="flex-1 overflow-y-auto">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500 rounded-xl">
                    <IoPencilOutline className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-oswald">Update Sales Manager</h2>
                    <p className="text-gray-500 text-sm">Edit details and reassign prepaid meters</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <IoCloseOutline className="w-7 h-7 text-gray-600" />
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
                        className="px-5 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 text-lg transition-colors"
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Phone Number (e.g. 0755481860)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="px-5 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 text-lg transition-colors"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <input
                        required
                        placeholder="Kata / Ward"
                        value={formData.ward}
                        onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                        className="px-5 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600"
                      />
                      <input
                        required
                        placeholder="Wilaya / District"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="px-5 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600"
                      />
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="px-5 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 bg-white"
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
                        className="flex-1 px-5 py-3 text-xl font-bold rounded-lg border-2 border-gray-300 focus:border-green-600 transition-colors"
                      />
                      <span className="text-xl font-bold text-green-700">TZS</span>
                    </div>
                  </div>
                )}

                {/* Step 2: Meter Assignment */}
                {step === 2 && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-oswald font-bold">Reassign Prepaid Meters</h3>
                      <span className="text-lg text-gray-600 font-medium">
                        {assignedMeters.length} meter{assignedMeters.length !== 1 ? "s" : ""} assigned
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={searchMeter}
                        onChange={(e) => setSearchMeter(e.target.value)}
                        placeholder="Search meter serial..."
                        className="w-full pl-14 pr-5 py-4 rounded-xl border-2 border-gray-300 focus:border-green-600 outline-none text-lg"
                      />
                      <svg
                        className="absolute left-5 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-500 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                      {/* Available Meters */}
                      <div
                        onDragOver={onDragOver}
                        onDrop={onDropAssign}
                        className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-400 min-h-96"
                      >
                        <h4 className="font-bold text-lg mb-6 text-gray-800">Available Meters</h4>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {meters
                            .filter((m) => m.includes(searchMeter) && !assignedMeters.includes(m))
                            .map((m) => (
                              <div
                                key={m}
                                draggable
                                onDragStart={(e) => onDragStart(e, m)}
                                onClick={() => setAssignedMeters((p) => [...p, m])}
                                className="p-4 bg-white rounded-xl shadow-md border-2 border-transparent cursor-move hover:shadow-xl hover:border-green-400 transition-all flex items-center justify-between group"
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
                            ))}
                        </div>
                      </div>

                      {/* Assigned Meters */}
                      <div
                        onDragOver={onDragOver}
                        onDrop={onDropRemove}
                        className={`rounded-2xl p-6 border-4 min-h-96 transition-all ${
                          assignedMeters.length
                            ? "bg-gradient-to-b from-green-50 to-green-100 border-green-400"
                            : "bg-gray-50 border-dashed border-gray-400"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-6">
                          <h4 className="font-bold text-lg text-gray-800">Assigned Meters</h4>
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
                                className="px-6 py-4 bg-white rounded-xl shadow-lg border-2 border-green-300 flex justify-between items-center group cursor-move"
                              >
                                <code className="text-xl font-bold font-oswald text-green-800">{s}</code>
                                <button
                                  type="button"
                                  onClick={() => setAssignedMeters((p) => p.filter((x) => x !== s))}
                                  className="opacity-0 group-hover:opacity-100 p-3 hover:bg-red-100 rounded-xl transition-all"
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
              <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-300 flex justify-between items-center">
                <button
                  type="button"
                  onClick={step === 1 ? onClose : () => setStep(1)}
                  className="px-8 py-4 rounded-xl border-2 border-gray-400 hover:bg-gray-200 font-bold font-oswald text-gray-700 transition"
                >
                  {step === 1 ? "Cancel" : "Back"}
                </button>

                {step === 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-10 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg"
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
                      <>Updating...</>
                    ) : (
                      <>Update Manager</>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};