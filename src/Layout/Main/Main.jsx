import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { ConfigProvider, Drawer } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose, IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import mainLogo from "../../assets/image/kickcheck.png";
import adminImage from "../../assets/image/adminkickclick.jpg";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Mock admin profile data for design
  const adminProfile = {
    name: "Kalrton",
    role: "admin",
  };
  // Format path name nicely
  const formatPathName = (pathname) => {
    const parts = pathname.split("/").filter(Boolean);
    const lastPart = parts[parts.length - 1] || "Dashboard";
    return (
      lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, " ")
    );
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header
      style={{
    background: "radial-gradient(circle, rgba(40, 65, 13, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(40, 65, 13, 1) 100%)"
  }}
      
      className="fixed top-0 left-0 z-10 shadow-sm lg:ml-72 subtract-width">
        <div className="flex items-center justify-end py-4 gap-x-5 ">
          <div className="relative items-center justify-center hidden w-10 h-10 overflow-hidden bg-white border-2 rounded-full border-swhite md:flex">
            <div>
              <IoMdNotificationsOutline size={24} />
              <div className="bg-[#3475F1] absolute top-1 left-4 flex justify-center items-center h-4 w-4 rounded-full">
                <p className="text-white">1</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 cursor-pointer md:mr-8">
            <div className="items-center justify-center hidden w-10 h-10 overflow-hidden border-2 rounded-full border-swhite md:flex">
              <img src={adminImage} alt="admin image" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              {adminProfile.name}
            </h3>

            <button className="block lg:hidden" onClick={showDrawer}>
              <RxHamburgerMenu className="text-2xl" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex ">
        {/* Sidebar for large screens */}
        <div className="fixed left-0 hidden w-64 h-full bg-[#1f2e0e] shadow-md lg:block ">
          <Sidebar adminProfile={mainLogo} />
        </div>

        {/* Mobile Drawer */}
        <ConfigProvider
          theme={{
            components: {
              Drawer: {
                colorBgElevated: "#ffffff",
              },
            },
          }}
        >
          <Drawer
            placement="right"
            width="100%"
            onClose={onClose}
            open={open}
            closeIcon={<IoMdClose className="text-2xl" />}
          >
            <Sidebar adminProfile={adminProfile} />
          </Drawer>
        </ConfigProvider>

        {/* Main Content - Adjusted for Sidebar */}
        <div className="flex-1 p-5 overflow-y-auto bg-black lg:ml-72">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
