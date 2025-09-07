// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import LeftSideMenu from "../../components/feature/LeftSideMenu";
import { Link } from "react-router-dom";
import type {
  ConversationType,
  messagesType,
  usersType,
} from "../../contants/globalTypes";
import { getAllUsers } from "../../services/userServices";
import { getAllMessages } from "../../services/conversationServices";
import moment from "moment";
import { getLocationFromNumber } from "../../utils/numberUtils";
import Loader from "../../components/base/Loader";
const Conversation: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<number>(1);

  const [users, setUsers] = useState<usersType[]>([]);
  const [messages, setMessages] = useState<messagesType[]>([]);

  const [loading, setLoading] = useState({
    users: true,
    messages: true,
  });

  const [error, setError] = useState({
    users: null,
    messages: null,
  });

  let usersCollection: (usersType & { messages?: messagesType[] })[] = [];
  let conversations: ConversationType[] = [];

  const setConversation = () => {
    if (users.length > 0) {
      for (const user of users) {
        const userMessages = messages.filter((msg) => msg.user_id === user.id);
        usersCollection.push({ ...user, messages: userMessages });
      }

      const sortedConversations = usersCollection.slice().sort((a, b) => {
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

      const conversationFormat = sortedConversations.map(
        (user: usersType & { messages?: messagesType[] }) => {
          return {
            id: user.id,
            status: user.status === "active" ? "Actif" : "Terminé",
            startDate: user.messages?.length
              ? new Date(user.messages[0].timestamp).toLocaleDateString()
              : "",
            startTime: user.messages?.length
              ? new Date(user.messages[0].timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",
            endDate: user.messages?.length
              ? new Date(
                  user.messages[user.messages.length - 1].timestamp
                ).toLocaleDateString()
              : "",
            endTime: user.messages?.length
              ? new Date(
                  user.messages[user.messages.length - 1].timestamp
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",
            duration: "",
            messageCount: user.messages?.length || 0,
            confidenceRate: Math.floor(Math.random() * 21) + 80, // Random between 80-100
            user: user.name,
            phone: user.phone,
            userAvatar: "",
            topic: "",
            lastMessage: user.messages?.length
              ? user.messages[user.messages.length - 1].content
              : "",
            messages: [...(user.messages ?? [])],
          };
        }
      );

      conversations = [...conversationFormat];
    }
  };

  setConversation();

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

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.users);
      } catch (err: any) {
        setError((prev) => ({ ...prev, users: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, users: false }));
      }
    };

    const fetchConversations = async () => {
      try {
        const res = await getAllMessages();
        setMessages(res.messages);
      } catch (err: any) {
        setError((prev) => ({ ...prev, posts: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, posts: false }));
      }
    };

    fetchUsers();
    fetchConversations();
  }, []);

  if (loading.messages && loading.users) {
    return <Loader />;
  }

  if (error.messages && error.users) {
    return (
      <div style={{ color: "red", textAlign: "center" }}>
        ❌ {error.messages} {error.users}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans max-h-[100vh] overflow-hidden">
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
                  Gestion des Conversations
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
        {/* Page Title */}
        <div className="px-6 py-4 pt-24">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Gestion des Conversations
              </h1>
              <p className="text-gray-500 mt-1">
                Suivi et analyse des conversations actives et terminées
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 text-gray-600 bg-white border border-solid border-gray-200 rounded-lg hover:bg-gray-50 !rounded-button whitespace-nowrap">
                <i className="fas fa-download mr-2"></i>
                Exporter
              </button>
              <button
                className="flex items-center px-4 py-2 text-white bg-pink-800 rounded-lg hover:bg-pink-700 !rounded-button whitespace-nowrap"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <i className="fas fa-sync-alt mr-2"></i>
                Actualiser
              </button>
            </div>
          </div>
        </div>
        {/* Split Layout */}
        <div className="flex h-screen">
          {/* Left Side - Conversations List */}
          <div className="w-1/3 bg-white pb-[100px] border-r border-gray-200 flex flex-col h-[calc(100vh-8rem)] overflow-hidden">
            {/* Search and Filters */}
            <div className="p-4 border-b border-solid border-gray-50">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Rechercher par utilisateur, email ou tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white border border-solid border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer w-full"
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
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedConversation === conversation.id
                      ? "bg-pink-100 border-pink-200 border-l-4 border-l-pink-600"
                      : "hover:bg-gray-50 border-l-4 border-l-transparent"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-neutral-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-user text-neutral-400 text-sm"></i>
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
                          {conversation.status === "active" && (
                            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">
                              Élevé
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">
                        {conversation.phone}
                      </p>
                      <p className="text-sm text-gray-600 truncate mb-2">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {conversation.startDate} {conversation.startTime}
                        </span>
                        <span>{conversation.messages.length} messages</span>
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
                <div className="bg-white border-b border-solid border-gray-100 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-neutral-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-neutral-400 text-sm"></i>
                      </div>
                      {/* <img
                        src={currentConversation.userAvatar}
                        alt={currentConversation.user}
                        className="w-12 h-12 rounded-full object-cover object-top"
                      /> */}
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {currentConversation.user}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {currentConversation.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-white border border-solid border-gray-200 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 !rounded-button whitespace-nowrap">
                        <i className="fas fa-earth mr-2"></i>
                        {/* Profil */}
                        {
                          getLocationFromNumber(currentConversation.phone)
                            .location
                        }
                      </button>
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
                  </div>
                </div>
                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-4 pb-[100px] bg-[#efeae2] bg-opacity-50"
                  style={{ maxHeight: "calc(100vh - 280px)" }}
                >
                  <div className="space-y-4">
                    {currentConversation.messages?.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`relative max-w-xl ${
                            message.sender === "user"
                              ? "bg-[#dcf8c6]"
                              : "bg-white"
                          } p-3 rounded-lg shadow-sm`}
                        >
                          {/* Message triangle */}
                          <div
                            className={`absolute top-0 ${
                              message.sender === "user"
                                ? "right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45"
                                : "left-0 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                            } w-4 h-4 ${
                              message.sender === "user"
                                ? "bg-[#dcf8c6]"
                                : "bg-white"
                            }`}
                          ></div>
                          <p
                            className={`text-sm ${
                              message.sender === "user"
                                ? "text-gray-800"
                                : "text-gray-800"
                            }`}
                          >
                            {message.content}
                          </p>
                          <div className="flex items-center justify-end mt-1 space-x-2">
                            <span className="text-[10px] text-gray-500">
                              {moment(message.timestamp).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </span>
                            {/* {message.sender === "user" && message.tags && (
                              <div className="flex space-x-1">
                                {message.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="bg-[#25d366] bg-opacity-20 px-1.5 py-0.5 rounded text-[10px] text-green-800"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )} */}
                            {/* {message.sender === "bot" && message.confidence && (
                              <span
                                className={`text-[10px] font-medium ${getConfidenceColor(
                                  message.confidence
                                )}`}
                              >
                                {message.confidence}%
                              </span>
                            )} */}
                            {message.sender === "user" && (
                              <i className="fas fa-check-double text-[10px] text-blue-500"></i>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-[#efeae2] bg-opacity-50">
                <p className="text-gray-500 mt-[-100px]">
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
