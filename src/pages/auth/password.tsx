// src/components/auth/ChangePassword.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useChangeZonePassword,    // ← renamed - use the correct hook name
} from '../../hooks/useUser';
import {
  useChangeSalesPassword,   // ← renamed - use the correct hook name
} from '../../hooks/useManager';
import { toast } from 'react-toastify';

interface ChangePasswordProps {
  accountType: 'sales' | 'zone';
  emailOrPhone?: string;     // ← optional: pass from parent / context if you have it
  onBack?: () => void;
  onSuccess?: () => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  accountType,
  emailOrPhone = '',         // fallback empty - you can get from context / auth
  onBack,
  onSuccess,
}) => {
  const [identifier, setIdentifier] = useState(emailOrPhone); // email or phone
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const zoneMutation = useChangeZonePassword();
  const salesMutation =   useChangeSalesPassword();

  const navigate = useNavigate();

  const isPending = accountType === 'zone'
    ? zoneMutation.isPending
    : salesMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (!identifier.trim()) {
      toast.error(
        accountType === 'zone'
          ? 'Email is required'
          : 'Phone number is required'
      );
      return;
    }

    const payload = {
      identifier,           // email or phone
      currentPassword,
      newPassword,
    };

    if (accountType === 'zone') {
      zoneMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Password updated successfully!');
          setTimeout(() => {
            if (onSuccess) onSuccess();
            else navigate('/manager/zone/dashboard');
          }, 1800);
        },
      });
    } else {
      salesMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Password updated successfully!');
          setTimeout(() => {
            if (onSuccess) onSuccess();
            else navigate('/manager/sales/dashboard');
          }, 1800);
        },
      });
    }
  };

  const label = accountType === 'zone' ? 'Email' : 'Phone Number';
  const inputType = accountType === 'zone' ? 'email' : 'tel';

  return (
    <main className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Identifier (Email or Phone) */}
        <div className="relative">
          <label className="animated-label absolute z-10 ml-3 mt-[-8px] bg-white dark:bg-gray-900 px-1 text-sm text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <div className="relative mt-2">
            <input
              type={inputType}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value.trim())}
              required
              disabled={!!emailOrPhone} // disable if passed from parent
              className={`w-full rounded-md border bg-transparent py-3.5 pl-4 pr-12 text-gray-700 dark:text-whiteText dark:bg-blackText dark:border-gray-700 outline-none focus:border-blue-600 transition ${
                !!emailOrPhone ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Current Password */}
        <div className="relative">
          <label className="animated-label absolute z-10 ml-3 mt-[-8px] bg-white dark:bg-gray-900 px-1 text-sm text-gray-700 dark:text-gray-300">
            Current Password
          </label>
          <div className="relative mt-2">
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute inset-y-0 right-3 my-auto text-gray-400 hover:text-gray-600"
            >
              {showCurrent ? 'Hide' : 'Show'}
            </button>
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full rounded-md border bg-transparent py-3.5 pl-4 pr-12 text-gray-700 dark:text-whiteText dark:bg-blackText dark:border-gray-700 outline-none focus:border-blue-600 transition"
            />
          </div>
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="animated-label absolute z-10 ml-3 mt-[-8px] bg-white dark:bg-gray-900 px-1 text-sm text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <div className="relative mt-2">
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute inset-y-0 right-3 my-auto text-gray-400 hover:text-gray-600"
            >
              {showNew ? 'Hide' : 'Show'}
            </button>
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full rounded-md border bg-transparent py-3.5 pl-4 pr-12 text-gray-700 dark:text-whiteText dark:bg-blackText dark:border-gray-700 outline-none focus:border-blue-600 transition"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 rounded-md border border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition font-medium"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex-1 py-3.5 px-6 rounded-md bg-blue-800 hover:bg-blue-700 disabled:bg-blue-400 disabled:dark:bg-blue-600 text-white font-semibold font-oswald dark:bg-whiteText dark:text-blackText transition flex items-center justify-center gap-2 shadow-sm"
          >
            {isPending ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </button>
        </div>
      </form>
    </main>
  );
};