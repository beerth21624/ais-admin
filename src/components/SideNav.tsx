import  { useState, useEffect } from 'react';
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiColorSwatch,
  HiUser,
  HiTable,
  HiMenu,
} from "react-icons/hi";

const theme: CustomFlowbiteTheme["sidebar"] = {
  root: {
    base: "h-full",
    inner: "h-full overflow-y-auto overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-4 px-3",
  },
  item: {
    base: "flex items-center justify-center md:justify-start rounded-lg p-2 text-base font-normal text-gray-300 hover:bg-gray-700 transition-all duration-200 ease-in-out",
    active: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg",
    icon: {
      base: "h-6 w-6 flex-shrink-0 transition duration-75",
      active: "text-white",
    },
  },
};

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = window.location.pathname;
  const path = location.split("/")[1];

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Sidebar aria-label="Sidebar with logo branding example" collapsed={isCollapsed} theme={theme}>
      <Sidebar.Items>
        <div className="flex items-center justify-between mb-5 p-2">
          {!isCollapsed && (
            <div className='flex gap-2'>
              <span className="text-2xl font-bold text-white">หลานเอง</span>
              <span className="text-2xl font-bold text-green-500">Admin</span>
            </div>
          )}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="lg:hidden text-white">
            <HiMenu size={24} />
          </button>
        </div>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/"
            icon={HiUser}
            active={path === "character-detail" || path === ""}
          >
            {!isCollapsed && "หลาน"}
          </Sidebar.Item>
          <Sidebar.Item
            href="/manage-knowledge"
            icon={HiColorSwatch}
            active={path === "manage-knowledge" || path === "training"}
          >
            {!isCollapsed && "คลังความรู้"}
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            {!isCollapsed && "Sign In"}
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            {!isCollapsed && "Sign Up"}
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideNav;