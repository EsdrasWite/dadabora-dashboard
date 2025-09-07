// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import LeftSideMenu from "../../components/feature/LeftSideMenu";

import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/userServices";
import Loader from "../../components/base/Loader";
import {
  addLocationToUsers,
  countCurrentMonthItems,
} from "../../utils/numberUtils";
import { getAllMessages } from "../../services/conversationServices";
import type { messagesType, usersType } from "../../contants/globalTypes";
const Users: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleExport = (type: string) => {
    // Here you can implement the actual export logic
    console.log(`Exporting ${type} format...`);
    setShowExportMenu(false);
  };

  const [users, setUsers] = useState<usersType[]>([]);
  const [messages, setMessages] = useState<messagesType[]>([]);
  const [loading, setLoading] = useState(true); // loader
  const [error, setError] = useState(null); // error

  // Close export menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const exportButton = document.getElementById("exportButton");
      if (
        showExportMenu &&
        exportButton &&
        !exportButton.contains(event.target as Node)
      ) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showExportMenu]);
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown !== null &&
        !(event.target as Element).closest(".user-dropdown")
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeDropdown]);

  // const getStatusColor = (status: string) => {
  //   return status === "active"
  //     ? "bg-green-100 text-green-800 border-green-200"
  //     : "bg-gray-100 text-gray-800 border-gray-200";
  // };
  // const getStatusText = (status: string) => {
  //   return status === "active" ? "Actif" : "Actif";
  // };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesLocation =
      locationFilter === "all" || user.location === locationFilter;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue: any = a[sortField as keyof typeof a];
    let bValue: any = b[sortField as keyof typeof b];
    if (sortField === "conversion") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };
  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.id));
    }
  };
  const locations = [...new Set(users.map((user) => user.location))];

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

    fetchUsers();
    fetchMessages();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
                <span className="text-pink-800 font-medium">
                  Gestion des utilisateurs
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
        <main className="p-6 pt-24">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  Gestion des Utilisateurs
                </h1>
                <p className="text-gray-600">
                  Gérez les comptes utilisateurs et leurs informations
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button
                    id="exportButton"
                    onClick={() => {
                      const csvContent = [
                        [
                          "Nom",
                          "Téléphone",
                          "Localisation",
                          "Conversion",
                          "Statut",
                          "Dernière Activité",
                        ],
                        ...users.map((user) => [
                          user.name,
                          user.phone,
                          // user.location,
                          // user.conversion.toString(),
                          user.status === "inactive" ? "Inactive" : "Active",
                          // user.lastActivity,
                        ]),
                      ]
                        .map((row) => row.join(","))
                        .join("\n");
                      const blob = new Blob([csvContent], {
                        type: "text/csv;charset=utf-8;",
                      });
                      const link = document.createElement("a");
                      const url = URL.createObjectURL(blob);
                      link.setAttribute("href", url);
                      link.setAttribute(
                        "download",
                        `users_export_${
                          new Date().toISOString().split("T")[0]
                        }.csv`
                      );
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-4 py-2 bg-white text-gray-700 border border-solid border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap flex items-center"
                  >
                    <i className="fas fa-download mr-2"></i>Exporter
                  </button>
                  {showExportMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                          Format d'export
                        </h3>
                        <div className="space-y-2">
                          <button
                            onClick={() => handleExport("csv")}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center"
                          >
                            <i className="fas fa-file-csv mr-2 text-green-600"></i>
                            CSV
                          </button>
                          <button
                            onClick={() => handleExport("excel")}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center"
                          >
                            <i className="fas fa-file-excel mr-2 text-green-600"></i>
                            Excel
                          </button>
                          <button
                            onClick={() => handleExport("pdf")}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center"
                          >
                            <i className="fas fa-file-pdf mr-2 text-red-600"></i>
                            PDF
                          </button>
                        </div>
                        <hr className="my-3 border-gray-200" />
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                          Données à exporter
                        </h3>
                        <div className="space-y-2">
                          <button
                            onClick={() => handleExport("current")}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center"
                          >
                            <i className="fas fa-list mr-2 text-pink-600"></i>
                            Utilisateurs affichés ({paginatedUsers.length})
                          </button>
                          <button
                            onClick={() => handleExport("all")}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center"
                          >
                            <i className="fas fa-users mr-2 text-pink-600"></i>
                            Tous les utilisateurs ({users.length})
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  id="refreshButton"
                  onClick={async () => {
                    setIsRefreshing(true);
                    try {
                      // Simulate API call delay
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      // Here you would typically fetch fresh data from your API
                      // For now we'll just reset filters and reload current data
                      setSearchTerm("");
                      setStatusFilter("all");
                      setLocationFilter("all");
                      setCurrentPage(1);
                      //roload the page
                      window.location.reload();
                    } catch (error) {
                      console.error("Error refreshing data:", error);
                    } finally {
                      setIsRefreshing(false);
                    }
                  }}
                  disabled={isRefreshing}
                  className={`px-4 py-2 text-white bg-pink-800 rounded-lg hover:bg-pink-600 cursor-pointer !rounded-button whitespace-nowrap flex items-center ${
                    isRefreshing ? "opacity-75" : ""
                  }`}
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
          </div>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 mb-1">
                    Total utilisateurs
                  </span>
                  <span className="text-3xl font-bold text-pink-600">
                    {users.length}
                  </span>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-pink-600 text-xl"></i>
                </div>
              </div>
            </div>
            {/* Active Users */}
            {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 mb-1">Actifs</span>
                  <span className="text-3xl font-bold text-green-600">
                    {users.length}
                  </span>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-user-check text-green-600 text-xl"></i>
                </div>
              </div>
            </div> */}
            {/* New Users */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 mb-1">
                    Nouveaux ce mois
                  </span>
                  <span className="text-3xl font-bold text-pink-600">
                    {countCurrentMonthItems(users)}
                  </span>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-user-plus text-pink-600 text-xl"></i>
                </div>
              </div>
            </div>
            {/* Average Age */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 mb-1">Pays</span>
                  <span className="text-3xl font-bold text-orange-600">
                    {new Set(users.map((user) => user.location)).size}
                  </span>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-orange-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher par nom, téléphone ou localisation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-solid border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>
              </div>
              <div className="flex space-x-4">
                {/* <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white border border-solid border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                </div> */}
                <div className="relative">
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="appearance-none bg-white border border-solid border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                  >
                    <option value="all">Toutes les régions</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                </div>
              </div>
            </div>
          </div>
          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-pink-700">
                  {selectedUsers.length} utilisateur
                  {selectedUsers.length > 1 ? "s" : ""} sélectionné
                  {selectedUsers.length > 1 ? "s" : ""}
                </span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-check mr-1"></i>Activer
                  </button>
                  <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-ban mr-1"></i>Désactiver
                  </button>
                  <button className="px-3 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700 cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-download mr-1"></i>Exporter
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Users Table */}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedUsers.length === paginatedUsers.length &&
                          paginatedUsers.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 cursor-pointer"
                      />
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Pseudo</span>
                        <i
                          className={`fas fa-sort${
                            sortField === "name"
                              ? sortDirection === "asc"
                                ? "-up"
                                : "-down"
                              : ""
                          } text-xs`}
                        ></i>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Téléphone
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("location")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Localisation</span>
                        <i
                          className={`fas fa-sort${
                            sortField === "location"
                              ? sortDirection === "asc"
                                ? "-up"
                                : "-down"
                              : ""
                          } text-xs`}
                        ></i>
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("conversion")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Conversation</span>
                        <i
                          className={`fas fa-sort${
                            sortField === "conversion"
                              ? sortDirection === "asc"
                                ? "-up"
                                : "-down"
                              : ""
                          } text-xs`}
                        ></i>
                      </div>
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Statut
                    </th> */}

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {usersCollection.map((user, index) => (
                    <tr
                      key={user.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-pink-25"
                      } border-b border-solid border-gray-100 hover:bg-gray-50`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-neutral-500 rounded-full flex items-center justify-center">
                            <i className="fas fa-user text-neutral-400 text-sm"></i>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">
                              {user.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center">
                          <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                          {user.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <i className="fas fa-comment text-pink-500 mr-2"></i>
                          <span className="text-sm font-medium text-gray-800">
                            {user.messages ? user.messages.length : 0}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">
                            messages
                          </span>
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            user.status || "inactive"
                          )}`}
                        >
                          {getStatusText(user.status || "inactive")}
                        </span>
                      </td> */}

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                        <div className="user-dropdown">
                          <button
                            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-100"
                            title="Plus d'options"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(
                                activeDropdown === user.id ? null : user.id
                              );
                            }}
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </button>
                          {activeDropdown === user.id && (
                            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                              <div className="py-1">
                                {/* <Link
                                  to={`/users/${user.id}`}
                                  state={{ user }}
                                  data-readdy="true"
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <i className="fas fa-eye mr-3 w-4 text-gray-400"></i>
                                  Profil
                                </Link>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                  <i className="fas fa-edit mr-3 w-4 text-gray-400"></i>
                                  Modifier
                                </button> */}
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                  <i className="fas fa-comment mr-3 w-4 text-gray-400"></i>
                                  Ouvrir la conversation
                                </button>
                                {/* <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                  <i
                                    className={`fas fa-${
                                      user.status === "active" ? "ban" : "check"
                                    } mr-3 w-4 text-gray-400`}
                                  ></i>
                                  {user.status === "active"
                                    ? "Désactiver"
                                    : "Activer"}
                                </button>
                                <hr className="my-1 border-gray-200" />
                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                                  <i className="fas fa-trash-alt mr-3 w-4"></i>
                                  Supprimer
                                </button> */}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="bg-white px-6 py-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Affichage de {startIndex + 1} à{" "}
                    {Math.min(startIndex + itemsPerPage, sortedUsers.length)}{" "}
                    sur {sortedUsers.length} utilisateurs
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">
                      Éléments par page:
                    </span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border border-solid border-gray-200 rounded px-2 py-1 text-sm cursor-pointer"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-200 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-chevron-left mr-1"></i>Précédent
                  </button>
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 text-sm rounded cursor-pointer !rounded-button whitespace-nowrap ${
                            currentPage === pageNum
                              ? "bg-pink-600 text-white"
                              : "border border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-200 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Suivant<i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Users;
