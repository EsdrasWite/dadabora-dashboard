// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, use } from "react";
import * as echarts from "echarts";
import LeftSideMenu from "../../components/feature/LeftSideMenu";
import { Link } from "react-router-dom";
import type { messagesType, usersType } from "../../contants/globalTypes";
import Loader from "../../components/base/Loader";
import { getAllMessages } from "../../services/conversationServices";
import { getAllUsers } from "../../services/userServices";
import { addLocationToUsers } from "../../utils/numberUtils";
import moment from "moment";
// import jsPDF from "jspdf";
const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<usersType[]>([]);
  const [messages, setMessages] = useState<messagesType[]>([]);
  const [loading, setLoading] = useState(true); // loader
  const [error, setError] = useState(null); // error

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
.animate-fade-in {
animation: fadeIn 0.3s ease-in;
}
.animate-fade-out {
animation: fadeOut 0.3s ease-out;
}
@keyframes fadeIn {
from { opacity: 0; transform: translateY(20px); }
to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeOut {
from { opacity: 1; transform: translateY(0); }
to { opacity: 0; transform: translateY(20px); }
}
`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState("today");
  const [activeUsersTimeRange, setActiveUsersTimeRange] = useState("1day");

  const stats = [
    {
      title: "Utilisateurs Totaux",
      value: "2,847",
      change: "+12%",
      icon: "fas fa-users",
      color: "text-purple-600",
    },
    {
      title: "Messages Totaux",
      value: "15,234",
      change: "+8%",
      icon: "fas fa-message",
      color: "text-pink-500",
    },
    {
      title: "Temps de Réponse Moyen",
      value: "1.2s",
      change: "-5%",
      icon: "fas fa-clock",
      color: "text-purple-600",
    },
    {
      title: "Satisfaction Client",
      value: "94.5%",
      change: "+2%",
      icon: "fas fa-heart",
      color: "text-pink-500",
    },
  ];
  // const recentConversations = [
  //   {
  //     id: 1,
  //     user: "Marie Dubois",
  //     message: "Bonjour, j'ai des douleurs abdominales...",
  //     time: "12/08/2025 14:32",
  //     status: "active",
  //   },
  //   {
  //     id: 2,
  //     user: "Pierre Martin",
  //     message: "Mes résultats d'analyse sont-ils normaux ?",
  //     time: "12/08/2025 14:28",
  //     status: "resolved",
  //   },
  //   {
  //     id: 3,
  //     user: "Sophie Laurent",
  //     message: "Urgence : difficultés respiratoires",
  //     time: "12/08/2025 14:25",
  //     status: "urgent",
  //   },
  //   {
  //     id: 4,
  //     user: "Jean Moreau",
  //     message: "Question sur mon traitement...",
  //     time: "12/08/2025 14:20",
  //     status: "pending",
  //   },
  // ];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  //---------CHART 1-------
  useEffect(() => {
    const getChartData = () => {
      if (timeRange === "today") {
        return {
          xAxis: ["8h", "10h", "12h", "14h", "16h", "18h", "20h"],
          data: [120, 180, 150, 220, 190, 230, 210],
        };
      } else {
        return {
          xAxis: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
          data: [850, 920, 880, 950, 1020, 780, 900],
        };
      }
    };
    const chartElement = document.getElementById("messageFlowChart");
    if (chartElement) {
      const chart = echarts.init(chartElement);
      const option = {
        animation: false,
        grid: {
          top: 10,
          right: 20,
          bottom: 20,
          left: 40,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: getChartData().xAxis,
          axisLine: {
            lineStyle: {
              color: "#E2E8F0",
            },
          },
          axisLabel: {
            color: "#64748B",
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#64748B",
          },
          splitLine: {
            lineStyle: {
              color: "#E2E8F0",
            },
          },
        },
        series: [
          {
            name: "Messages",
            type: "line",
            smooth: true,
            data: getChartData().data,
            lineStyle: {
              color: "#9333EA",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(147, 51, 234, 0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(147, 51, 234, 0.05)",
                },
              ]),
            },
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              color: "#9333EA",
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderColor: "#E2E8F0",
          borderWidth: 1,
          textStyle: {
            color: "#1F2937",
          },
          formatter: "{b0}<br />{a0}: {c0} messages",
        },
      };
      chart.setOption(option);
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, [timeRange]);
  //-----------------------------------------

  //---------CHART 2-------
  useEffect(() => {
    const getActiveUsersData = () => {
      switch (activeUsersTimeRange) {
        case "1day":
          return {
            xAxis: ["0h", "3h", "6h", "9h", "12h", "15h", "18h", "21h"],
            data: [45, 32, 28, 85, 156, 187, 203, 165],
          };
        case "7days":
          return {
            xAxis: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
            data: [1420, 1580, 1650, 1720, 1890, 1340, 1230],
          };
        case "30days":
          return {
            xAxis: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
            data: [8950, 9320, 10150, 9780],
          };
        case "90days":
          return {
            xAxis: ["Mois 1", "Mois 2", "Mois 3"],
            data: [28450, 31200, 29850],
          };
        default:
          return {
            xAxis: ["0h", "3h", "6h", "9h", "12h", "15h", "18h", "21h"],
            data: [45, 32, 28, 85, 156, 187, 203, 165],
          };
      }
    };
    const chartElement = document.getElementById("activeUsersChart");
    if (chartElement) {
      const chart = echarts.init(chartElement);
      const chartData = getActiveUsersData();
      const option = {
        animation: false,
        grid: {
          top: 10,
          right: 20,
          bottom: 20,
          left: 60,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: chartData.xAxis,
          axisLine: {
            lineStyle: {
              color: "#E2E8F0",
            },
          },
          axisLabel: {
            color: "#64748B",
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#64748B",
          },
          splitLine: {
            lineStyle: {
              color: "#E2E8F0",
            },
          },
        },
        series: [
          {
            name: "Utilisateurs Actifs",
            type: "bar",
            data: chartData.data,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#EC4899",
                },
                {
                  offset: 1,
                  color: "#F472B6",
                },
              ]),
              borderRadius: [4, 4, 0, 0],
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#DB2777",
                  },
                  {
                    offset: 1,
                    color: "#EC4899",
                  },
                ]),
              },
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderColor: "#E2E8F0",
          borderWidth: 1,
          textStyle: {
            color: "#1F2937",
          },
          formatter: "{b0}<br />{a0}: {c0} utilisateurs",
        },
      };
      chart.setOption(option);
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, [activeUsersTimeRange]);

  //---------api call-------
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        const usersWithLocation = addLocationToUsers(userData.users);
        setUsers(usersWithLocation);
      } catch (err: any) {
        setError(err.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    const fetchMessages = async () => {
      try {
        const msgData = await getAllMessages();
        setMessages(msgData.messages);
      } catch (err: any) {
        setError(err.message || "Error fetching messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    fetchUsers();
  }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>❌ {error}</div>;
  }
  let usersCollection: (usersType & { messages?: messagesType[] })[] = [];

  if (users.length > 0) {
    for (const user of users) {
      const userMessages = messages.filter((msg) => msg.user_id === user.id);
      usersCollection.push({ ...user, messages: userMessages });
    }
  }

  const recentConversations = usersCollection.slice().sort((a, b) => {
    // Get last message times (or null if no messages)
    const timeA = a.messages?.length
      ? new Date(a.messages[a.messages.length - 1].timestamp).getTime()
      : null;

    const timeB = b.messages?.length
      ? new Date(b.messages[b.messages.length - 1].timestamp).getTime()
      : null;

    // If both are null or equal
    if (!timeA && !timeB) return 0;
    if (!timeA) return 1; // No messages in A => push A down
    if (!timeB) return -1; // No messages in B => push B down

    return timeB - timeA; // descending: most recent first
  });

  usersCollection.forEach((user) => {
    user.messages?.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  });

  console.log(usersCollection);
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
              <nav className="text-sm text-gray-500">
                <Link to={"/"} className="hover:text-pink-600">
                  <span>Tableau de bord</span>
                </Link>
                <i className="fas fa-chevron-right mx-2"></i>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center">
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

        {/* Dashboard Content */}
        <main className="p-6 pt-24">
          {/* Stats Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-[20px]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change} vs hier
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                      stat.color === "text-purple-600"
                        ? "from-purple-100 to-purple-200"
                        : "from-pink-100 to-pink-200"
                    } flex items-center justify-center`}
                  >
                    <i className={`${stat.icon} ${stat.color} text-lg`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Messages Flow Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Flux de Messages
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setTimeRange("today")}
                    className={`px-3 py-1 text-sm ${
                      timeRange === "today"
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded-lg cursor-pointer !rounded-button whitespace-nowrap`}
                  >
                    Aujourd'hui
                  </button>
                  <button
                    onClick={() => setTimeRange("week")}
                    className={`px-3 py-1 text-sm ${
                      timeRange === "week"
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded-lg cursor-pointer !rounded-button whitespace-nowrap`}
                  >
                    7 jours
                  </button>
                </div>
              </div>
              <div className="h-64" id="messageFlowChart"></div>
            </div>
            {/* Active Users Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Activité utilisateurs
                </h3>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveUsersTimeRange("1day")}
                    className={`px-2 py-1 text-xs ${
                      activeUsersTimeRange === "1day"
                        ? "bg-pink-100 text-pink-600"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded cursor-pointer !rounded-button whitespace-nowrap`}
                  >
                    Aujourd'hui
                  </button>
                  <button
                    onClick={() => setActiveUsersTimeRange("7days")}
                    className={`px-2 py-1 text-xs ${
                      activeUsersTimeRange === "7days"
                        ? "bg-pink-100 text-pink-600"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded cursor-pointer !rounded-button whitespace-nowrap`}
                  >
                    7J
                  </button>
                  <button
                    onClick={() => setActiveUsersTimeRange("30days")}
                    className={`px-2 py-1 text-xs ${
                      activeUsersTimeRange === "30days"
                        ? "bg-pink-100 text-pink-600"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded cursor-pointer !rounded-button whitespace-nowrap`}
                  >
                    30J
                  </button>
                  <button
                    onClick={() => setActiveUsersTimeRange("90days")}
                    className={`px-2 py-1 text-xs ${
                      activeUsersTimeRange === "90days"
                        ? "bg-pink-100 text-pink-600"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded cursor-pointer !rounded-button whitespace-nowrap`}
                  >
                    90J
                  </button>
                </div>
              </div>
              <div className="h-64" id="activeUsersChart"></div>
            </div>
          </div>
          {/* Recent Conversations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Conversations Récentes
                </h3>
                <div className="flex space-x-2">
                  <button
                    id="exportCsvBtn"
                    onClick={() => {
                      // Convert data to CSV
                      const headers = [
                        "Utilisateur",
                        "Message",
                        "Date et Heure",
                        "Statut",
                      ];
                      const csvData = recentConversations.map((conv) => [
                        conv.name,
                        // conv.message,
                        // conv.time,
                        conv.status === "active"
                          ? "Actif"
                          : conv.status === "urgent"
                          ? "Urgent"
                          : conv.status === "resolved"
                          ? "Résolu"
                          : "En attente",
                      ]);
                      const csvContent = [headers, ...csvData]
                        .map((row) => row.join(","))
                        .join("\n");
                      // Create and trigger download
                      const blob = new Blob([csvContent], {
                        type: "text/csv;charset=utf-8;",
                      });
                      const link = document.createElement("a");
                      link.href = URL.createObjectURL(blob);
                      link.download = `conversations_${
                        new Date().toISOString().split("T")[0]
                      }.csv`;
                      link.click();
                      // Show toast notification
                      const toast = document.createElement("div");
                      toast.className =
                        "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
                      toast.textContent = "Export CSV réussi";
                      document.body.appendChild(toast);
                      setTimeout(() => {
                        toast.classList.add("animate-fade-out");
                        setTimeout(() => toast.remove(), 300);
                      }, 3000);
                    }}
                    className="px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-700 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-download mr-2"></i>Exporter CSV
                  </button>
                  {/* <button
                    id="exportPdfBtn"
                    onClick={() => {
                      // Create PDF document
                      const doc = new jsPDF();
                      // Add title
                      doc.setFontSize(16);
                      doc.text("Conversations Récentes", 20, 20);
                      // Add headers
                      doc.setFontSize(12);
                      const headers = [
                        "Utilisateur",
                        "Message",
                        "Date et Heure",
                        "Statut",
                      ];
                      let y = 40;
                      // Add data rows
                      recentConversations.forEach((conv, index) => {
                        if (y > 250) {
                          doc.addPage();
                          y = 20;
                        }
                        doc.text(conv.user, 20, y);
                        doc.text(conv.message.substring(0, 40) + "...", 60, y);
                        doc.text(conv.time, 120, y);
                        doc.text(
                          conv.status === "active"
                            ? "Actif"
                            : conv.status === "urgent"
                            ? "Urgent"
                            : conv.status === "resolved"
                            ? "Résolu"
                            : "En attente",
                          170,
                          y
                        );
                        y += 10;
                      });
                      // Save PDF
                      doc.save(
                        `conversations_${
                          new Date().toISOString().split("T")[0]
                        }.pdf`
                      );
                      // Show toast notification
                      const toast = document.createElement("div");
                      toast.className =
                        "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
                      toast.textContent = "Export PDF réussi";
                      document.body.appendChild(toast);
                      setTimeout(() => {
                        toast.classList.add("animate-fade-out");
                        setTimeout(() => toast.remove(), 300);
                      }, 3000);
                    }}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-file-pdf mr-2"></i>Exporter PDF
                  </button> */}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Pseudo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date et Heure
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-100">
                  {recentConversations
                    .slice(0, 5)
                    .map((conversation, index) => {
                      if (
                        conversation.messages &&
                        conversation.messages.length > 0
                      ) {
                        let name, lastMessage, lastTime;
                        const lastMsg =
                          conversation.messages[
                            conversation.messages.length - 1
                          ];
                        name = conversation.name;
                        lastMessage = lastMsg.content;
                        lastTime = lastMsg.timestamp;

                        return (
                          <tr
                            key={conversation.id}
                            className={`${
                              index % 2 === 0 ? "bg-white" : "bg-purple-25"
                            } border-b border-solid border-gray-100 hover:bg-gray-50`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                            <i className="fas fa-user text-white text-sm"></i>
                          </div> */}
                                <div className="w-8 h-8 bg-neutral-500 rounded-full flex items-center justify-center">
                                  <i className="fas fa-user text-neutral-400 text-sm"></i>
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-800">
                                    {name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-600 truncate max-w-xs">
                                {lastMessage}
                              </p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {moment(lastTime).format("DD/MM/YYYY HH:mm")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                                  conversation.status
                                )}`}
                              >
                                {conversation.status === "active"
                                  ? "Actif"
                                  : conversation.status === "urgent"
                                  ? "Urgent"
                                  : conversation.status === "resolved"
                                  ? "Résolu"
                                  : "Active"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                {/* <button className="text-purple-600 hover:text-purple-800 cursor-pointer">
                            <i className="fas fa-eye"></i>
                          </button> */}
                                {/* <button className="text-pink-500 hover:text-pink-700 cursor-pointer">
                            <i className="fas fa-reply"></i>
                          </button> */}
                                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                  <i className="fas fa-ellipsis-h"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      }

                      // else {
                      //   name = conversation.name;
                      //   lastMessage = "Aucun message";
                      //   lastTime = "N/A";
                      // }
                      // return (
                      //   <tr
                      //     key={conversation.id}
                      //     className={`${
                      //       index % 2 === 0 ? "bg-white" : "bg-purple-25"
                      //     } border-b border-solid border-gray-100 hover:bg-gray-50`}
                      //   >
                      //     <td className="px-6 py-4 whitespace-nowrap">
                      //       <div className="flex items-center">
                      //         {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      //         <i className="fas fa-user text-white text-sm"></i>
                      //       </div> */}
                      //         <div className="w-8 h-8 bg-neutral-500 rounded-full flex items-center justify-center">
                      //           <i className="fas fa-user text-neutral-400 text-sm"></i>
                      //         </div>
                      //         <div className="ml-3">
                      //           <p className="text-sm font-medium text-gray-800">
                      //             {conversation.messages &&
                      //               conversation.messages.length > 0 &&
                      //               conversation.name}
                      //           </p>
                      //         </div>
                      //       </div>
                      //     </td>
                      //     <td className="px-6 py-4">
                      //       <p className="text-sm text-gray-600 truncate max-w-xs">
                      //         {conversation.messages &&
                      //           conversation.messages.length > 0 &&
                      //           conversation.messages[
                      //             conversation.messages.length - 1
                      //           ].content}
                      //       </p>
                      //     </td>
                      //     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      //       {conversation.messages &&
                      //         conversation.messages.length > 0 &&
                      //         conversation.messages[
                      //           conversation.messages.length - 1
                      //         ].timestamp}
                      //     </td>
                      //     <td className="px-6 py-4 whitespace-nowrap">
                      //       <span
                      //         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                      //           conversation.status
                      //         )}`}
                      //       >
                      //         {conversation.status === "active"
                      //           ? "Actif"
                      //           : conversation.status === "urgent"
                      //           ? "Urgent"
                      //           : conversation.status === "resolved"
                      //           ? "Résolu"
                      //           : "En attente"}
                      //       </span>
                      //     </td>
                      //     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      //       <div className="flex space-x-2">
                      //         {/* <button className="text-purple-600 hover:text-purple-800 cursor-pointer">
                      //         <i className="fas fa-eye"></i>
                      //       </button> */}
                      //         {/* <button className="text-pink-500 hover:text-pink-700 cursor-pointer">
                      //         <i className="fas fa-reply"></i>
                      //       </button> */}
                      //         <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                      //           <i className="fas fa-ellipsis-h"></i>
                      //         </button>
                      //       </div>
                      //     </td>
                      //   </tr>
                      // );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Dashboard;
