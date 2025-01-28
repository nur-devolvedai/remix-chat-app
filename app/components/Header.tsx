

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import athena2Logo from '@/public/Athena2.png'
import { emit } from 'process'
import { Link } from '@remix-run/react';
import { authLogout } from "var";
import { useNavigate } from "@remix-run/react";
interface HeaderProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}
const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        
        try {
            
            if (typeof window !== 'undefined') {
                const email = Cookies.get('email');
                // setUserEmail(email)
                const token = Cookies.get('token');

                const response = await fetch(authLogout, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ email }),
                });
                const res = await response.json();

                if (response.status === 200) {
                    // Remove all cookies
                    document.cookie.split(";").forEach((cookie) => {
                        const [name] = cookie.split("=");
                        Cookies.remove(name.trim());
                    });
                    localStorage.clear();
                    sessionStorage.clear();
                    // Invalidate the session
                    // await signOut({ callbackUrl: "/" }); // Redirect to /auth after logout
                    navigate("/"); // Redirect to home after logout
                    // redirect("/")
                }
            }
        } catch (error: any) {
            console.error('Error fetching data:', error.message);
            // setError(error);
        }
    };

    const handleClick = async () => {
        try {
            navigate("/chat");
        } catch (error) {
          console.error("Error handling new chat click:", (error as Error).message);
        }
      };

    return (
        <div
        >
            <div className={`flex w-full h-[4.25rem] items-center justify-between px-4 bg-[#f9f9f9]  `}>
                <>
                    <div className={`md:flex items-center space-x-2 hidden ${isSidebarOpen ? "ml-64" : ""}`}>
                        <img
                            src="/logo-v2.png"
                            alt="My Image"
                            width="40"
                            height="40"
                        />
                        <div className=' hidden md:block'>
                            <Link to="/chat"
                                className="flex flex-row items-center justify-center md:justify-center   h-20 w-full">
                                <h1 className=' w-auto h-auto text-2xl font-bold text-[#7d7d7d]'>Athena 2.0</h1>
                            </Link>
                        </div>
                    </div>
                </>
                <div className="md:flex flex-row hidden">
                    <div className="flex flex-row rounded-md items-center justify-center">

                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className=" m-2" onClick={toggleDropdown}>
                                {/* <div className="flex items-center justify-center overflow-hidden rounded-full"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" width="32" height="32"><circle cx="18" cy="18" r="18" fill="#3c46ff"></circle><path fillRule="evenodd" clipRule="evenodd" d="m7.358 14.641 5.056-5.055A2 2 0 0 1 13.828 9h8.343a2 2 0 0 1 1.414.586l5.056 5.055a2 2 0 0 1 .055 2.771l-9.226 9.996a2 2 0 0 1-2.94 0l-9.227-9.996a2 2 0 0 1 .055-2.77Zm6.86-1.939-.426 1.281a2.07 2.07 0 0 1-1.31 1.31l-1.28.426a.296.296 0 0 0 0 .561l1.28.428a2.07 2.07 0 0 1 1.31 1.309l.427 1.28c.09.27.471.27.56 0l.428-1.28a2.07 2.07 0 0 1 1.309-1.31l1.281-.427a.296.296 0 0 0 0-.56l-1.281-.428a2.07 2.07 0 0 1-1.309-1.309l-.427-1.28a.296.296 0 0 0-.561 0z" fill="#fff"></path></svg></div> */}
                                <div className="flex items-center justify-center overflow-hidden rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='gray' width="32" height="32">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                                    </svg>
                                </div>
                            </div>
                            {/* Dropdown Section */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 z-10 mt-6 mr-4 bg-white  rounded-md shadow-lg">
                                    <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
                                        <li className='my-2'>
                                            <Link
                                                to={"https://changelog.devolvedai.com/"} target="_blank"
                                                className="flex items-center p-2 text-black bg-white hover:bg-gray-100 rounded-md transition-colors duration-300 w-full"
                                            >
                                                <div className="w-6 h-6 mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="pt-1" width="20" height="20" fill="black" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                                                </div>

                                                <span className="text-sm font-medium">Athena changelog</span>
                                            </Link>
                                        </li>
                                        <li className='mb-3'>
                                            <button
                                                onClick={handleClick}
                                                className="flex items-center p-2 text-black bg-white hover:bg-gray-100 rounded-md transition-colors duration-300 w-full"
                                            >

                                                <div className="w-6 h-6 mr-2">

                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="icon-xl-heavy"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" fill="currentColor"></path></svg>

                                                </div>

                                                <span className="text-sm font-medium">New Chat</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button

                                               onClick={handleLogout} className="flex items-center p-2 text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors duration-300 w-full"
                                            >

                                                <div className="w-6 h-6 mr-2">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0"><path fillRule="evenodd" clipRule="evenodd" d="M6 4C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H10C10.5523 20 11 20.4477 11 21C11 21.5523 10.5523 22 10 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H10C10.5523 2 11 2.44772 11 3C11 3.55228 10.5523 4 10 4H6ZM15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071C14.9024 16.3166 14.9024 15.6834 15.2929 15.2929L17.5858 13H11C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11H17.5858L15.2929 8.70711C14.9024 8.31658 14.9024 7.68342 15.2929 7.29289Z" fill="currentColor"></path></svg>
                                                </div>

                                                <span className="text-sm font-medium">Logout</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

