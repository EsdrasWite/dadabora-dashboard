// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import LeftSideMenu from "../../components/feature/LeftSideMenu";
import { Link } from "react-router-dom";
const Conversation: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [userFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<number>(0);

  const conversations = [
    {
      id: 1,
      status: "completed",
      startDate: "2025-08-12",
      startTime: "14:32",
      endDate: "2025-08-12",
      endTime: "12:45",
      duration: "12m 45s",
      messageCount: 12,
      confidenceRate: 92,
      user: "Marie Dubois",
      email: "marie.dubois@email.com",
      userAvatar: "",
      topic: "consultation nutrition diabète",
      lastMessage: "Merci beaucoup pour ces conseils nutritionnels détaillés.",
      messages: [
        {
          id: 1,
          sender: "user",
          text: "Bonjour, j'aimerais des conseils pour mieux gérer mon diabète au quotidien.",
          time: "15/01/2024 12:30",
          tags: ["diabète", "gestion"],
          confidence: 92,
        },
        {
          id: 2,
          sender: "bot",
          text: "Bonjour ! Je serais ravi de vous aider avec la gestion de votre diabète. Pouvez-vous me dire quel type de diabète vous avez et depuis quand ?",
          time: "15/01/2024 12:30",
          confidence: 92,
        },
        {
          id: 3,
          sender: "user",
          text: "J'ai un diabète de type 2, diagnostiqué il y a 3 ans. J'ai du mal avec l'alimentation.",
          time: "15/01/2024 12:31",
          tags: ["diabète type 2", "alimentation"],
          confidence: 92,
        },
      ],
    },
    {
      id: 2,
      status: "active",
      startDate: "2025-08-12",
      startTime: "13:15",
      endDate: null,
      endTime: null,
      duration: "27m 18s",
      messageCount: 8,
      confidenceRate: 89,
      user: "Pierre Martin",
      email: "pierre.martin@email.com",
      userAvatar: "",
      topic: "urgence douleur poitrine",
      lastMessage: "La douleur persiste depuis ce matin...",
      messages: [
        {
          id: 1,
          sender: "user",
          text: "La douleur persiste depuis ce matin...",
          time: "15/01/2024 13:15",
          tags: ["urgence", "douleur", "poitrine"],
          confidence: 92,
        },
      ],
    },
    {
      id: 3,
      status: "completed",
      startDate: "2025-08-12",
      startTime: "12:08",
      endDate: "2025-08-12",
      endTime: "11:20",
      duration: "8m 12s",
      messageCount: 15,
      confidenceRate: 96,
      user: "Sophie Bernard",
      email: "sophie.bernard@email.com",
      userAvatar: "",
      topic: "tension",
      lastMessage: "Je vais suivre vos recommandations pour la tension.",
      messages: [
        {
          id: 1,
          sender: "user",
          text: "Je vais suivre vos recommandations pour la tension.",
          time: "15/01/2024 11:20",
          tags: ["consultation", "diabète"],
          confidence: 92,
        },
      ],
    },
  ];

  const getConfidenceColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 80) return "text-yellow-600";
    return "text-red-600";
  };
  const filteredConversations = conversations.filter((conv) => {
    const matchesStatus =
      statusFilter === "all" || conv.status === statusFilter;
    const matchesUser =
      userFilter === "all" ||
      conv.user.toLowerCase().includes(userFilter.toLowerCase());
    const matchesSearch =
      searchQuery === "" ||
      conv.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesUser && matchesSearch;
  });
  const currentConversation = conversations.find(
    (conv) => conv.id === selectedConversation
  );
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
                <span className="text-purple-600 font-medium">
                  Gestion des Conversations
                </span>
              </nav>
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
        {/* Page Title */}
        <div className="px-6 py-4 pt-24">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Gestion des Conversations
              </h1>
              <p className="text-gray-500 mt-1">
                Suivi et analyse des conversations actives et terminées
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 text-gray-600 bg-white border border-solid border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
                <i className="fas fa-download mr-2"></i>
                Exporter
              </button>
              <button className="flex items-center px-4 py-2 text-white bg-purple-400 rounded-lg hover:bg-purple-700 !rounded-button whitespace-nowrap">
                <i className="fas fa-sync-alt mr-2"></i>
                Actualiser
              </button>
            </div>
          </div>
        </div>
        {/* Split Layout */}
        <div className="flex h-screen">
          {/* Left Side - Conversations List */}
          <div className="w-1/3 bg-white border-r border-solid border-gray-200 flex flex-col">
            {/* Search and Filters */}
            <div className="p-4 border-b border-solid border-gray-100">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Rechercher par utilisateur, email ou tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer w-full"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="completed">Terminé</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                </div>
              </div>
            </div>
            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedConversation === conversation.id
                      ? "bg-purple-50 border-purple-200 border-l-4 border-solid border-l-purple-600"
                      : "hover:bg-gray-50 border-l-4 border-l-transparent"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-user text-white text-sm"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800 text-sm truncate">
                          {conversation.user}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                              conversation.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {conversation.status === "active"
                              ? "Actif"
                              : "Terminé"}
                          </span>
                          {/* {conversation.status === "active" && (
                            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">
                              Élevé
                            </span>
                          )} */}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">
                        {conversation.email}
                      </p>
                      <p className="text-sm text-gray-600 truncate mb-2">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {conversation.startDate} {conversation.startTime}
                        </span>
                        <span>{conversation.messageCount} messages</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right Side - Conversation Detail */}
          <div className="flex-1 flex flex-col">
            {currentConversation ? (
              <>
                {/* Conversation Header */}
                <div className="bg-white border-b border-solid border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-white text-sm"></i>
                      </div> */}
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {currentConversation.user}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {currentConversation.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/users/${currentConversation.id}`}
                        className="px-4 py-2 bg-white border border-solid !border-gray-200 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 !rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-user mr-2"></i>
                        Profil
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Début:</p>
                      <p className="font-medium">
                        {currentConversation.startDate}{" "}
                        {currentConversation.startTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fin:</p>
                      <p className="font-medium">
                        {currentConversation.endDate || "-"}{" "}
                        {currentConversation.endTime || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Messages:</p>
                      <p className="font-medium">
                        {currentConversation.messageCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Confiance bot:</p>
                      <p
                        className={`font-medium ${getConfidenceColor(
                          currentConversation.confidenceRate
                        )}`}
                      >
                        {currentConversation.confidenceRate}%
                      </p>
                    </div>
                  </div>
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {currentConversation.messages?.map((message) => (
                    <div key={message.id}>
                      {message.sender === "user" ? (
                        <div className="bg-purple-100 text-purple-600 p-4 rounded-lg max-w-2xl ml-auto">
                          <p>{message.text}</p>
                          <div className="flex items-center justify-between mt-2 text-xs">
                            <span>{message.time}</span>
                            {message.tags && (
                              <div className="flex space-x-1">
                                {message.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="bg-purple-400 text-white px-2 py-0.5 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-100 p-4 rounded-lg max-w-2xl">
                          <p className="text-gray-800">{message.text}</p>
                          <div className="flex items-center justify-between mt-2 text-xs">
                            <span className="text-gray-500">
                              {message.time}
                            </span>
                            {message.confidence && (
                              <span
                                className={`font-medium ${getConfidenceColor(
                                  message.confidence
                                )}`}
                              >
                                {message.confidence}%
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">
                  Sélectionnez une conversation pour voir les détails
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Conversation;
