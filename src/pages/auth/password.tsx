import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface ForgetPasswordProps {
  accountType: 'sales' | 'zone';
  onBack: () => void;
}

export const ForgetPassword: React.FC<ForgetPasswordProps> = ({ accountType, onBack }) => {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const label = accountType === 'zone' ? 'Email' : 'Phone';

  const forgetMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/authentications/forget', { // Adjust base URL if needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountType, identifier }),
      });
      if (!res.ok) throw new Error(await res.text() || 'Failed to send OTP');
      return res.json();
    },
    onSuccess: () => {
      toast.success('OTP sent (check console for testing)');
      setStep(2);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const resetMutation = useMutation({
    mutationFn: async () => {
      if (newPassword !== confirmPassword) throw new Error('Passwords do not match');
      const res = await fetch('/api/authentications/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountType, identifier, code, newPassword }),
      });
      if (!res.ok) throw new Error(await res.text() || 'Failed to reset password');
      return res.json();
    },
    onSuccess: () => {
      toast.success('Password reset successful');
      onBack(); // Go back to login
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-gray-200">Reset Password</h2>
      {step === 1 ? (
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-400">{label}</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder={`Enter your ${label.toLowerCase()}`}
          />
          <button
            onClick={() => forgetMutation.mutate()}
            disabled={forgetMutation.isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {forgetMutation.isPending ? 'Sending...' : 'Send OTP'}
          </button>
        </div>
      ) : (
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-400">OTP Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter OTP"
          />
          <label className="block mb-2 text-gray-700 dark:text-gray-400">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter new password"
          />
          <label className="block mb-2 text-gray-700 dark:text-gray-400">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Confirm new password"
          />
          <button
            onClick={() => resetMutation.mutate()}
            disabled={resetMutation.isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {resetMutation.isPending ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      )}
      <button onClick={onBack} className="mt-4 text-blue-600 hover:underline">Back to Login</button>
    </div>
  );
};