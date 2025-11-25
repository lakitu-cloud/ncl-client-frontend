import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SOS: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword ] = useState<string>('')
  const [emergencyContact, setEmergencyContact] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'Details' | 'Password'>('Details');
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState<boolean>(true);
  const [isError, setIsError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError('');
    setIsSuccess('');

    if (password !== confirmPassword) {
      setIsError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setIsError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Replace with your actual SOS registration endpoint
      const response = await fetch('/api/sos/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, password
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setIsSuccess('SOS Account created successfully!');
        setTimeout(() => navigate('/sos/dashboard'), 2000);
      } else {
        setIsError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setIsError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
       <div>
                <h1 className="auth-form-title font-oswald">ZONE MANAGER RMS</h1>
                <p className="auth-form-subtitle font-poppins">
                    MMS is design to conveniently monitor and manage all of your
                    Water Meter (MMS)!.
                </p>
            </div>
     

      {isError && <p className="text-red-600 bg-red-50 p-3 rounded-lg text-sm mb-4">{isError}</p>}
      {isSuccess && <p className="text-green-600 bg-green-50 p-3 rounded-lg text-sm mb-4">{isSuccess}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'Details' && (
          <>
                 <div className="form-field">
                    <label className="animated-label absolute z-10 ml-[.8rem] mt-[-8px] inline-block text-nowrap bg-transparent bg-white bg-gradient-to-tr px-1 text-sm text-gray-400 ease-in-out duration-800">
                        Email or Phone
                    </label>
                    <div className="relative mt-2 max-w-full">
                        <svg
                            className="absolute inset-y-0 right-3 my-auto h-6 w-6 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                        </svg>
                        <input
                            type="text"
                            name="username"
                            autoComplete="off"
                            id="username"
                            autoFocus={true}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full rounded-lg border bg-transparent py-2 pl-3 pr-12 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
                        />
                    </div>
                </div>


            <button
              type="button"
              onClick={() => setActiveTab('Password')}
              className="w-full py-3 mt-6 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition duration-200"
            >
              Continue to Password
            </button>
          </>
        )}

        {activeTab === 'Password' && (
          <>
            
             <div className="mt-8">
                    <label className="animated-label absolute z-10 ml-[.8rem] mt-[-8px] inline-block text-nowrap bg-transparent bg-white bg-gradient-to-tr px-1 text-sm text-gray-400 ease-linear">
                        Password
                    </label>
                    <div className="relative mt-2 max-w-full">
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 my-auto text-gray-400 active:text-gray-600"
                            onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                        >
                            {isPasswordHidden ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    />
                                </svg>
                            )}
                        </button>
                        <input
                            type={isPasswordHidden ? 'password' : 'text'}
                            // placeholder="Enter your password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full rounded-lg border bg-transparent py-2 pl-3 pr-12 text-gray-500 shadow-sm outline-none focus:border-blue-600"
                        />
                    </div>
                </div>

            <div>
              <label className="block text-blue-800 font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={isConfirmPasswordHidden ? 'password' : 'text'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 text-gray-700 bg-transparent outline-none border-2 border-gray-300 focus:border-red-600 rounded-lg transition"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
                >
                  {isConfirmPasswordHidden ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="flex-1 py-3 border-2 border-gray-400 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading || !password || !confirmPassword}
                className="flex-1 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            </div>
          </>
        )}
      </form>
    </section>
  );
};

export default SOS;