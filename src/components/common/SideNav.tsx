import type { CustomFlowbiteTheme } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)

import {
  HiArrowSmRight,
  HiColorSwatch,
  HiMenu,
  HiUser,
  HiHome,
  HiExclamationCircle,
  HiPhone,
  HiNewspaper
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsAuthenticated(!!token);
  }
    , [token]);
 
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleLogout() {
    MySwal.fire({
      icon: 'question',
      title: 'ออกจากระบบ',
      text: 'คุณต้องการออกจากระบบหรือไม่?',

      showDenyButton: true,
      confirmButtonText: `ใช่`,
      denyButtonText: `ไม่`,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    })

  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }



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
          {isAuthenticated && (
            <>
              <Sidebar.Item
                href="/"
                icon={HiHome}
                active={path === ""}
                tooltip="หน้าแรก"
              >
                {!isCollapsed && "แดชบอร์ด"}
              </Sidebar.Item>
              <Sidebar.Item
                href="/manage-character"
                icon={HiUser}
                active={path === "character-detail" || path === "manage-character"}
                tooltip="ลูกค้า"
              >
                {!isCollapsed && "หลาน"}
              </Sidebar.Item>
              <Sidebar.Item
                href="/manage-knowledge"
                icon={HiColorSwatch}
                active={path === "manage-knowledge" || path === "training"}
                tooltip="คลังความรู้"
              >
                {!isCollapsed && "คลังความรู้"}
              </Sidebar.Item>
              <Sidebar.Item
                href="/problem"
                icon={HiExclamationCircle}
                active={path === "problem"}
                tooltip="ปัญหา"
              >
                {!isCollapsed && "ปัญหา"}
              </Sidebar.Item>
              <Sidebar.Item
                href="/call-center"
                icon={HiPhone}
                active={path === "call-center" || path === "call-center-detail" }
                tooltip="Call Center"
              >
                {!isCollapsed && "Call Center"}
              </Sidebar.Item>
              <Sidebar.Item
                href="/news"
                icon={HiNewspaper}
                active={path === "news"}
                tooltip="ข่าว"
              >
                {!isCollapsed && "ข่าว"}
              </Sidebar.Item>
            </>
          )}

          {isAuthenticated ? (
            <Sidebar.Item icon={HiArrowSmRight} onClick={handleLogout}>
              {!isCollapsed && "ออกจากระบบ"}
            </Sidebar.Item>
          ) : (
            <Sidebar.Item href="/login" icon={HiArrowSmRight} active={path === "login"}>
              {!isCollapsed && "เข้าสู่ระบบ"}
            </Sidebar.Item>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideNav;