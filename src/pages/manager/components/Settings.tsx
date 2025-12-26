// src/pages/manager/tabs/SettingsTab.tsx
import { Button } from '../components/Button';          // Your existing custom Button
import { Switch } from '../components/Switch';            // Your existing custom Switch
import { Card } from '../components/Card';                // Your existing custom Card
import { Input } from '../components/Input';              // Add a simple custom Input if you don't have one yet
import { Textarea } from '../components/Textarea';        // Add a simple custom Textarea
import { AlertTriangle, Loader2 } from 'lucide-react';                   // Only icon library – minimal & tree-shakable
import { toast } from 'react-toastify';                  // You mentioned toastify in preferences
import { useCallback, useState } from 'react';

// Simple custom modal component (no external dialog library needed)
// src/components/ConfirmModal.tsx
import { memo } from 'react';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  children?: React.ReactNode;
};

export const ConfirmModal = memo(function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
  children,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-gray-600">{description}</p>
        {children}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
});

ConfirmModal.displayName = 'ConfirmModal';

export const SettingsTab = memo(function SettingsTab() {
  const [autoAssign, setAutoAssign] = useState(true);
  const [pricePerUnit, setPricePerUnit] = useState('150');

  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [notifyCustomers, setNotifyCustomers] = useState(false);
  const [suspendMessage, setSuspendMessage] = useState('');
  const [isSuspending, setIsSuspending] = useState(false);

  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isSavingPrice, setIsSavingPrice] = useState(false);

  // useCallback to prevent unnecessary re-creations
  const handleSavePrice = useCallback(async () => {
    setIsSavingPrice(true);
    try {
      // TODO: Integrate with react-query mutation later
      // await updatePriceMutation.mutateAsync(Number(pricePerUnit));
      toast.success('Price per unit updated');
    } catch {
      toast.error('Failed to update price');
    } finally {
      setIsSavingPrice(false);
    }
  }, [pricePerUnit]);

  const handleSuspend = useCallback(async () => {
    setIsSuspending(true);
    try {
      // TODO: Future mutation
      toast.success(
        notifyCustomers
          ? 'Manager suspended and customers notified via SMS'
          : 'Manager suspended successfully'
      );
      setSuspendModalOpen(false);
    } catch {
      toast.error('Failed to suspend manager');
    } finally {
      setIsSuspending(false);
    }
  }, [notifyCustomers]);

  const handleDeactivate = useCallback(async () => {
    setIsDeactivating(true);
    try {
      toast.success('Account deactivated permanently');
      // TODO: logout / redirect
    } catch {
      toast.error('Failed to deactivate account');
    } finally {
      setIsDeactivating(false);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* <h2 className="text-3xl font-bold mb-8">Manager Settings</h2> */}

      <div className="space-y-6 font-poppins">
        {/* Auto-Assign */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              {/* <label className="text-base font-medium">Auto-Assign New Meters</label> */}
              <p className="text-sm text-gray-600 mt-1 ">
                Automatically assign newly registered meters in this region
              </p>
            </div>
            <Switch checked={autoAssign} onCheckedChange={setAutoAssign} />
          </div>
        </Card>

        {/* Pricing */}
        <Card className="p-6">
          {/* <h3 className="text-lg font-semibold mb-4">Pricing</h3> */}
          <div className="max-w-md space-y-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium">
                Price per Unit (local currency)
              </label>
              <div className="mt-2 flex gap-3">
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(e.target.value)}
                />
                <Button onClick={handleSavePrice} disabled={isSavingPrice}>
                  {isSavingPrice && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-300 bg-red-50">
          <div className="flex items-center gap-2 text-red-700 mb-5">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Danger Zone</h3>
          </div>

          <div className="space-x-4">
            <Button
              variant="destructive"
              onClick={() => setSuspendModalOpen(true)}
              className="w-full sm:w-auto"
            >
              Suspend Manager / Zone
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto border-red-600 text-red-600 hover:bg-red-50"
              onClick={() => setDeactivateModalOpen(true)}
            >
              Deactivate Manager Account Permanently
            </Button>
          </div>
        </Card>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={suspendModalOpen}
        onClose={() => setSuspendModalOpen(false)}
        onConfirm={handleSuspend}
        title="Suspend Manager / Zone?"
        description="This will temporarily disable the manager account and stop all meter operations."
        confirmText="Confirm Suspension"
        loading={isSuspending}
      >
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <Switch checked={notifyCustomers} onCheckedChange={setNotifyCustomers} />
            <label className="font-medium">Notify all customers via SMS</label>
          </div>
          {notifyCustomers && (
            <div>
              <label htmlFor="sms-msg" className="block text-sm font-medium mb-1">
                Custom SMS Message (optional)
              </label>
              <Textarea
                id="sms-msg"
                placeholder="e.g., Service suspended due to maintenance..."
                value={suspendMessage}
                onChange={(e) => setSuspendMessage(e.target.value)}
                rows={3}
              />
            </div>
          )}
        </div>
      </ConfirmModal>

      <ConfirmModal
        isOpen={deactivateModalOpen}
        onClose={() => setDeactivateModalOpen(false)}
        onConfirm={handleDeactivate}
        title="Permanently Deactivate Account?"
        description="This action cannot be undone. All data will be deleted."
        confirmText="Delete Permanently"
        loading={isDeactivating}
      />
    </div>
  );
});

SettingsTab.displayName = 'SettingsTab';