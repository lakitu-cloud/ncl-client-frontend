import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  accountType: 'sales' | 'zone';
  onChangeAccountType: () => void;
  onLoginInstead?: () => void;
}

const Register: React.FC<RegisterProps> = ({ accountType, onChangeAccountType }) => {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const [activeTab, setActiveTab] = useState<'Details' | 'Password'>('Details');
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  const [isError, setIsError] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError('');
    setIsSuccess('');

    // Basic validation
    if (!full_name || !email || !phone || !password || !confirm_password) {
      setIsError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (password !== confirm_password) {
      setIsError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setIsError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      // Replace with your actual API endpoint
      // const baseUrl = 'https://your-api.com/api';
      // const response = await fetch(`${baseUrl}/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     full_name,
      //     email,
      //     phone,
      //     password,
      //     role: accountType.toUpperCase(), // e.g., "SALES" or "ZONE"
      //   }),
      // });

      // const data = await response.json();

      // Mock success for now
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API

      setIsSuccess('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setIsError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="text-start text-blue-800 font-poppins">

      {/* Error / Success Messages */}
      {isError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {isError}
        </div>
      )}
      {isSuccess && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          {isSuccess}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {activeTab === 'Details' && (
          <>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1 dark:text-gray-400">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition dark:bg-darkTheme dark:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter name here"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition dark:bg-darkTheme dark:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder=""
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition dark:bg-darkTheme dark:text-gray-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('Password')}
              className="w-full py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition uppercase dark:bg-white dark:text-gray-500"
              disabled={isLoading}
            >
              Continue to Password
            </button>
          </>
        )}

        {activeTab === 'Password' && (
          <>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">Password</label>
              <div className="relative">
                <input
                  type={isPasswordHidden ? 'password' : 'text'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setPasswordHidden(!isPasswordHidden)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                >
                  {isPasswordHidden ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={isConfirmPasswordHidden ? 'password' : 'text'}
                  required
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setConfirmPasswordHidden(!isConfirmPasswordHidden)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                >
                  {isConfirmPasswordHidden ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => setActiveTab('Details')}
                className="flex-1 py-3 border-2 border-blue-800 text-blue-800 font-semibold rounded-lg hover:bg-blue-50 transition"
                disabled={isLoading}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition disabled:opacity-60 uppercase"
              >
                {isLoading ? 'Creating Account...' : 'Register'}
              </button>
            </div>
          </>
        )}
      </form>

      {/* Change Account Type Link */}
      <div className="mt-6 text-center">
        <button
          onClick={onChangeAccountType}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Change account type ({accountType})
        </button>
      </div>
    </section>
  );
};

export default Register;