// components/auth/Login.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useZoneLogin } from '../../hooks/useUser';
import { useSalesLogin } from '../../hooks/useManager';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface LoginProps {
  accountType: 'sales' | 'zone';
  onChangeAccountType: () => void;
}

const Login: React.FC<LoginProps> = ({ accountType, onChangeAccountType }) => {
  {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [email, setEmail] = useState('admin_lindi@ruwasa.com');
  const [phone, setPhone] = useState('0755481857');
  const [password, setPassword] = useState('642911');

  const navigate = useNavigate();

  // Select correct hook based on account type
  const zoneLogin = useZoneLogin();
  const salesLogin = useSalesLogin();

  const { mutate, isPending, isError, error } = accountType === 'zone' ? zoneLogin : salesLogin;

  useEffect(() => {
    if (Cookies.get('auth')) {
      const redirectPath = accountType === 'zone' 
        ? '/manager/zone/dashboard' 
        : '/manager/sales/dashboard';
      navigate(redirectPath);
    }
  }, [navigate, accountType]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast.error('Password is required');
      return;
    }

    if (accountType === 'zone') {
      if (!email) {
        toast.error('Email is required');
        return;
      }
      mutate({ email, password } as any); // adjust type if needed
    } else {
      if (!phone) {
        toast.error('Phone number is required');
        return;
      }
      mutate({ phone, password } as any);
    }
  };

  // Dynamic label and input value
  const identifier = accountType === 'zone' ? email : phone;
  const setIdentifier = accountType === 'zone' ? setEmail : setPhone;
  const placeholder = accountType === 'zone' ? 'Enter your email' : 'Enter your phone number';
  const label = accountType === 'zone' ? 'Email' : 'Phone Number';

  return (
    <main className="max-w-md mx-auto">
      <form onSubmit={handleLogin}>
        {/* Identifier Field */}
        <div className="form-field mb-6">
          <label className="animated-label absolute z-label absolute z-10 ml-[.8rem] mt-[-8px] bg-white dark:bg-gray-900 px-1 text-sm text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <div className="relative mt-2">
            <svg
              className="absolute inset-y-0 right-3 my-auto h-6 w-6 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              {accountType === 'zone' ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-.414.336-.75.75-.75h16.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM2.25 12h19.5m-16.5 5.25h13.5" />
              )}
            </svg>
            <input
              type={accountType === 'zone' ? 'email' : 'tel'}
              autoComplete="off"
              autoFocus
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-lg border bg-transparent py-3 pl-4 pr-12 text-gray-700 dark:text-gray-300 shadow-sm outline-none focus:border-blue-600 transition"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="form-field mb-6">
          <label className="animated-label absolute z-10 ml-[.8rem] mt-[-8px] bg-white dark:bg-gray-900 px-1 text-sm text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative mt-2">
            <button
              type="button"
              className="absolute inset-y-0 right-3 my-auto text-gray-400 hover:text-gray-600"
              onClick={() => setPasswordHidden(!isPasswordHidden)}
            >
              {isPasswordHidden ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </button>
            <input
              type={isPasswordHidden ? 'password' : 'text'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border bg-transparent py-3 pl-4 pr-12 text-gray-700 dark:text-gray-300 shadow-sm outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Links */}
        <div className="flex justify-between text-sm mb-6 text-blue-800 dark:text-blue-400">
          <Link to="/forgot-password" className="underline hover:text-blue-600">
            Forgot Password?
          </Link>
          <button
            type="button"
            onClick={onChangeAccountType}
            className="underline hover:text-blue-600"
          >
            Change account type
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-70 disabled:cursor-not-allowed transition flex items-center justify-center gap-3"
        >
          {isPending ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>

      <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>
          By continuing, you agree to our{' '}
          <a href="#" className="underline">Privacy Policy</a> and{' '}
          <a href="#" className="underline">Terms of Service</a>
        </p>
      </footer>
    </main>
  );
};

export default Login;