import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import dadBoraLogo from "../../assets/logo1.png";

type TypeProps = {
  sidebarOpen: boolean;
};
const LeftSideMenu = (Props: TypeProps) => {
  const { sidebarOpen } = Props;
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      icon: "fas fa-chart-line",
      path: "/",
    },
    {
      id: "conversations",
      label: "Conversations",
      icon: "fas fa-comments",
      path: "/conversations",
    },
    {
      id: "users",
      label: "Utilisateurs",
      icon: "fas fa-users",
      path: "/users",
    },
    {
      id: "monitoring",
      label: "Monitoring",
      icon: "fas fa-chart-bar",
      path: "/monitoring",
    },
    {
      id: "knowledgebase",
      label: "Expertise",
      icon: "fas fa-cog",
      path: "/knowledgebase",
    },
  ];

  const pathname = useLocation().pathname;

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-30 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-solid border-gray-100">
        {!sidebarOpen && (
          <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center ml-[-10px] font-bold text-white">
            <img src={dadBoraLogo} alt="logoDada" className="w-[20px]" />
          </div>
        )}
        {sidebarOpen && (
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" width={80} className="fit-content" />
          </div>
        )}
      </div>
      {/* Menu */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.id} className="block">
            <button
              // onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors cursor-pointer whitespace-nowrap !rounded-button ${
                pathname === item.path
                  ? "bg-pink-50 text-pink-600 border-r-4 border-solid border-pink-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <i className={`${item.icon} w-5 text-center`}></i>
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </button>
          </Link>
        ))}
      </nav>
      {/* System Status */}
      <div className="absolute bottom-6 left-0 right-0 px-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {sidebarOpen && (
              <div>
                <p className="text-sm font-medium text-green-800">
                  Système Online
                </p>
                {/* <p className="text-xs text-green-600">
                    Tous les services actifs
                  </p> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideMenu;
