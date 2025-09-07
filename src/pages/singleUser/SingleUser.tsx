// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import * as echarts from "echarts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LeftSideMenu from "../../components/feature/LeftSideMenu";
import bg from "../../assets/bg.jpg";
import dadaLogo from "../../assets/logo1.png";
import moment from "moment";

type usersType = {
  id: number;
  name: string;
  phone: string;
  created_at: string;
  location: string;
};

type MessagesType = {
  id: number;
  user_id: number;
  user_name: number;
  content: string;
  timestamp: string;
  sender: "user" | "user_audio" | "ai";
  confidence?: number;
  tags?: string[];
};

const SingleUser: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [periodFilter, setPeriodFilter] = useState("30days");
  const [statsModalOpen, setStatsModalOpen] = useState(false);

  const [showFixedInfo, setShowFixedInfo] = useState(false);
  const userInfoRef = React.useRef<HTMLDivElement>(null);

  const location = useLocation();
  const user = location.state.user as
    | (usersType & { messages: MessagesType[] })
    | undefined;
  const sortedMessages: MessagesType[] | undefined = user?.messages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  React.useEffect(() => {
    const chartDom = document.getElementById("progressChart");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        title: {
          text: "Évolution des Conversations",
          left: "left",
          textStyle: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#374151",
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          textStyle: {
            color: "#374151",
          },
        },
        legend: {
          data: ["Conversations"],
          top: 30,
          textStyle: {
            color: "#6b7280",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],
          axisLine: {
            lineStyle: {
              color: "#e5e7eb",
            },
          },
          axisLabel: {
            color: "#6b7280",
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#e5e7eb",
            },
          },
          axisLabel: {
            color: "#6b7280",
          },
          splitLine: {
            lineStyle: {
              color: "#f3f4f6",
            },
          },
        },
        series: [
          {
            name: "Conversations",
            type: "line",
            data: [45, 52, 38, 65, 72],
            smooth: true,
            lineStyle: {
              color: "#8b5cf6",
              width: 3,
            },
            itemStyle: {
              color: "#8b5cf6",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(139, 92, 246, 0.3)" },
                  { offset: 1, color: "rgba(139, 92, 246, 0.05)" },
                ],
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      return () => {
        myChart.dispose();
      };
    }
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFixedInfo(!entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (userInfoRef.current) {
      observer.observe(userInfoRef.current);
    }

    return () => {
      if (userInfoRef.current) {
        observer.unobserve(userInfoRef.current);
      }
    };
  }, []);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <LeftSideMenu sidebarOpen={sidebarOpen} />
      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Header */}
        <header
          className={`bg-white shadow-sm border-b border-gray-100 px-6 py-4 fixed top-0 ${
            sidebarOpen ? "left-64" : "left-16"
          } right-0 z-20`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-bars text-gray-600"></i>
              </button>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBack}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-arrow-left text-sm"></i>
                  <span>Retour</span>
                </button>
                <nav className="text-sm text-gray-500">
                  <Link
                    to="/users"
                    data-readdy="true"
                    className="hover:text-purple-600"
                  >
                    Gestion des utilisateurs
                  </Link>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-purple-600 font-medium">
                    Profil Utilisateur
                  </span>
                </nav>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-bell text-gray-600"></i>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white text-sm"></i>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-800">Dr. Admin</p>
                  <p className="text-gray-500">Administrateur</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Fixed User Info Bar */}
        {showFixedInfo && (
          <div
            className={`fixed top-[72px] left-0 right-0 z-30 bg-neutral-700 border-b border-solid border-gray-100 px-6 py-5 border-t ${
              sidebarOpen ? "left-64" : "left-16"
            }`}
          >
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white text-2xl"></i>
                </div>
                <div>
                  <p className="font-medium text-neutral-100">{user?.name}</p>
                  <p className="text-sm text-neutral-300">{user?.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 gap-4">
                <span className="font-sm text-neutral-100">
                  {user?.location}
                </span>
                <i
                  className="fas fa-refresh text-neutral-200 cursor-pointer"
                  onClick={() => {
                    // Refresh action
                    window.location.reload();
                  }}
                ></i>
              </div>
            </div>
          </div>
        )}
        {/* Page Content */}
        <main className="p-6 pt-24">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  Profil Utilisateur
                </h1>
                <p className="text-gray-600">
                  Informations détaillées et statistiques d'utilisation
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-white border border-solid border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fab fa-whatsapp mr-2 text-green-500"></i>Envoyer
                  un message
                </button>
                <button
                  onClick={() => setStatsModalOpen(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2 !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-chart-bar mr-2"></i>
                  <span>Voir les statistiques</span>
                </button>
              </div>
            </div>
          </div>
          {/* User Profile Section */}
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8 w-[70%] mx-auto"
            ref={userInfoRef}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
              {/* Profile Picture */}
              <div className="flex flex-col md:flex-1 items-center lg:items-start mb-6 lg:mb-0 bg-purple-50 rounded-lg p-2">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-user text-white text-4xl"></i>
                    </div>
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {user?.name}
                    </h3>
                  </div>
                </div>
              </div>
              {/* User Information */}
              <div className="flex-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-phone text-purple-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="font-medium text-gray-800">{user?.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-purple-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Région</p>
                      <p className="font-medium text-gray-800">
                        {user?.location}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-purple-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Membre depuis</p>
                      <p className="font-medium text-gray-800">
                        {moment(user?.created_at).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Stats Modal */}
          {statsModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-6xl max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Statistiques détaillées
                  </h2>
                  <button
                    onClick={() => setStatsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Total Conversations
                        </p>
                        <p className="text-3xl font-bold text-purple-600">
                          {user?.messages.length || 0}
                        </p>
                        <p className="text-sm text-green-600 mt-2">
                          <i className="fas fa-arrow-up mr-1"></i>+12% ce mois
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-comments text-purple-600 text-xl"></i>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Taux de Conversion
                        </p>
                        <p className="text-3xl font-bold text-green-600">24%</p>
                        <p className="text-sm text-green-600 mt-2">
                          <i className="fas fa-arrow-up mr-1"></i>+3% ce mois
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-chart-line text-green-600 text-xl"></i>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Temps de Réponse Moyen
                        </p>
                        <p className="text-3xl font-bold text-blue-600">2.3m</p>
                        <p className="text-sm text-red-600 mt-2">
                          <i className="fas fa-arrow-down mr-1"></i>-15s ce mois
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-clock text-blue-600 text-xl"></i>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Progress Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Graphique de Progression
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setPeriodFilter("7days")}
                        className={`px-3 py-1 text-sm rounded-lg cursor-pointer !rounded-button whitespace-nowrap ${
                          periodFilter === "7days"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        7 jours
                      </button>
                      <button
                        onClick={() => setPeriodFilter("30days")}
                        className={`px-3 py-1 text-sm rounded-lg cursor-pointer !rounded-button whitespace-nowrap ${
                          periodFilter === "30days"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        30 jours
                      </button>
                      <button
                        onClick={() => setPeriodFilter("3months")}
                        className={`px-3 py-1 text-sm rounded-lg cursor-pointer !rounded-button whitespace-nowrap ${
                          periodFilter === "3months"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        3 mois
                      </button>
                    </div>
                  </div>
                  <div id="progressChart" className="w-full h-80"></div>
                </div>
              </div>
            </div>
          )}
          {/* Conversation History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-[70%] mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Messages
            </h3>
            <div className={`space-y-6 bg-green-50 `}>
              {/* <div className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">Début:</span>
                    <span className="font-medium">15/01/2024 12:30</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">Fin:</span>
                    <span className="font-medium">15/01/2024 12:45</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Nombres:</span>
                    <span className="font-medium">{user?.messages.length}</span>
                  </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Confiance bot:</span>
                    <span className="font-medium text-purple-600">92%</span>
                  </div>
                </div>
              </div> */}
              <div
                className="space-y-4 p-6 rounded-xl relative"
                style={{
                  minHeight: "400px",
                }}
              >
                <img
                  src={bg}
                  alt="background"
                  className="absolute w-full h-full object-cover opacity-10 pointer-events-none"
                  style={{
                    position: "fixed", // changed from "absolute" to "fixed"
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    width: "100vw", // use viewport width for fixed background
                    height: "100vh", // use viewport height for fixed background
                    objectFit: "cover",
                    opacity: 0.1,
                    pointerEvents: "none",
                    backgroundAttachment: "fixed",
                  }}
                />
                {/* Example Messages */}
                <div className="relative z-10">
                  {sortedMessages?.map((msg) => (
                    <div
                      className={`p-4 mb-4 rounded-lg max-w-2xl flex items-start ${
                        msg.sender === "ai"
                          ? "bg-neutral-700 text-neutral-200 mr-auto"
                          : "bg-green-200 text-black-800 ml-auto flex-row-reverse"
                      }`}
                      key={msg.id}
                    >
                      {/* Emoji bubble */}
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full  ${
                          msg.sender === "ai" ? "bg-zinc-500 mr-4 " : ""
                        }`}
                        style={{
                          order: msg.sender === "ai" ? 0 : 2,
                        }}
                      >
                        <span className="text-2xl flex items-center justify-center">
                          {msg.sender === "ai" ? (
                            <img
                              src={dadaLogo}
                              alt="dadaBoraLogo"
                              className="w-[20px] h-[20px] object-contain"
                            />
                          ) : (
                            ""
                            // <i className="fas fa-user text-white text-sm"></i>
                          )}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="mb-2">{msg.content}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span
                            className={`text-sm ${
                              msg.sender === "ai"
                                ? "text-gray-200"
                                : "text-gray-500"
                            } `}
                          >
                            {moment(msg.timestamp).format("DD/MM/YYYY HH:mm")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default SingleUser;
