import React from "react";
import { getNavigation } from "../../assets/dummy"
import { Logo } from "../../assets/Logo";
import { Link } from "react-router-dom";
import {
  IoHelpCircleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
// import { useAuth } from "../../context/AuthProvider";
import "./sidebar.css";
import { useAuth } from "../../context/AuthProvider";
import { motion } from "framer-motion";

const navigation = getNavigation();

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  return (
    <>
      <nav
        className="fixed top-0 left-0 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 
        text-white lg:w-18 md:w-14 hover:w-56 lg:block md:block sm:hidden xs:hidden h-full border-r z-10 
        space-y-8 animate-shimmer border-2 border-transparent hover:border-blue-400 transition-all 
        duration-1000 group dark:bg-white"
        style={{
          backgroundSize: "400% 400%",
          backgroundImage:
            "linear-gradient(-45deg, #2563eb 0%, #1d4ed8 25%, #1e40af 50%, #1e3a8a 100%)",
          animation: "shimmer 8s ease infinite",
        }}
      >
        <div className="flex flex-col h-full mt-2">
          <div className="flex items-center justify-center h-24 "> {/* Added justify-center for collapsed state */}
            <Logo
              width={72}
              height={72}
              color="white"
              className="text-white"
            />

          {/* Brand Name - visible only on hover (when expanded) */}
          {/* <p className="ml-4 font-bold text-2xl text-white font-oswald uppercase whitespace-nowrap 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            Nyirendas
          </p> */}
          </div>

          {/* <div className=" border-b-[1px]"></div> */}
          <div className="flex-1 flex flex-col h-full mt-2">
            <ul className="px-4 text-sm font-medium flex-1 text-center justify-center">
              {navigation.map((item, idx) => (
                <li key={idx} className="text-white">
                  <a
                    href={item.href}
                    className="flex items-center space-x-4 py-4 hover:translate-x-2"
                  >
                    <p className="mb-1 justify-center duration-300 translate-x-0 text-white">
                      {item.icon}
                    </p>
                    <p className="uppercase font-semibold font-oswald">
                      {item.name}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <ul className="px-4 pb-4 text-sm font-medium">
                <li>
                  <a className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg">
                    <div className="text-gray-500">
                      {/* @ts-ignore */}
                      <IoHelpCircleOutline className="w-6 h-6" />
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="settings"
                    className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg"
                  >
                    <div className="text-gray-500">
                      {/* @ts-ignore */}
                      <IoSettingsOutline className="w-6 h-6" />
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="/auth"
                    onClick={logout}
                    className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg"
                  >
                    <div className="text-gray-500">
                      {/* @ts-ignore */}
                      <IoLogOutOutline className="w-6 h-6" />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* <button
                onClick={toggleSidebar}
                className="fixed top-4 right-4 w-10 h-10 bg-gray-800 text-white flex items-center justify-center rounded-full focus:outline-none"
            >
                {isExpanded ? "-" : "+"}
            </button> */}
    </>
  );
};

export default Sidebar;
