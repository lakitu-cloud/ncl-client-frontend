import React, { useState, useEffect } from 'react';
// import { Logo } from '../../assets/dummy';
// import Login from '../p';
import { Link, Outlet } from 'react-router-dom';
import AccountTypeSelector from './select';
import Register from './register';
import Login from './login';
// import { AuthProvider } from './Provider';


export const Auth = () => {
    // const [selectedItem, setSelectedItem] = useState(0);
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [accountType, setAccountType] = useState<'sales' | 'zone' | null>(null);

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

        // Check if user has saved preference
        const saved = localStorage.getItem('preferredAccountType') as 'sales' | 'zone' | null;
        if (saved) {
            setAccountType(saved);
            setShowLogin(true);
        }
    }, []);

    const handleAccountSelect = (type: 'sales' | 'zone', remember: boolean) => {
        setAccountType(type);
        if (remember) {
            localStorage.setItem('preferredAccountType', type);
        } else {
            localStorage.removeItem('preferredAccountType');
        }
        setShowLogin(true);
    };

    const handleBackToSelector = () => {
        setShowLogin(false);
        setAccountType(null);
        setActiveTab("login");
        localStorage.removeItem('preferredAccountType');
    };

    const handleSwitchToRegister = () => {
        setActiveTab('register');
        setShowLogin(false); // Go back to selector first (recommended flow)
        setAccountType(null);
    };

    const handleSwitchToLogin = () => {
        setActiveTab('login');
        setShowLogin(false);
    };

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
                        {/* <Logo width={86} height={86} className="text-[#001a77]" color="#fff" /> */}
                        <p className='text-white text-3xl font-bold font-oswald hidden lg:block'>PPREPAID | METERS</p>
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
                                <h2>Manufacture Products</h2>
                                <p>
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
                                <h2>Install Products</h2>
                                <p>
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
                                <h2>Maintenance Products</h2>
                                <p>
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

                        <h1 className="text-3xl sm:text-5xl font-bold font-oswald text-blue-800 dark:text-gray-200 uppercase">
                            {showLogin && accountType
                                ? `${accountType.toUpperCase()} MANAGER ${activeTab === 'login' ? 'LOGIN' : 'REGISTRATION'}`
                                : activeTab === 'login'
                                    ? 'Welcome Back!'
                                    : 'Create Your Account'}
                        </h1>

                        {accountType === "zone" ? (
                            <>
                                <p className="mt-3 text-semibold sm:text-lg  font-poppins">
                                    You are invited
                                </p>
                                <p className='text-flex text-sm my-2'>Prepaid Water Meter Management Sytstem is design to converniently monitor and manage all your Meters</p>
                                {activeTab === 'login' && (
                                    <button
                                        type="button"
                                        onClick={() => { setActiveTab('register'); setShowLogin(true) }}
                                        className="dark:bg-white dark:text-black bg-blueTheme text-white px-4 py-2 rounded-md uppercase mt-2 shadown-sm hover:text-gray-800 ">
                                        <span>Register</span>
                                    </button>
                                )}
                            </>
                        ) : <p className='text-flex text-sm my-2'>PWM Management Sytstem is design to converniently monitor and manage all your prepaid water Meters</p>
                        }


                        <div className='mt-4 border-b-[1px] border-gray-400'></div>
                    </div>
                </div>

                <div className="short-auth-form has-lang-select">
                  <Outlet/>
                    {/* Show selector first, or login */}
                    {!showLogin ? (
                        <AccountTypeSelector onSelect={handleAccountSelect} />
                    ) : ( 
                        <> 
                            {activeTab === 'login' && (
                                <Login accountType={accountType!} onChangeAccountType={() => {
                                    setShowLogin(false);
                                    // Optional: clear form if you want
                                    setAccountType(null);
                                }} />
                            ) }
                            {activeTab==='register' && accountType==="zone" && (
                                 <Register
                                    accountType={accountType!}
                                    onChangeAccountType={handleBackToSelector}
                                    onLoginInstead={handleSwitchToLogin}
                                />
                            )} 
                            
                            {/* <nav className="auth-nav">
                                {[{ label: 'Login' }, { label: 'Register' }].map(
                                    (item, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setActiveTab(item.label)}
                                            aria-current="page"
                                            className={`auth-nav-item router-link-active ${activeTab === item.label ? 'link-active' : ''}`}
                                        >
                                            <a className="cursor-pointer rounded-lg px-4 py-2.5 text-lg font-medium duration-150 hover:bg-gray-50 hover:text-blue-600 active:bg-gray-100">
                                                {item.label}
                                            </a>
                                        </div>
                                    )
                                )}
                            </nav>  */}


                        </>

                    )} 


                </div>
            </aside>
        </section>
    );
};

