// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import LeftSideMenu from "../../components/feature/LeftSideMenu";
import { Link } from "react-router-dom";
const Monitoring: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    responseTimeMin: "",
    responseTimeMax: "",
  });
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");
  const [exportOptions, setExportOptions] = useState({
    region: "current",
    period: "24h",
    columns: [
      "city",
      "country",
      "inbound",
      "outbound",
      "responseTime",
      "users",
      "status",
    ],
  });
  const [globalMetrics, setGlobalMetrics] = useState({
    totalActiveUsers: 12847,
    messagesPerMinute: 2340,
    avgResponseTime: 0.8,
    systemLoad: 72,
  });
  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Update global metrics with new random data
    setGlobalMetrics({
      totalActiveUsers: Math.floor(Math.random() * 5000) + 10000,
      messagesPerMinute: Math.floor(Math.random() * 500) + 2000,
      avgResponseTime: Math.round((Math.random() * 0.5 + 0.5) * 10) / 10,
      systemLoad: Math.floor(Math.random() * 20) + 65,
    });
    // Update region data with slight variations
    Object.keys(regionData).forEach((continent) => {
      regionData[continent as keyof typeof regionData] = regionData[
        continent as keyof typeof regionData
      ].map((region) => ({
        ...region,
        inbound: Math.floor(region.inbound * (0.9 + Math.random() * 0.2)),
        outbound: Math.floor(region.outbound * (0.9 + Math.random() * 0.2)),
        responseTime:
          Math.round(region.responseTime * (0.9 + Math.random() * 0.2) * 10) /
          10,
        users: Math.floor(region.users * (0.9 + Math.random() * 0.2)),
      }));
    });
    setIsRefreshing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const continents = [
    { id: "europe", name: "Europe", icon: "fas fa-globe-europe" },
    { id: "americas", name: "Americas", icon: "fas fa-globe-americas" },
    { id: "asia", name: "Asia", icon: "fas fa-globe-asia" },
    { id: "africa", name: "Africa", icon: "fas fa-globe-africa" },
    { id: "oceania", name: "Oceania", icon: "fas fa-water" },
  ];
  const regionData = {
    europe: [
      {
        city: "London",
        country: "UK",
        inbound: 1247,
        outbound: 1156,
        responseTime: 0.7,
        users: 3420,
        status: "high",
      },
      {
        city: "Paris",
        country: "France",
        inbound: 987,
        outbound: 1034,
        responseTime: 0.9,
        users: 2890,
        status: "high",
      },
      {
        city: "Berlin",
        country: "Germany",
        inbound: 756,
        outbound: 823,
        responseTime: 0.6,
        users: 2156,
        status: "medium",
      },
      {
        city: "Madrid",
        country: "Spain",
        inbound: 634,
        outbound: 567,
        responseTime: 1.1,
        users: 1789,
        status: "medium",
      },
      {
        city: "Rome",
        country: "Italy",
        inbound: 445,
        outbound: 498,
        responseTime: 1.3,
        users: 1234,
        status: "low",
      },
    ],
    americas: [
      {
        city: "New York",
        country: "USA",
        inbound: 2134,
        outbound: 2287,
        responseTime: 0.5,
        users: 5670,
        status: "high",
      },
      {
        city: "Los Angeles",
        country: "USA",
        inbound: 1876,
        outbound: 1923,
        responseTime: 0.6,
        users: 4890,
        status: "high",
      },
      {
        city: "Toronto",
        country: "Canada",
        inbound: 876,
        outbound: 934,
        responseTime: 0.8,
        users: 2340,
        status: "medium",
      },
      {
        city: "São Paulo",
        country: "Brazil",
        inbound: 654,
        outbound: 712,
        responseTime: 1.2,
        users: 1890,
        status: "medium",
      },
      {
        city: "Mexico City",
        country: "Mexico",
        inbound: 432,
        outbound: 456,
        responseTime: 1.4,
        users: 1123,
        status: "low",
      },
    ],
    asia: [
      {
        city: "Tokyo",
        country: "Japan",
        inbound: 1987,
        outbound: 2134,
        responseTime: 0.4,
        users: 6780,
        status: "high",
      },
      {
        city: "Singapore",
        country: "Singapore",
        inbound: 1456,
        outbound: 1523,
        responseTime: 0.5,
        users: 4230,
        status: "high",
      },
      {
        city: "Seoul",
        country: "South Korea",
        inbound: 1234,
        outbound: 1289,
        responseTime: 0.7,
        users: 3450,
        status: "medium",
      },
      {
        city: "Mumbai",
        country: "India",
        inbound: 987,
        outbound: 1045,
        responseTime: 1.0,
        users: 2890,
        status: "medium",
      },
      {
        city: "Bangkok",
        country: "Thailand",
        inbound: 567,
        outbound: 623,
        responseTime: 1.3,
        users: 1567,
        status: "low",
      },
    ],
    africa: [
      {
        city: "Cairo",
        country: "Egypt",
        inbound: 456,
        outbound: 489,
        responseTime: 1.5,
        users: 1234,
        status: "medium",
      },
      {
        city: "Lagos",
        country: "Nigeria",
        inbound: 378,
        outbound: 412,
        responseTime: 1.8,
        users: 987,
        status: "low",
      },
      {
        city: "Cape Town",
        country: "South Africa",
        inbound: 234,
        outbound: 267,
        responseTime: 1.6,
        users: 678,
        status: "low",
      },
      {
        city: "Nairobi",
        country: "Kenya",
        inbound: 189,
        outbound: 203,
        responseTime: 1.9,
        users: 456,
        status: "low",
      },
      {
        city: "Casablanca",
        country: "Morocco",
        inbound: 123,
        outbound: 134,
        responseTime: 2.1,
        users: 234,
        status: "low",
      },
    ],
    oceania: [
      {
        city: "Sydney",
        country: "Australia",
        inbound: 567,
        outbound: 623,
        responseTime: 0.9,
        users: 1567,
        status: "medium",
      },
      {
        city: "Melbourne",
        country: "Australia",
        inbound: 423,
        outbound: 456,
        responseTime: 1.0,
        users: 1234,
        status: "medium",
      },
      {
        city: "Auckland",
        country: "New Zealand",
        inbound: 189,
        outbound: 203,
        responseTime: 1.2,
        users: 567,
        status: "low",
      },
      {
        city: "Brisbane",
        country: "Australia",
        inbound: 156,
        outbound: 167,
        responseTime: 1.1,
        users: 423,
        status: "low",
      },
      {
        city: "Perth",
        country: "Australia",
        inbound: 89,
        outbound: 95,
        responseTime: 1.3,
        users: 234,
        status: "low",
      },
    ],
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const filterButton = document.getElementById("filterButton");
      if (filterButton && !filterButton.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalMetrics((prev) => ({
        ...prev,
        messagesPerMinute: Math.floor(Math.random() * 500) + 2000,
        avgResponseTime: Math.round((Math.random() * 0.5 + 0.5) * 10) / 10,
        systemLoad: Math.floor(Math.random() * 20) + 65,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "high":
        return "fas fa-circle text-green-500";
      case "medium":
        return "fas fa-circle text-yellow-500";
      case "low":
        return "fas fa-circle text-red-500";
      default:
        return "fas fa-circle text-gray-500";
    }
  };
  const getAllRegionsData = () => {
    return Object.values(regionData).flat();
  };
  const getCurrentRegionData = () => {
    if (selectedContinent === "all") {
      return getAllRegionsData();
    }
    return regionData[selectedContinent as keyof typeof regionData] || [];
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
              <nav className="text-sm text-gray-500">
                <Link to={"/"} className="hover:text-purple-600">
                  <span>Tableau de bord</span>
                </Link>
                <i className="fas fa-chevron-right mx-2"></i>
                <span className="text-pink-800 font-medium">
                  Moniteur d'activité
                </span>
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
        {/* Page Content */}
        <div className="p-6 pt-24">
          {/* Page Title */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Moniteur d'Activité
              </h1>
              <p className="text-gray-500 mt-2">
                Surveillance en temps réel des flux de messages et des
                statistiques régionales
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* <div className="relative">
                <button
                  id="filterButton"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center px-4 py-2 text-gray-600 bg-white border border-solid border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-filter mr-2"></i>
                  Filtrer les Régions
                </button>
                {showFilterDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Continent
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="continentFilter"
                              value="all"
                              checked={selectedContinent === "all"}
                              onChange={() => {
                                setSelectedContinent("all");
                                setGlobalMetrics({
                                  totalActiveUsers: 12847,
                                  messagesPerMinute: 2340,
                                  avgResponseTime: 0.8,
                                  systemLoad: 72,
                                });
                              }}
                              className="text-pink-600 focus:ring-pink-500"
                            />
                            <span className="text-sm text-gray-600">
                              Tous les continents
                            </span>
                          </label>
                          {continents.map((continent) => (
                            <label
                              key={continent.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="radio"
                                name="continentFilter"
                                value={continent.id}
                                checked={selectedContinent === continent.id}
                                onChange={() => {
                                  setSelectedContinent(continent.id);
                                  const regionData = getCurrentRegionData();
                                  const totalUsers = regionData.reduce(
                                    (sum, region) => sum + region.users,
                                    0
                                  );
                                  const totalInbound = regionData.reduce(
                                    (sum, region) => sum + region.inbound,
                                    0
                                  );
                                  const avgResponse =
                                    regionData.reduce(
                                      (sum, region) =>
                                        sum + region.responseTime,
                                      0
                                    ) / regionData.length;
                                  const systemLoadValue = Math.min(
                                    95,
                                    Math.floor((totalUsers / 12847) * 72)
                                  );

                                  setGlobalMetrics({
                                    totalActiveUsers: totalUsers,
                                    messagesPerMinute: Math.floor(
                                      totalInbound / 60
                                    ),
                                    avgResponseTime:
                                      Math.round(avgResponse * 10) / 10,
                                    systemLoad: systemLoadValue,
                                  });
                                }}
                                className="text-pink-600 focus:ring-pink-500"
                              />
                              <span className="text-sm text-gray-600">
                                {continent.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            setSelectedContinent("all");
                            setGlobalMetrics({
                              totalActiveUsers: 12847,
                              messagesPerMinute: 2340,
                              avgResponseTime: 0.8,
                              systemLoad: 72,
                            });
                          }}
                          className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 !rounded-button whitespace-nowrap"
                        >
                          Réinitialiser
                        </button>
                        <button
                          onClick={() => setShowFilterDropdown(false)}
                          className="px-3 py-1.5 text-sm text-white bg-pink-800 rounded-lg hover:bg-pink-700 !rounded-button whitespace-nowrap"
                        >
                          Appliquer
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div> */}
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center px-4 py-2 text-gray-600 bg-white border border-solid border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-download mr-2"></i>
                Exporter les Données
              </button>
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className={`flex items-center px-4 py-2 text-white ${
                  isRefreshing ? "bg-pink-400" : "bg-pink-800 hover:bg-pink-700"
                } rounded-lg cursor-pointer !rounded-button whitespace-nowrap transition-colors duration-200`}
              >
                <i
                  className={`fas fa-sync-alt mr-2 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                ></i>
                {isRefreshing ? "Actualisation..." : "Actualiser"}
              </button>
            </div>
          </div>
          {/* Global Metrics */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-600 text-sm font-medium mb-2">
                    Utilisateurs Actifs Total
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {globalMetrics.totalActiveUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <i className="fas fa-arrow-up mr-1"></i>
                    +12.5% depuis hier
                  </p>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-purple-500 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-600 text-sm font-medium mb-2">
                    Messages/minute
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {globalMetrics.messagesPerMinute.toLocaleString()}
                  </p>
                  <div className="text-sm text-green-500 flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Temps réel
                  </div>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-message text-pink-500 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-600 text-sm font-medium mb-2">
                    Temps de Réponse Moyen
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {globalMetrics.avgResponseTime}s
                  </p>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <i className="fas fa-clock mr-1"></i>
                    Optimal
                  </p>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-clock text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-600 text-sm font-medium mb-2">
                    Charge Système
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {globalMetrics.systemLoad}%
                  </p>
                  <div className="w-24 h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className={`h-full rounded-full ${
                        globalMetrics.systemLoad > 80
                          ? "bg-red-500"
                          : globalMetrics.systemLoad > 60
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${globalMetrics.systemLoad}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-microchip text-pink-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
          {/* Regional Data */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Détails de l'Activité Régionale
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-search mr-2"></i>
                  Rechercher
                </button>
              </div>
              {showSearch && (
                <div className="mt-4 mb-2 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        placeholder="Rechercher par ville, pays..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-solid border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={() =>
                        setShowAdvancedFilters(!showAdvancedFilters)
                      }
                      className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 !rounded-button whitespace-nowrap"
                    >
                      <i className="fas fa-sliders-h mr-2"></i>
                      Filtres avancés
                    </button>
                  </div>
                  {showAdvancedFilters && (
                    <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Statut
                          </label>
                          <select
                            value={filters.status}
                            onChange={(e) =>
                              setFilters({ ...filters, status: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="all">Tous</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Temps de réponse min (s)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={filters.responseTimeMin}
                            onChange={(e) =>
                              setFilters({
                                ...filters,
                                responseTimeMin: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Temps de réponse max (s)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={filters.responseTimeMax}
                            onChange={(e) =>
                              setFilters({
                                ...filters,
                                responseTimeMax: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Continent Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedContinent("all")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer !rounded-button whitespace-nowrap ${
                  selectedContinent === "all"
                    ? "bg-white text-pink-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <i className="fas fa-globe"></i>
                <span>Tous</span>
              </button>
              {continents.map((continent) => (
                <button
                  key={continent.id}
                  onClick={() => setSelectedContinent(continent.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer !rounded-button whitespace-nowrap ${
                    selectedContinent === continent.id
                      ? "bg-white text-pink-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <i className={continent.icon}></i>
                  <span>{continent.name}</span>
                </button>
              ))}
            </div>
            {/* Regional Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-solid border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Localisation
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Messages Entrants
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Messages Sortants
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Temps de Réponse
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Utilisateurs en Ligne
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentRegionData()
                    .filter((region) => {
                      const matchesSearch =
                        searchQuery.toLowerCase() === "" ||
                        region.city
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        region.country
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase());
                      const matchesStatus =
                        filters.status === "all" ||
                        region.status === filters.status;
                      const matchesResponseTime =
                        (filters.responseTimeMin === "" ||
                          region.responseTime >=
                            Number(filters.responseTimeMin)) &&
                        (filters.responseTimeMax === "" ||
                          region.responseTime <=
                            Number(filters.responseTimeMax));
                      return (
                        matchesSearch && matchesStatus && matchesResponseTime
                      );
                    })
                    .map((region, index) => (
                      <tr
                        key={index}
                        className="border-b border-solid border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <i
                              className={`${getStatusIcon(
                                region.status
                              )} text-xs`}
                            ></i>
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {region.city}
                              </p>
                              <p className="text-xs text-gray-500">
                                {region.country}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {region.inbound.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {region.outbound.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {region.responseTime}s
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {region.users.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              region.status
                            )}`}
                          >
                            {region.status.charAt(0).toUpperCase() +
                              region.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up z-50">
          <i className="fas fa-check-circle"></i>
          <span>Données actualisées avec succès</span>
        </div>
      )}
      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-solid border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">
                  Exporter les Données
                </h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-400 hover:text-gray-600 !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Format d'Export
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["csv", "excel", "pdf"].map((format) => (
                    <button
                      key={format}
                      onClick={() => setExportFormat(format)}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors !rounded-button whitespace-nowrap
${
  exportFormat === format
    ? "border-purple-500 bg-pink-50"
    : "border-gray-200 hover:bg-gray-50"
}`}
                    >
                      <i
                        className={`fas fa-file-${
                          format === "excel" ? "excel" : format
                        } text-2xl ${
                          exportFormat === format
                            ? "text-purple-500"
                            : "text-gray-400"
                        }`}
                      ></i>
                      <span
                        className={`text-sm font-medium ${
                          exportFormat === format
                            ? "text-purple-600"
                            : "text-gray-600"
                        }`}
                      >
                        {format.toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Export Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Options d'Export
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Région
                    </label>
                    <select
                      value={exportOptions.region}
                      onChange={(e) =>
                        setExportOptions({
                          ...exportOptions,
                          region: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="current">
                        Région actuelle uniquement
                      </option>
                      <option value="all">Toutes les régions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Période
                    </label>
                    <select
                      value={exportOptions.period}
                      onChange={(e) =>
                        setExportOptions({
                          ...exportOptions,
                          period: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="24h">Dernières 24 heures</option>
                      <option value="7d">7 derniers jours</option>
                      <option value="30d">30 derniers jours</option>
                      <option value="all">Toutes les données</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Colonnes à exporter
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "city", label: "Ville" },
                        { id: "country", label: "Pays" },
                        { id: "inbound", label: "Messages Entrants" },
                        { id: "outbound", label: "Messages Sortants" },
                        { id: "responseTime", label: "Temps de Réponse" },
                        { id: "users", label: "Utilisateurs" },
                        { id: "status", label: "Statut" },
                      ].map((column) => (
                        <label
                          key={column.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={exportOptions.columns.includes(column.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setExportOptions({
                                  ...exportOptions,
                                  columns: [
                                    ...exportOptions.columns,
                                    column.id,
                                  ],
                                });
                              } else {
                                setExportOptions({
                                  ...exportOptions,
                                  columns: exportOptions.columns.filter(
                                    (col) => col !== column.id
                                  ),
                                });
                              }
                            }}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-600">
                            {column.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end space-x-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 !rounded-button whitespace-nowrap"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // Handle export logic here
                  setShowExportModal(false);
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }}
                className="px-4 py-2 text-white bg-pink-800 rounded-lg hover:bg-pink-700 !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-download mr-2"></i>
                Exporter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Monitoring;
