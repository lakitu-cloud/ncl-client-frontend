// src/components/modal/ReportProblemModal.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useReportMeterProblem } from '../../hooks/useMeter';

interface ReportProblemModalProps {
    isOpen: boolean;
    onClose: () => void;
    meterId: string;
    meterSerial: string;
    onSuccess?: () => void;
}

export default function ReportProblemModal({
    isOpen,
    onClose,
    meterId,
    meterSerial,
    onSuccess,
}: ReportProblemModalProps) {
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { mutate, isPending } = useReportMeterProblem();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!description.trim()) {
            toast.error('Please describe the problem');
            return;
        }

        // Now pass both values as an object
        mutate(
            { meterId, description },
            {
                onSuccess: () => {
                    setDescription('');
                    onClose();
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Report Meter Problem
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Meter Serial: <span className="font-mono">{meterSerial}</span>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Describe the problem <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                            placeholder="e.g., Meter is showing tamper error, water flow not registering, display is blank..."
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending || !description.trim()}
                            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 min-w-[120px] flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Send Report'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}