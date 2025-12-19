import React, { useState, useEffect } from "react";
import { IoBusiness, IoCloseOutline } from "react-icons/io5";
import { useApp } from '../../context/ContextProvider';
import { useCreateManager } from "../../hooks/useManager";

interface AddSalesManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSalesManager: React.FC<AddSalesManagerProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [searchMeter, setSearchMeter] = useState("");
  const [assignedMeters, setAssignedMeters] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { meters } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    ward: "",
    district: "",
    region: "Lindi",
    ppu: 2000,
  });

  const createManager = useCreateManager();

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSearchMeter("");
      setAssignedMeters([]);
      setFormData({ name: "", phone: "", ward: "", district: "", region: "Lindi", ppu: 2000 });
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (assignedMeters.length === 0) {
      alert("Please assign at least one meter");
      return;
    }

    createManager.mutate({
      ...formData,
      ppu: Number(formData.ppu),
      meters: assignedMeters
    });

    if (!createManager.isPending) {
      onClose();
    }
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

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 font-poppins bg-black/60 backdrop-blur-md z-40" onClick={onClose} />

      <div className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center">
        <div className="bg-white rounded-md shadow-md w-full max-w-6xl max-h-[95vh] flex flex-col">
          {/* Full scrollable area including header */}
          <div className="flex-1 overflow-y-auto">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-400 rounded-md">
                    <IoBusiness className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-md font-bold font-oswald">Create Sales Manager</h2>
                    <p className="text-gray-400 text-sm">Fill details and assign prepaid meters</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-3 hover:bg-white/20 rounded-xl transition">
                  <IoCloseOutline className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <div className="flex-1 p-8 space-y-10 font-poppins">
                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <input
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-600 text-md" />
                      <input
                        required
                        type="tel"
                        placeholder="Phone Number (e.g. 0755481860)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-600 text-md" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <input
                        required
                        placeholder="Kata"
                        value={formData.ward}
                        onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                        className="px-4 py-2 rounded-md border-2" />
                      <input
                        required
                        placeholder="Wilaya"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="px-4 py-2 rounded-md border-2" />
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="px-4 py-2 rounded-md border-2">
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
                        className="flex-1 px-4 py-2 text-md font-bold rounded-md border-2 border-gray-300 focus:border-blue-600" />
                      <span className="text-md font-bold text-gray-600">TZS</span>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-8">
                    <h3 className="text-md font-oswald font-bold flex justify-between">
                      <span>Assign Prepaid Meters</span>
                      <span className="text-gray-600">{assignedMeters.length} selected</span>
                    </h3>

                    <div className="relative">
                      <input
                        type="text"
                        value={searchMeter}
                        onChange={(e) => setSearchMeter(e.target.value)}
                        placeholder="Search meter serial..."
                        className="w-full pl-12 pr-5 py-3 rounded-md border-2 border-gray-300 focus:border-blue-500 outline-none"
                      />
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Available */}
                      <div onDragOver={onDragOver} onDrop={onDropAssign} className="bg-gray-50 rounded-lg px-4 py-2 border-2 border-dashed border-gray-300 min-h-96">
                        <h4 className="font-bold text-md mb-6">Available Meters</h4>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {meters
                            .filter((m) => m.includes(searchMeter) && !assignedMeters.includes(m))
                            .map((m) => (
                              <div
                                key={m}
                                draggable
                                onDragStart={(e) => onDragStart(e, m)}
                                onClick={() => setAssignedMeters((p) => [...p, m])}
                                className="p-3 bg-white rounded-md shadow-md border cursor-move hover:shadow-lg hover:border-blue-400 transition-all flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="p-3 bg-blue-100 rounded-xl">
                                    <IoBusiness className="w-6 h-6 text-blue-600" />
                                  </div>
                                  <div>
                                    <code className="font-mono font-bold">{m}</code>
                                  </div>
                                </div>
                                <span className="opacity-0 group-hover:opacity-100 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Drag or Click</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Assigned */}
                      <div onDragOver={onDragOver} onDrop={onDropRemove} className={`rounded-md p-4 border-4 min-h-96 ${assignedMeters.length ? "bg-blue-50 border-blue-300" : "bg-gray-50 border-dashed border-gray-300"}`}>
                        <div className="flex justify-between mb-4">
                          <h4 className="font-bold text-md">Assigned Meters</h4>
                          {assignedMeters.length > 0 && (
                            <button type="button" onClick={() => setAssignedMeters([])} className="text-red-600 hover:text-red-700 text-sm">
                              Clear all
                            </button>
                          )}
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {assignedMeters.length === 0 ? (
                            <p className="text-center text-gray-500 py-20">Drop meters here</p>
                          ) : (
                            assignedMeters.map((s) => (
                              <div key={s} draggable onDragStart={(e) => onDragStart(e, s)} className="px-4 py-1 bg-white rounded-md shadow-lg border-2 border-gray-300 flex justify-between items-center group cursor-move">
                                <code className="text-lg font-semibold font-oswald">{s}</code>
                                <button type="button" onClick={() => setAssignedMeters((p) => p.filter((x) => x !== s))} className="opacity-0 group-hover:opacity-100 p-3 hover:bg-red-100 rounded-md">
                                  <IoCloseOutline className="w-6 h-6 text-red-600" />
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

              {/* Footer - fixed at bottom */}
              <div className="p-8 bg-gray-50 flex justify-between border-t border-gray-200">
                <button type="button" onClick={step === 1 ? onClose : () => setStep(1)} className="px-4 py-2 rounded-md border-2 border-gray-300 hover:bg-gray-100 font-bold font-oswald">
                  {step === 1 ? "Cancel" : "Back"}
                </button>

                {step === 1 && (
                  <button type="button" onClick={() => setStep(2)} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md font-oswald hover:bg-blue-700 transition">
                    Next: Assign Meters
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="submit"
                    disabled={createManager.isPending || assignedMeters.length === 0}
                    className="px-12 py-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-3"
                  >
                    {isSubmitting ? "Creating..." : "Create Manager"}
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