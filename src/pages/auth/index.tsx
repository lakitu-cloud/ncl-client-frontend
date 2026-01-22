import React, { useState, useEffect } from 'react';
// import { Logo } from '../../assets/dummy';
// import Login from '../p';
import { Link, Outlet } from 'react-router-dom';
import AccountTypeSelector from './select';
import Register from './register';
import Login from './login';
import { useApp } from '../../context/ContextProvider';
import { Logo } from '../../assets/Logo';
import { ChangePassword } from './password';

export const Auth = () => {
    const { accountType, setAccountType } = useApp();
    const [activeTab, setActiveTab] = useState<'login' | 'register' | 'password'>('login');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [showLogin, setShowLogin] = useState(true);

    const backgroundImages = [
        require('../../assets/images/background2.png'),
        require('../../assets/images/background1.png'),
        require('../../assets/images/download.jpeg'),
        require('../../assets/images/background.png'),
    ];

    useEffect(() => {
        // Randomly select a background image
        const randomImage =
            backgroundImages[
            Math.floor(Math.random() * backgroundImages.length)
            ];
        setBackgroundImage(randomImage);

        if (accountType) {
            setShowLogin(true);
        }
    }, []);


    return (
        <section className="auth-view dark:bg-darkTheme">
            <section
                className="auth-bg default text-gradient"
                style={{
                    backgroundImage: `url(${backgroundImage}), linear-gradient(0deg, #181818 12.29%, rgba(25, 25, 25, .2) 32.01%, rgba(25, 25, 25, 0) 99.98%)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%'

                }}
            >
                <div className="app-logo">
                    <div className='flex absolute top-8 left-8 items-center '>
                        <Logo width={86} height={86} className="text-[#001a77]" color="#fff" />
                        <p className='text-white text-3xl font-bold font-oswald hidden lg:block '>PREPAID | METERS</p>
                    </div>

                    <h1 className="app-title font-oswald">
                        METER MANAGEMENT SYSTEM
                    </h1>
                    <div>
                        <div className="about-btn font-oswald">
                            <Link to="" target="_blank">
                                About Us
                            </Link>
                        </div>
                        <div className="auth-description">
                            <div>
                                <h2 className='font-oswald'>Manufacture Products</h2>
                                <p className='font-poppins'>
                                    Our prepaid water meters are engineered to
                                    deliver reliable, secure, and swift
                                    deployment of water management solutions.
                                    These devices empower you to establish a
                                    robust and efficient water distribution
                                    infrastructure, complete with remote
                                    monitoring and management capabilities...
                                </p>
                                <a href="#" target="_blank" className="link">
                                    Read More
                                </a>
                            </div>

                            <div>
                                <h2 className='font-oswald'>Install Products</h2>
                                <p className='font-poppins'>
                                    Our advanced installation tools facilitate
                                    the seamless integration of prepaid water
                                    meters into existing systems. The intuitive
                                    interface and comprehensive support ensure
                                    quick setup and operation, minimizing
                                    downtime and maximizing efficiency...
                                </p>
                                <a href="#" target="_blank" className="link">
                                    Read More
                                </a>
                            </div>

                            <div>
                                <h2 className='font-oswald'>Maintenance Products</h2>
                                <p className='font-poppins'>
                                    Inspired by our partners' innovative
                                    approaches, we offer prepaid water meters
                                    that are dependable, secure, and
                                    user-friendly. Discover how our products can
                                    enhance your water management systems across
                                    various sectors, ensuring reliable
                                    performance and ease of use...
                                </p>
                                <a href="#" target="_blank" className="link">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <aside className="auth-form">
                <div className="w-full text-center lg:hidden sm:hidden dark:text-white">
                    <div className="absolute left-0 right-0 top-8 flex items-center justify-center">
                        {/* <Logo width={86} height={86} className="text-[#001a77] dark:text-white" 
                        color="#001a77" /> */}
                        <p className="font-oswald text-3xl font-bold text-[#001a77] dark:text-white">
                            NYIRENDAS | METERS
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mt-20 ">
                    {/* Title */}
                    <div className="text-align mb-4 sm:mb-8 font-poppins text-gray-700 dark:text-gray-400 ">
                        {/*<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-oswald text-blue-800 dark:text-gray-300 uppercase">
                            {accountType == null ? "Welcome Back!" : `${accountType} manager`}
                        </h1>
                        */}

                        <h1 className="text-3xl sm:text-5xl font-bold mb-4 font-oswald text-blue-800 dark:text-gray-200 uppercase">
                            {showLogin && accountType
                                ? ` ${activeTab === 'login' ? 'LOGIN' : 'REGISTRATION'}`
                                : activeTab === 'login' ? 'Welcome Back!' : 'Create Your Account'}
                        </h1>

                        {accountType === "zone" ? (
                            <>
                                {/* <p className="mt-3 text-semibold sm:text-lg  font-poppins">
                                    You are invited
                                </p> */}
                                <p className='text-flex text-sm my-2'>Prepaid Water Meter Management System is design to conveniently monitor and manage all your Meters</p>
                                {activeTab === 'login' ? (
                                    <button
                                        type="button"
                                        onClick={() => { setActiveTab('register'); setShowLogin(true) }}
                                        className="dark:bg-white dark:text-black bg-blueTheme text-white px-4 py-2 rounded-md uppercase mt-2 shadow-sm hover:text-gray-800 ">
                                        <span>Register</span>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => { setActiveTab('login'); setShowLogin(true) }}
                                        className="dark:bg-white dark:text-black bg-blueTheme text-white px-4 py-2 rounded-md uppercase mt-2 shadow-sm hover:text-gray-800 ">
                                        <span>Back</span>
                                    </button>
                                )}
                            </>
                        ) : <p className='text-flex text-sm my-2'>PWM Management System is design to conveniently monitor and manage all your prepaid water Meters</p>
                        }


                        <div className='mt-4 border-b-[1px] border-gray-400'></div>
                    </div>
                </div>

                <div className="short-auth-form has-lang-select">

                    <Outlet />
                    {/* Show selector first, or login */}
                    {!showLogin ? (
                        <AccountTypeSelector onSelect={(type: 'sales' | 'zone') => {
                            setAccountType(type);
                            setShowLogin(true);
                        }} />
                    ) : (
                        <>
                            {activeTab === 'login' && (
                                <Login 
                                    accountType={accountType!} 
                                    onChangeAccountType={() => {
                                        setShowLogin(false);
                                        setAccountType(null);
                                }} />
                            )}

                            {activeTab === 'register' && accountType === "zone" && (
                                <Register />
                            )}
                           

                        </>

                    )}

                </div>
            </aside>
        </section>
    );
};

