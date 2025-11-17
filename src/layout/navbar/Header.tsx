import React from 'react';
// import { useAuth } from '../../context/AuthProvider';
import { IoChevronDown, IoChevronUp, IoLanguageOutline, IoLogOutOutline } from 'react-icons/io5';
import { MdNotificationsNone } from 'react-icons/md';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

interface HeaderProps {
    title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    // const { setShowTokenTopUpUI, setIsButtonPress } = useApp();
    const [email, setEmail] = React.useState<string | undefined>();
    // const { logout } = useAuth();

    // const nameStored = localStorage.getItem('name');
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    // const [fontSize, setFontSize] = useState('normal');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = React.useState(false);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = React.useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = React.useState(false);

    React.useEffect(() => {
        const userEmail = Cookies.get('email');
        if (userEmail) {
            setEmail(userEmail);
        }
    }, []);

    // const toggleDarkMode = () => {
    //     setIsDarkMode(!isDarkMode);
    //     document.body.classList.toggle('dark', !isDarkMode);
    // };

    // const handleFontSizeChange = () => {
    //     const newFontSize = fontSize === 'normal' ? 'large' : 'normal';
    //     setFontSize(newFontSize);
    //     document.body.style.fontSize = newFontSize === 'normal' ? '1rem' : '1.25rem';
    // };

    const handleNotification = () => {
        setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
        setIsAvatarDropdownOpen(false)
        setIsLanguageDropdownOpen(false)
    }

    console.log()

    // const refreshPage = () => {
    //     window.location.reload();
    // };

    const handleLogout = () => {
        // logout();
    };

