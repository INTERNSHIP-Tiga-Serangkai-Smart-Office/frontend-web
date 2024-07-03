import Hamburger from "hamburger-react";
import React, { useEffect, useState } from "react";
import { BiSolidEditLocation } from "react-icons/bi";
import { FaFolder, FaUserAlt, FaUsers } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFolderInput, LuFolderOutput } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, getMe, reset } from "../features/authSlice";
import AlertLogout from "./AlertLogout";

const SideBar = ({ children, isHidden }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Retrieve user data from Redux store
  const { user } = useSelector((state) => state.auth);

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // Logout function
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: RiDashboardFill },
    { name: "User", link: "/users", icon: FaUserAlt },
    { name: "Data Asset", link: "/dataaset", icon: FaFolder },
    { name: "Role", link: "/role", icon: FaUsers },
    { name: "Relokasi", link: "#", icon: BiSolidEditLocation },
    { name: "Asset Masuk", link: "/master", icon: LuFolderInput },
    { name: "Asset Keluar", link: "#", icon: LuFolderOutput },
    { name: "Laporan", link: "#", icon: LuFolderOutput },
    { name: "Settings", link: "#", icon: IoSettingsOutline, margin: true },
    { name: "LogOut", link: "#", icon: MdLogout, onClick: () => setShowLogoutAlert(true) },
  ];

  return (
    <div className={`flex flex-row ${isHidden ? "hidden" : ""}`}>
      <button className="md:hidden flex items-center fixed top-5 right-5 z-50 space-x-2" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        <Hamburger toggled={isMobileOpen} toggle={setIsMobileOpen} size={25} />
      </button>
      <aside
        className={`flex h-screen overflow-y-auto overflow-x-hidden bg-clr-bg-sd transition-transform transform ${isMobileOpen ? "-translate-y-px-" : "-translate-x-full"} md:translate-x-0`}
        style={{ borderRadius: "0px 20px 20px 0px" }}
      >
        <div className={`p-5 pt-8 ${sidebarToggle ? "w-72" : "w-20"} duration-300 relative`}>
          <div className="flex justify-around">
            <img
              src={process.env.PUBLIC_URL + "/arrow_sb.svg"}
              alt="icon"
              className={`hidden md:block bg-white text-purple-950 text-3xl rounded-full border border-black cursor-pointer ${!sidebarToggle && "rotate-180"} ${sidebarToggle ? "absolute -right-0 top-5" : "absolute justify-center mb-2"}`}
              onClick={() => setSidebarToggle(!sidebarToggle)}
            />
            <div className="mb-5">
              <div className={`flex flex-col mx-auto items-center justify-center ${!sidebarToggle && `invisible`}`}>
                {user && (
                  <h3 className="inline-flex items-center text-xs text-white px-2 bg-[#2C449B] rounded-xl truncate">
                    {user.role} {/* Display user role */}
                  </h3>
                )}
              </div>
            </div>
          </div>
          <div className={`mt-5 mb-5 flex flex-row ${sidebarToggle && `p-5 bg-slate-100 rounded-xl`} hover:bg-light-white`}>
            <img src={process.env.PUBLIC_URL + "profile-avatar.svg"} alt="profile" className="w-[40px] h-[40px]" />
            <div className={`flex flex-col mx-auto items-center justify-center ${!sidebarToggle && `invisible`}`}>
              {user && <h2 className="text-xl font-bold">{user.name}</h2>} {/* Display user name */}
            </div>
          </div>
          <div className="flex flex-col gap-4 relative">
            {menus.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`${menu?.margin && "mt-5"} flex items-center text-sm gap-3.5 font-medium p-2 rounded-md hover:bg-gray-200 hover:text-gray-800 ${activeIndex === i ? "bg-gray-200 text-red-600" : ""}`}
                onClick={() => {
                  setActiveIndex(i);
                  if (menu?.onClick) {
                    menu.onClick();
                  }
                }}
                style={{ paddingRight: "30px", marginRight: "-20px", width: "calc(100% + 20px)", borderRadius: "20px 0px 0px 20px" }}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2 style={{ transitionDelay: `${i + 3}00ms` }} className={`xl:whitespace-pre duration-500 ${!sidebarToggle && "opacity-0 translate-x-28 overflow-hidden"} md: duration-500 ${!sidebarToggle && "opacity-0 translate-x-28 "} `}>
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </aside>
      <main className="p-7 w-full h-screen overflow-auto">{children}</main>
      <AlertLogout show={showLogoutAlert} onConfirm={logout} onCancel={() => setShowLogoutAlert(false)} />
    </div>
  );
};

export default SideBar;
