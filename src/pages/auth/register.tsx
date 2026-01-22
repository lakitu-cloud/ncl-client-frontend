import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRegister } from '../../hooks/useUser';


const Register = () => {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ppu, setPpu] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const [activeTab, setActiveTab] = useState<'Details' | 'Password'>('Details');
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  const { mutate, isPending, isError, error } = useRegister();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!full_name || !email || !phone || !password || !confirm_password || !ppu) {
      toast.error('All fields are required');
      return;
    }

    if (password !== confirm_password) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const ppl = parseInt(ppu)

    mutate({
      name: full_name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      ppl,
      password,
    });
  };

  return (
    <section className="text-start font-poppins">
      <form onSubmit={handleSubmit} className="space-y-5">
        {activeTab === 'Details' && (
          <>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1 dark:text-whiteText ">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition dark:bg-blackText dark:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 dark:text-whiteText  mb-1">Full Name</label>
              <input
                type="text"
                required
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter name here"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition dark:bg-blackText dark:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 dark:text-whiteText  mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition dark:bg-blackText dark:text-whiteText"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 dark:text-whiteText  mb-1">Price Per Unit</label>
              <input
                type="number"
                required
                placeholder="Set Price Per Unit"
                value={ppu}
                onChange={(e) => setPpu(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition dark:bg-blackText dark:text-whiteText"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Set the amount you charge per unit (e.g. <span className="font-medium">2000</span>).
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('Password')}
              className="px-4 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition uppercase dark:bg-white dark:text-gray-500"
            >
              Continue
            </button>
          </>
        )}

        {activeTab === 'Password' && (
          <>
            <div>
              <label className="block text-sm font-medium text-blue-800 dark:text-whiteText mb-1">Password</label>
              <div className="relative">
                <input
                  type={isPasswordHidden ? 'password' : 'text'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition dark:focus:border-whiteText dark:focus:ring-whiteText dark:bg-blackText dark:text-gray-500"
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
              <label className="block text-sm font-medium text-blue-800 dark:text-whiteText mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={isConfirmPasswordHidden ? 'password' : 'text'}
                  required
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:border-whiteText dark:focus:ring-whiteText dark:bg-blackText dark:text-gray-500 outline-none transition"
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

            <div className="flex justify-between gap-4 mt-8">
              <button
                type="button"
                onClick={() => setActiveTab('Details')}
                className="py-3 px-6 rounded-md max-w-lg justify-end bg-blue-800 hover:bg-blue-700 disabled:bg-blue-400 text-whiteText font-semibold font-oswald dark:bg-whiteText dark:text-blackText text-md transition flex items-center gap-2"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isPending}
                aria-disabled={isPending}
                className={`
                    py-3 px-6 rounded-md max-w-lg justify-end
                    bg-blue-800 hover:bg-blue-700 active:bg-blue-900
                    disabled:bg-blue-400 disabled:cursor-not-allowed
                    text-whiteText font-semibold font-oswald 
                    dark:bg-whiteText dark:text-blackText dark:hover:bg-gray-100
                    text-md transition-all duration-200
                    flex items-center justify-center gap-2 min-w-[140px]
                  `}
              >
                {isPending ? (
                  <>
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Processing...</span>
                  </>
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </>
        )}
      </form>

      {/* Change Account Type Link */}
      {/* <div className="mt-6 text-center">
        <button
          onClick={onChangeAccountType}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Change account type ({accountType})
        </button>
      </div> */}
    </section>
  );
};

export default Register;