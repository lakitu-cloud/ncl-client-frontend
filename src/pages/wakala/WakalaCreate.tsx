import React, { useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useApp } from '../../context/ContextProvider';
import { PopupAlert } from '../../components/Alert'; // Assuming PopupAlert is in the same folder
import { baseUrl } from '../../config/urls';
// import { apiFetch } from '../../api/apiFetch';

const WakalaCreate = () => {
    const { setIsButtonPress } = useApp();
    const [successMessge, setSuccessMessage] = useState<string | null>('');
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imei, setImei] = useState('');
    const [float, setFloat] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage(null);

        try {
            const response = await fetch(`${baseUrl}/wakala`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, imei, float, password }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setSuccessMessage('Wakala created successfully!');
                setIsButtonPress(false);
            } else {
                setErrorMessage(data.message || 'Failed to create wakala.');
            }
        } catch (error: any) {
            setErrorMessage(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-xl p-4">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-oswald uppercase">
                        Create New Wakala
                    </h3>
                    <button
                        onClick={() => setIsButtonPress(false)}
                        className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        aria-label="Close modal"
                    >
                        <FiXCircle className="w-5 h-5 hover:text-red-500" />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {errorMessage && <p className='bg-red-300 text-red-500 px-4 py-2 text-sm '>{errorMessage}</p>}

                <form onSubmit={handleSubmit} className="p-4 space-y-4 font-poppins">
                    <div className="flex w-full space-x-2 flex-wrap">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                name="name"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="sr-only">Phone</label>
                            <input
                                name="phone"
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Phone"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <label htmlFor="imei" className="sr-only">IMEI</label>
                        <input
                            name="imei"
                            type="number"
                            id="imei"
                            value={imei}
                            onChange={(e) => setImei(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="IMEI"
                        />
                    </div>

                    <div>
                        <input
                            name="float"
                            type="number"
                            id="float"
                            value={float}
                            onChange={(e) => setFloat(parseFloat(e.target.value))}
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Float"
                            onKeyDown={(e) => {
                                if (e.key === 'e' || e.key === '+' || e.key === '-') {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-blue-700 text-white mt-4 font-oswald"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Add New Wakala'}
                    </button>
                </form>
                {successMessge && <PopupAlert message={successMessge} />}
            </div>
        </div>
    );
};

export default WakalaCreate;
