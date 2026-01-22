// components/modal/AddSalesManager.tsx
import React, { useState, useEffect, useMemo } from "react";
import { IoBusiness, IoCloseOutline, IoCheckmarkCircle } from "react-icons/io5";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { MotionModal } from "../motion/motionModal";
import { useCreateManager } from "../../hooks/useManager";
import { useAvailableMeters } from "../../hooks/useUser";
import { queryClient } from "../..";

// Import the JSON
import tanzaniaLocations from "../../assets/location.json";

// Type for better TypeScript safety
interface Region {
  name: string;
  code: string;
  capital: string;
  districts: string[];
}

const TANZANIA_REGIONS: Region[] = tanzaniaLocations.regions;

interface AddSalesManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSalesManager: React.FC<AddSalesManagerProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    region: "",
    ward: "",
    district: "",
    location: "",
    ppu: 2000,
  });
  const [assignedMeters, setAssignedMeters] = useState<string[]>([]);
  const [searchMeter, setSearchMeter] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: availableMeters = [], isLoading: loadingMeters } = useAvailableMeters();
  const createManager = useCreateManager();

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSearchMeter("");
      setAssignedMeters([]);
      setFormData({ name: "", phone: "", region: "", ward: "", district: "", location: "", ppu: 2000 });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Filtered meters (memoized)
  const filteredAvailableMeters = useMemo(() => {
    const lower = searchMeter.toLowerCase().trim();
    return availableMeters.filter(
      (m) => m.toLowerCase().includes(lower) && !assignedMeters.includes(m)
    );
  }, [availableMeters, searchMeter, assignedMeters]);

  // Available wards for selected region
  const availableWards = useMemo(() => {
    const selectedRegion = TANZANIA_REGIONS.find((r) => r.name === formData.region);
    return selectedRegion ? selectedRegion.districts : []; // Using districts as wards for simplicity
  }, [formData.region]);

  // Validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    // Full Name
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!/^[A-Za-z\s\-']{2,100}$/.test(formData.name.trim())) {
      newErrors.name = "Name must contain only letters, spaces, hyphens or apostrophes (2-100 chars)";
    }

    // Phone (Tanzania format: +255 or 0 followed by 9 digits)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(?:\+255|0)[1-9]\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = "Invalid format. Use +255xxxxxxxxx or 0xxxxxxxxx";
    }

    // Region, Ward, District
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.ward) newErrors.ward = "Ward is required";
    if (!formData.district.trim()) newErrors.district = "District is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    } else {
      toast.error("Please correct the errors before proceeding");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (assignedMeters.length === 0) {
      toast.error("Assign at least one meter");
      return;
    }

    setIsSubmitting(true);

    createManager.mutate(
      {
        ...formData,
        ppu: Number(formData.ppu),
        meters: assignedMeters,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["managers"] });
          queryClient.setQueryData<string[]>(["availableMeters"], (old = []) =>
            old.filter((m) => !assignedMeters.includes(m))
          );
          toast.success("Sales Manager created successfully!");
          onClose();
        },
        onError: () => toast.error("Failed to create manager"),
        onSettled: () => setIsSubmitting(false),
      }
    );
  };

  // Drag & Drop handlers (unchanged)
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
    <MotionModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-darkTheme rounded-md shadow-2xl max-w-6xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-darkTheme border-b dark:border-gray-700 px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <IoBusiness className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-oswald font-bold text-gray-900 dark:text-white">
                Create Sales Manager
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Step {step} of 2 • {step === 1 ? "Personal Details" : "Assign Meters"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <IoCloseOutline className="w-7 h-7 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-8">
                {/* Name & Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        value={formData.name}
                        onChange={(e) => {
                          const value = e.target.value;

                          setFormData({ ...formData, name: value });

                          const parts = value
                            .trim()
                            .replace(/\s+/g, " ")
                            .split(" ");

                          if (value.trim() === "") {
                            setErrors((p) => ({ ...p, name: "Full name is required" }));
                          } else if (parts.length !== 2 && parts.length !== 3) {
                            setErrors((p) => ({ ...p, name: "Enter 2 or 3 names only" }));
                          } else {
                            setErrors((p) => ({ ...p, name: "" }));
                          }
                        }}
                        placeholder="Juma Karim"
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${errors.name ? "border-red-500" : formData.name.trim() ? "border-green-500" : "border-gray-300"
                          } dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:border-blue-500`}
                      />
                      {!errors.name && formData.name.trim() && (
                        <IoCheckmarkCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                      )}
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value;

                          setFormData({ ...formData, phone: value });

                          // remove spaces
                          const phone = value.replace(/\s+/g, "");

                          const isLocalTZ = /^07\d{8}$/.test(phone) || /^06\d{8}$/.test(phone);       // 07XXXXXXXX (10 digits)
                          const isTZWithCode = /^\+255\d{9}$/.test(phone); // +255XXXXXXXXX (12 digits)

                          if (phone === "") {
                            setErrors((p) => ({ ...p, phone: "Phone number is required" }));
                          } else if (!isLocalTZ && !isTZWithCode) {
                            setErrors((p) => ({
                              ...p,
                              phone: "Enter a valid Tanzania number (07XXXXXXXX or +255XXXXXXXXX)",
                            }));
                          } else {
                            setErrors((p) => ({ ...p, phone: "" }));
                          }
                        }}
                        placeholder="+255 712 345 678"
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${errors.phone ? "border-red-500" : formData.phone.trim() ? "border-green-500" : "border-gray-300"
                          } dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:border-blue-500`}
                      />
                      {!errors.phone && formData.phone.trim() && (
                        <IoCheckmarkCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                      )}
                    </div>
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                {/* Region, Ward, District */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Region
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => {
                        setFormData({ ...formData, region: e.target.value, ward: "" });
                        setErrors((p) => ({ ...p, region: "", ward: "" }));
                      }}
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${errors.region ? "border-red-500" : formData.region ? "border-green-500" : "border-gray-300"
                        } dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:border-blue-500`}
                    >
                      <option value="">Select Region</option>
                      {TANZANIA_REGIONS.map((r) => (
                        <option key={r.name} value={r.name}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                    {errors.region && <p className="mt-1 text-sm text-red-600">{errors.region}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ward
                    </label>
                    <select
                      value={formData.ward}
                      onChange={(e) => {
                        setFormData({ ...formData, ward: e.target.value });
                        setErrors((p) => ({ ...p, ward: "" }));
                      }}
                      disabled={!formData.region}
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${errors.ward ? "border-red-500" : formData.ward ? "border-green-500" : "border-gray-300"
                        } dark:bg-gray-800 dark:text-white dark:border-gray-600 disabled:opacity-60 focus:border-blue-500`}
                    >
                      <option value="">Select Ward</option>
                      {availableWards.map((ward) => (
                        <option key={ward} value={ward}>
                          {ward}
                        </option>
                      ))}
                    </select>
                    {errors.ward && <p className="mt-1 text-sm text-red-600">{errors.ward}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      District
                    </label>
                    <input
                      value={formData.district}
                      onChange={(e) => {
                        setFormData({ ...formData, district: e.target.value });
                        setErrors((p) => ({ ...p, district: "" }));
                      }}
                      placeholder="Enter District"
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${errors.district ? "border-red-500" : formData.district.trim() ? "border-green-500" : "border-gray-300"
                        } dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:border-blue-500`}
                    />
                    {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                  </div>
                </div>

                <div className="grid md:grid-col-1 w-full">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location Description
                  </label>
                  <input
                    value={formData.location}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData({ ...formData, location: value });

                      if (value.trim() === "") {
                        setErrors((p) => ({
                          ...p,
                          location: "Location description is required",
                        }));
                      } else {
                        setErrors((p) => ({ ...p, location: "" }));
                      }
                    }}
                    placeholder="Location"
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${errors.location ? "border-red-500" : formData.location.trim() ? "border-green-500" : "border-gray-300"
                      } dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:border-blue-500`}
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                {/* PPU */}
                <div className="max-w-full">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Per Unit (TZS)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="100"
                      step="100"
                      value={formData.ppu}
                      onChange={(e) => setFormData({ ...formData, ppu: Number(e.target.value) })}
                      className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    />
                    <span className="text-lg font-bold text-green-600">TZS</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Assign Meters (unchanged, but with minor polish) */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-oswald font-bold text-gray-900 dark:text-white">
                    Assign Prepaid Meters
                  </h3>
                  <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
                    {assignedMeters.length} meter{assignedMeters.length !== 1 ? "s" : ""} assigned
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={searchMeter}
                    onChange={(e) => setSearchMeter(e.target.value)}
                    placeholder="Search meter serial..."
                    className="w-full pl-12 pr-5 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none"
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

               <div className="grid lg:grid-cols-2 gap-8">
                  {/* Available Meters */}
                  <div
                    onDragOver={onDragOver}
                    onDrop={onDropAssign}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 min-h-[500px]"
                  >
                    <h4 className="font-bold text-lg mb-6 text-gray-800 dark:text-white">
                      Available Meters ({filteredAvailableMeters.length})
                    </h4>
                    <div className="space-y-3 max-h-[420px] overflow-y-auto">
                      {loadingMeters ? (
                        <div className="flex justify-center py-10">
                          <Loader className="animate-spin text-blue-600" />
                        </div>
                      ) : filteredAvailableMeters.length === 0 ? (
                        <p className="text-center py-10 text-gray-500">No meters available</p>
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
                            className="px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 cursor-move hover:shadow-xl hover:border-blue-500 transition-all flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                                <IoBusiness className="w-7 h-7 text-blue-700 dark:text-blue-300" />
                              </div>
                              <code className="font-mono font-bold text-lg text-gray-900 dark:text-white">
                                {m}
                              </code>
                            </div>
                            <span className="opacity-0 group-hover:opacity-100 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full transition-opacity">
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
                    className={`rounded-xl p-6 border-2 min-h-[500px] transition-all ${
                      assignedMeters.length
                        ? "bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-800"
                        : "bg-gray-50 dark:bg-gray-900 border-dashed border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                        Assigned Meters
                      </h4>
                      {assignedMeters.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setAssignedMeters([])}
                          className="text-red-600 hover:text-red-700 font-medium text-sm underline"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    <div className="space-y-4 max-h-[420px] overflow-y-auto">
                      {assignedMeters.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                          Drop meters here or click from available list
                        </div>
                      ) : (
                        assignedMeters.map((s) => (
                          <div
                            key={s}
                            draggable
                            onDragStart={(e) => onDragStart(e, s)}
                            className="px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex justify-between items-center group cursor-move hover:shadow-xl"
                          >
                            <code className="text-lg font-semibold font-oswald text-gray-900 dark:text-white">
                              {s}
                            </code>
                            <button
                              type="button"
                              onClick={() => setAssignedMeters((p) => p.filter((x) => x !== s))}
                              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition"
                            >
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
          </form>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-darkTheme border-t dark:border-gray-700 px-8 py-5 flex justify-between items-center">
          <button
            type="button"
            onClick={step === 1 ? onClose : () => setStep(1)}
            className="px-8 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold font-oswald transition"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>

          {step === 1 && (
            <button
              type="button"
              onClick={handleNext}
              // disabled={Object.keys(errors).length > 0}
              className="px-10 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              Next: Assign Meters
            </button>
          )}

          {step === 2 && (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={createManager.isPending || assignedMeters.length === 0 || isSubmitting}
              className="px-12 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-3 transition"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin w-5 h-5" />
                  Creating...
                </>
              ) : (
                "Create Manager"
              )}
            </button>
          )}
        </div>
      </div>
    </MotionModal>
  );
};

export default AddSalesManager;