    return (
        <header className="mt-2 font-poppins border-b-[1px] rounded-md">
            <section className="flex md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                {/* Title Section */}
                <div className="flex gap-2 max-w-xs md:w-auto">
                    <Link to="/dashboard" className="text-blue-800 text-nowrap hidden md:inline-block text-md md:text-2xl font-bold font-oswald">
                        ZONE MANAGER
                       
                    </Link>
                    
                    <div className='border-r-4 border-blue-800 h-8'></div>
                    <p className="text-blue-800 font-oswald text-md md:text-2xl text-nowrap font-bold">{title}
                   
                    </p>
                </div>

                {/* User Info Section */}
                <div className="flex md:hidden justify-end w-full">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        {isMobileMenuOpen ? (<HiOutlineX className="w-6 h-6" />) : (<HiOutlineMenu className="w-6 h-6" />)}
                    </button>
                </div>
                <div className="md:flex hidden items-center gap-x-2 text-gray-500 ">

                    {/* Dark Mode Toggle */}
                    {/* <button onClick={toggleDarkMode} className="relative hover:text-blue-800 hover:bg-blue-200 rounded-full hover:translate-y-2 duration-300 cursor-point active:text-gray-800">
                        <FiMoon className="w-4 h-4" />
                    </button> */}

                    {/* Change Font Size */}
                    {/* <button onClick={handleFontSizeChange} className="relative hover:text-blue-800 hover:bg-blue-200 rounded-full hover:translate-y-2 duration-300 cursor-point active:text-gray-800">
                        <MdTextFields className="w-4 h-4" />
                    </button> */}

                    {/* Refresh Page */}
                    {/* <button onClick={refreshPage} className="relative hover:text-blue-800 hover:bg-blue-200 rounded-full hover:translate-y-2 duration-300 cursor-point active:text-gray-800">
                        <FiRefreshCw className="w-4 h-4" />
                    </button> */}

                    {/* Change Language */}
                    {/* <button className="relative hover:text-blue-800 hover:bg-blue-200 rounded-full hover:translate-y-2 duration-300 cursor-point active:text-gray-800">
                        <IoLanguageOutline onClick={() => {setIsLanguageDropdownOpen(!isLanguageDropdownOpen); setIsNotificationDropdownOpen(false)}} className="w-4 h-4" />

                        {isLanguageDropdownOpen && (
                            <div className="absolute right-0 left-0 flex flex-col mt-2 w-24 bg-gray-50 shadow-md rounded-md">
                                <button className="py-2 px-4 flex items-center space-x-2 hover:bg-blue-50">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                                        alt="English"
                                        className="w-6 h-6 rounded-md"
                                    />
                                    <p className='font-semibold'>ENG</p>
                                </button>
                                <button className="py-2 px-4 flex items-center space-x-2 hover:bg-blue-50">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg"
                                        alt="Swahili"
                                        className="w-6 h-6 rounded-md"
                                    />
                                    <p className='font-semibold'>SW</p>

                                </button>
                            </div>
                        )}
                    </button> */}

                    {/* Notifications with Dropdown */}
                    <div onClick={handleNotification}
                            className="relative hover:text-blue-800 hover:bg-blue-200 rounded-full hover:translate-y-2 duration-300 cursor-point active:text-gray-800">
                        <div className='flex items-center space-x-2'>
                        <MdNotificationsNone
                            className="w-6 h-6 cursor-pointer"
                        />
                        <p>Notifications</p>
                        </div>
                       
                        {isNotificationDropdownOpen && (
                            <div className="absolute right-[-32px]  w-72 bg-gray-50 shadow-md rounded-md">
                                <p className="bg-white px-4 py-2">No new notifications</p>
                            </div>
                        )}
                    </div>


                    {/* Avatar with Dropdown */}
                    <div className="relative hover:text-blue-800 p-2 rounded-full hover:translate-y-2 duration-300 cursor-point active:text-gray-800">
                        <div onClick={() => {setIsAvatarDropdownOpen(!isAvatarDropdownOpen); setIsNotificationDropdownOpen(false)}}
                            className='flex items-center text-gray-800 space-x-2  rounded-md '>
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full cursor-pointer"
                            />
                            <p className="hidden text-xs md:block lowercase">
                                {email}
                            </p>
                            {isAvatarDropdownOpen ? (<IoChevronUp />) : (<IoChevronDown />)}
                        </div>

                        {isAvatarDropdownOpen && (
                            <div className="absolute right-0 w-48 text-gray-900 bg-white border border-gray-200 rounded-lg ">
                            <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                </svg>
                                Profile
                            </button>
                            <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
                                </svg>
                                Settings
                            </button>
                            <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                                    <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor"/>
                                    <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor"/>
                                </svg>
                                Messages
                            </button>
                            <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                </svg>
                                Download
                            </button>
                        </div>
                        )}
                    </div>
                </div>

            </section>
            {isMobileMenuOpen && (
                <div className='md:hidden absolute right-0 flex flex-col mt-8 w-48 bg-gray-50 text-gray-600 shadow-md rounded-md'>
                    <div className=' hover:bg-blue-100 py-2 border-b-[1px] border-gray-300'>
                        <button type='button' onClick={handleNotification} className='w-full flex items-center justify-between space-x-2 px-4'>
                            <MdNotificationsNone className='w-6 h-6' />
                            <p>Notification</p>
                            {isNotificationDropdownOpen ? (<IoChevronUp className='w-6 h-6 hover:-translate-y-2 rounded-full hover:bg-blue-100 duration-300' />) : (<IoChevronDown className='w-6 h-6 hover:translate-y-2 rounded-full hover:bg-blue-100 duration-300' />)}
                        </button>
                        {isNotificationDropdownOpen && (
                            <div className="absolute right-0 left-0 mt-2 w-72 bg-gray-50 shadow-md rounded-md">
                                <p className="bg-white px-4 py-2">No new notifications</p>
                            </div>
                        )}
                        
                    </div>
                    <div className=' hover:bg-blue-100 py-2 border-b-[1px] border-gray-300'>
                        <button type='button' 
                            onClick={() => { setIsLanguageDropdownOpen(!isLanguageDropdownOpen); setIsNotificationDropdownOpen(false) }} 
                            className='w-full flex items-center justify-between space-x-2 px-4'>
                            <IoLanguageOutline className="w-6 h-6" />
                            <p>Language</p>
                            {isLanguageDropdownOpen ? (<IoChevronUp className='w-6 h-6 hover:-translate-y-2 rounded-full hover:bg-blue-100 duration-300' />) : (<IoChevronDown className='w-6 h-6 hover:translate-y-2 rounded-full hover:bg-blue-100 duration-300' />)}

                        </button>
                        
                        {isLanguageDropdownOpen && (
                            <div className="absolute z-10 right-0 left-0 flex flex-col mt-2 w-full bg-gray-50 shadow-md">
                                <button className="py-2 px-4 flex items-center space-x-2 hover:bg-blue-50">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                                        alt="English"
                                        className="w-6 h-6 rounded-md"
                                    />
                                    <p className='font-semibold'>ENGLISH</p>
                                </button>
                                <button className="py-2 px-4 flex items-center space-x-2 hover:bg-blue-50">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg"
                                        alt="Swahili"
                                        className="w-6 h-6 rounded-md"
                                    />
                                    <p className='font-semibold'>SWAHILI</p>

                                </button>
                            </div>
                        )}
                    </div>

                    <div className='py-2 border-b-[1px]'> 
                        <button type='button' className="inline-flex py-2 px-4 items-center cursor-pointer">
                            <input type="checkbox" value="" onChange={(e) => setIsDarkMode(!isDarkMode) } className=""/>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                                </span>
                        </button>

                    </div>
                    
                    {/* log out */}
                    <div className='hover:bg-blue-100 text-red-500 py-2 border-b-[1px] border-gray-300'>
                        <button type='button' onClick={handleLogout} className='w-full flex items-center space-x-2 px-4'>
                            <IoLogOutOutline className="w-6 h-6"/>
                            <p>Logout</p>
                        </button>
                    </div>

                    {/* account */}
                    <div className='hover:bg-blue-100 py-2 border-b-[1px] border-gray-300'>
                        <button type='button' className='w-full flex items-center space-x-2 px-4'>
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full cursor-pointer"
                            />
                            <p className="text-sm md:block rounded-lg font-semibold uppercase">
                                Account
                            </p>
                    </button>
                   </div>
                </div>
            )}
        </header>
    );
};

export default Header;
