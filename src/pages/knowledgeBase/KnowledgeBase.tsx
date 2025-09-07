// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import LeftSideMenu from "../../components/feature/LeftSideMenu";
import { Link } from "react-router-dom";
import type { contexteType } from "../../contants/globalTypes";
import { getAllContexts } from "../../services/contexteServices";
import Loader from "../../components/base/Loader";
const KnowledgeBase: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddContexteModal, setShowAddContexteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [editingContexte, setEditingContexte] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contexteToDelete, setContexteToDelete] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [testQuery, setTestQuery] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [testingContexte, setTestingContexte] = useState<any>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  const [contexts, setContexts] = useState<contexteType[]>([]);

  const [loading, setLoading] = useState({
    contexts: true,
  });

  const [error, setError] = useState({
    contexts: null as string | null,
  });

  const getSuggestedQuestions = (category: string) => {
    const questionsByCategory: { [key: string]: string[] } = {
      technique: [
        "Comment puis-je résoudre ce problème technique ?",
        "Quelles sont les étapes de dépannage ?",
        "Y a-t-il des prérequis techniques à connaître ?",
      ],
      paiement: [
        "Quel est le processus de remboursement ?",
        "Quels documents sont nécessaires ?",
        "Quels sont les délais de traitement ?",
      ],
      livraison: [
        "Quel est le délai de livraison standard ?",
        "Comment suivre ma livraison ?",
        "Quelles sont les options de livraison disponibles ?",
      ],
      autres: [
        "Quelles sont les heures d'ouverture ?",
        "Comment prendre rendez-vous ?",
        "Quels sont les services disponibles ?",
      ],
    };
    return questionsByCategory[category] || questionsByCategory.autres;
  };

  const categories = [
    {
      id: "sante-menstruelle",
      name: "Santé menstruelle & troubles du cycle",
      icon: "fas fa-calendar-alt",
      count: 45,
      lastUpdate: "2025-08-28",
      color: "bg-pink-500",
    },
    {
      id: "contraception-sexualite",
      name: "Contraception & sexualité",
      icon: "fas fa-heart",
      count: 38,
      lastUpdate: "2025-08-27",
      color: "bg-red-500",
    },
    {
      id: "grossesse-maternite",
      name: "Grossesse, fertilité & maternité",
      icon: "fas fa-baby",
      count: 52,
      lastUpdate: "2025-08-26",
      color: "bg-pink-500",
    },
    {
      id: "sante-gynecologique",
      name: "Santé gynécologique générale",
      icon: "fas fa-stethoscope",
      count: 41,
      lastUpdate: "2025-08-25",
      color: "bg-blue-500",
    },
    {
      id: "sante-hormonale",
      name: "Santé hormonale & ménopause",
      icon: "fas fa-chart-line",
      count: 33,
      lastUpdate: "2025-08-24",
      color: "bg-teal-500",
    },
    {
      id: "autres",
      name: "Autres",
      icon: "fas fa-folder",
      count: 15,
      lastUpdate: "2025-08-23",
      color: "bg-gray-500",
    },
  ];
  // let contextes: contexteType[] = [];
  // contextes = contexts.map((context) => ({
  //   ...context,
  //   categories: "autres",
  //   tags: ["", ""],
  //   author: "Dr. Admin",
  //   lastModified: "2025-08-30",
  //   status: "publié",
  //   views: 100,
  //   confidence: 90,
  // }));

  console.log(contexts);
  const contextes = [
    {
      id: 1,
      title: "Comprendre et gérer les cycles menstruels irréguliers",
      category: "Santé menstruelle & troubles du cycle",
      tags: ["cycles irréguliers", "menstruation", "règles"],
      author: "Dr. Sophie Martin",
      lastModified: "2025-08-28 09:30",
      status: "publié",
      views: 342,
      confidence: 95,
    },
    {
      id: 2,
      title: "Les différentes méthodes de contraception naturelle",
      category: "Contraception & sexualité",
      tags: ["contraception", "planning familial", "méthodes naturelles"],
      author: "Dr. Marie Dubois",
      lastModified: "2025-08-27 14:45",
      status: "publié",
      views: 289,
      confidence: 92,
    },
    {
      id: 3,
      title: "Préparation à la grossesse : guide complet",
      category: "Grossesse, fertilité & maternité",
      tags: ["fertilité", "conception", "planning"],
      author: "Dr. Claire Bernard",
      lastModified: "2025-08-27 11:20",
      status: "publié",
      views: 456,
      confidence: 94,
    },
    {
      id: 4,
      title: "Prévention et dépistage du cancer du col de l'utérus",
      category: "Santé gynécologique générale",
      tags: ["dépistage", "prévention", "santé"],
      author: "Dr. Laurent",
      lastModified: "2025-08-26 16:30",
      status: "publié",
      views: 234,
      confidence: 96,
    },
    {
      id: 5,
      title: "Gérer les symptômes de la périménopause",
      category: "Santé hormonale & ménopause",
      tags: ["ménopause", "hormones", "symptômes"],
      author: "Dr. Anne Richard",
      lastModified: "2025-08-26 10:15",
      status: "publié",
      views: 178,
      confidence: 91,
    },
    {
      id: 6,
      title: "Syndrome prémenstruel : solutions naturelles",
      category: "Santé menstruelle & troubles du cycle",
      tags: ["SPM", "bien-être", "naturel"],
      author: "Dr. Sophie Martin",
      lastModified: "2025-08-25 15:40",
      status: "publié",
      views: 267,
      confidence: 89,
    },
    {
      id: 7,
      title: "Guide des infections sexuellement transmissibles",
      category: "Contraception & sexualité",
      tags: ["IST", "prévention", "santé sexuelle"],
      author: "Dr. Marie Dubois",
      lastModified: "2025-08-25 09:20",
      status: "publié",
      views: 312,
      confidence: 93,
    },
    {
      id: 8,
      title: "Nutrition pendant la grossesse",
      category: "Grossesse, fertilité & maternité",
      tags: ["alimentation", "grossesse", "vitamines"],
      author: "Dr. Claire Bernard",
      lastModified: "2025-08-24 14:50",
      status: "publié",
      views: 389,
      confidence: 95,
    },
    {
      id: 9,
      title: "Endométriose : symptômes et traitements",
      category: "Santé gynécologique générale",
      tags: ["endométriose", "douleur", "traitement"],
      author: "Dr. Laurent",
      lastModified: "2025-08-24 11:30",
      status: "publié",
      views: 423,
      confidence: 94,
    },
    {
      id: 10,
      title: "Thérapie hormonale de la ménopause",
      category: "Santé hormonale & ménopause",
      tags: ["THS", "hormones", "ménopause"],
      author: "Dr. Anne Richard",
      lastModified: "2025-08-23 16:25",
      status: "publié",
      views: 245,
      confidence: 92,
    },
    {
      id: 11,
      title: "Aménorrhée : causes et solutions",
      category: "Santé menstruelle & troubles du cycle",
      tags: ["absence règles", "hormones", "diagnostic"],
      author: "Dr. Sophie Martin",
      lastModified: "2025-08-23 10:15",
      status: "en révision",
      views: 167,
      confidence: 85,
    },
    {
      id: 12,
      title: "Contraception d'urgence : guide pratique",
      category: "Contraception & sexualité",
      tags: ["urgence", "pilule", "contraception"],
      author: "Dr. Marie Dubois",
      lastModified: "2025-08-22 15:40",
      status: "publié",
      views: 534,
      confidence: 96,
    },
    {
      id: 13,
      title: "Gestion des nausées matinales",
      category: "Grossesse, fertilité & maternité",
      tags: ["grossesse", "nausées", "bien-être"],
      author: "Dr. Claire Bernard",
      lastModified: "2025-08-22 09:30",
      status: "brouillon",
      views: 0,
      confidence: 0,
    },
    {
      id: 14,
      title: "Fibromes utérins : comprendre et agir",
      category: "Santé gynécologique générale",
      tags: ["fibromes", "utérus", "traitement"],
      author: "Dr. Laurent",
      lastModified: "2025-08-21 14:20",
      status: "publié",
      views: 289,
      confidence: 93,
    },
    {
      id: 15,
      title: "Ostéoporose et ménopause",
      category: "Santé hormonale & ménopause",
      tags: ["os", "prévention", "calcium"],
      author: "Dr. Anne Richard",
      lastModified: "2025-08-21 10:45",
      status: "publié",
      views: 198,
      confidence: 91,
    },
    {
      id: 16,
      title: "SOPK : diagnostic et traitement",
      category: "Santé menstruelle & troubles du cycle",
      tags: ["ovaires", "hormones", "fertilité"],
      author: "Dr. Sophie Martin",
      lastModified: "2025-08-20 16:30",
      status: "publié",
      views: 445,
      confidence: 94,
    },
    {
      id: 17,
      title: "Santé intime : mythes et réalités",
      category: "Contraception & sexualité",
      tags: ["hygiène", "santé", "bien-être"],
      author: "Dr. Marie Dubois",
      lastModified: "2025-08-20 11:25",
      status: "en révision",
      views: 156,
      confidence: 82,
    },
    {
      id: 18,
      title: "Allaitement : conseils et astuces",
      category: "Grossesse, fertilité & maternité",
      tags: ["allaitement", "nouveau-né", "maternité"],
      author: "Dr. Claire Bernard",
      lastModified: "2025-08-19 15:50",
      status: "publié",
      views: 367,
      confidence: 95,
    },
    {
      id: 19,
      title: "Infections vaginales : prévention et traitement",
      category: "Santé gynécologique générale",
      tags: ["infection", "hygiène", "traitement"],
      author: "Dr. Laurent",
      lastModified: "2025-08-19 09:40",
      status: "publié",
      views: 278,
      confidence: 92,
    },
    {
      id: 20,
      title: "Bien-être émotionnel pendant la ménopause",
      category: "Santé hormonale & ménopause",
      tags: ["émotions", "stress", "équilibre"],
      author: "Dr. Anne Richard",
      lastModified: "2025-08-18 14:15",
      status: "publié",
      views: 223,
      confidence: 90,
    },
  ];
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.color : "bg-gray-500";
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "publié":
        return "bg-green-100 text-green-800";
      case "brouillon":
        return "bg-yellow-100 text-yellow-800";
      case "en révision":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const filteredContextes = contextes.filter((contexte) => {
    const matchesSearch = contexte.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // ||
    // contexte.tags.some((tag) =>
    //   tag.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    const matchesCategory =
      categoryFilter === "all" || contexte.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || contexte.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  const handleTestQuery = () => {
    if (testQuery.trim()) {
      // Simulation d'une réponse du chatbot
      setTimeout(() => {
        setTestResponse(
          `Basé sur votre question "${testQuery}", voici la réponse générée par le chatbot : Cette information est disponible dans notre base de connaissances. Pour plus de détails, consultez l'contexte correspondant dans la catégorie appropriée.`
        );
      }, 1000);
    }
  };

  React.useEffect(() => {
    const fetchContexts = async () => {
      try {
        const res = await getAllContexts();
        setContexts(res.contexts || []);
      } catch (err: any) {
        setError((prev) => ({ ...prev, contexts: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, contexts: false }));
      }
    };

    fetchContexts();
  }, []);

  console.log(contexts);

  if (loading.contexts && loading.contexts) {
    return <Loader />;
  }

  if (error.contexts && error.contexts) {
    return (
      <div style={{ color: "red", textAlign: "center" }}>
        ❌ {error.contexts} {error.contexts}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
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
                <span className="text-pink-800 font-medium">Expertise</span>
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  Expertise
                </h1>
                <p className="text-gray-600">
                  Géstion de la base de Connaissances DadaBora{" "}
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-white border border-solid border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-download mr-2"></i>Exporter les Données
                </button>
                <button
                  onClick={() => setShowAddContexteModal(true)}
                  className="px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-700 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-plus mr-2"></i>Ajouter un Contexte
                </button>
              </div>
            </div>
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
                <div className="flex-1 relative">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                  <input
                    type="text"
                    placeholder="Rechercher des contextes, tags ou contenu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="flex space-x-3">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm cursor-pointer"
                  >
                    <option value="all">Toutes les catégories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm cursor-pointer"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="publié">Publié</option>
                    <option value="brouillon">Brouillon</option>
                    <option value="en révision">En révision</option>
                  </select>
                  <button
                    onClick={() => setShowTestModal(true)}
                    className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-flask mr-2"></i>Tester
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Contextes List */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="p-6 border-b border-solid border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Contextes ({filteredContextes.length})
                  {/* Contextes ({contexts.length}) */}
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Trier par :</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1 border border-solid border-gray-200 rounded-lg text-sm cursor-pointer"
                    >
                      <option value="date">Date de modification</option>
                      <option value="title">Titre</option>
                      {/* <option value="views">Vues</option>
                      <option value="confidence">Confiance</option> */}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContextes.map((contexte) => (
                  <div
                    key={contexte.id}
                    className="bg-white border border-solid border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 bg-gray-500 rounded-full`}
                          ></div>
                          <span className="text-sm text-gray-900 capitalize">
                            {contexte.category}
                          </span>
                        </div>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800`}
                        >
                          {contexte.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {contexte.title}
                      </h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {contexte.tags &&
                          contexte.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-2">
                          <i className="fas fa-user"></i>
                          <span>{contexte.author}</span>
                        </div>
                        {/* <div className="flex items-center space-x-2">
                          <i className="fas fa-eye"></i>
                          <span>{contexte.views} vues</span>
                        </div> */}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {contexte.lastModified}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingContexte(contexte);
                              setShowEditModal(true);
                            }}
                            className="p-2 text-gray-500 hover:bg-blue-50 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                            title="Modifier"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => {
                              setTestingContexte(contexte);
                              setTestQuery(
                                `Comment fonctionne "${contexte.title}" ?`
                              );
                              // setSuggestedQuestions(
                              //   getSuggestedQuestions(contexte.category)
                              // );
                              setShowTestModal(true);
                            }}
                            className="p-2 text-green-800 hover:bg-green-50 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                            title="Tester"
                          >
                            <i className="fas fa-flask"></i>
                          </button>
                          <button
                            onClick={() => {
                              setContexteToDelete(contexte);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                            title="Supprimer"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* {filteredContextes.map((contexte) => (
                  <div
                    key={contexte.id}
                    className="bg-white border border-solid border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 ${getCategoryColor(
                              contexte.category
                            )} rounded-full`}
                          ></div>
                          <span className="text-sm text-gray-900 capitalize">
                            {contexte.category}
                          </span>
                        </div>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            contexte.status
                          )}`}
                        >
                          {contexte.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {contexte.title}
                      </h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {contexte.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-2">
                          <i className="fas fa-user"></i>
                          <span>{contexte.author}</span>
                        </div>
                     
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {contexte.lastModified}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingContexte(contexte);
                              setShowEditModal(true);
                            }}
                            className="p-2 text-gray-500 hover:bg-blue-50 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                            title="Modifier"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => {
                              setTestingContexte(contexte);
                              setTestQuery(
                                `Comment fonctionne "${contexte.title}" ?`
                              );
                              setSuggestedQuestions(
                                getSuggestedQuestions(contexte.category)
                              );
                              setShowTestModal(true);
                            }}
                            className="p-2 text-green-800 hover:bg-green-50 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                            title="Tester"
                          >
                            <i className="fas fa-flask"></i>
                          </button>
                          <button
                            onClick={() => {
                              setContexteToDelete(contexte);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                            title="Supprimer"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Add Contexte Modal */}
      {showAddContexteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Ajouter un Nouvel Contexte
                </h2>
                <button
                  onClick={() => setShowAddContexteModal(false)}
                  className="text-gray-500 hover:text-gray-700 !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du contexte
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Entrez le titre du contexte"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <div className="relative">
                    <button
                      id="categoryDropdownBtn"
                      type="button"
                      className="w-full px-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer bg-white text-left flex items-center justify-between"
                      onClick={() => {
                        const dropdown =
                          document.getElementById("categoryDropdown");
                        if (dropdown) {
                          dropdown.classList.toggle("hidden");
                        }
                      }}
                    >
                      <span id="selectedCategory">
                        Sélectionner une catégorie
                      </span>
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </button>
                    <div
                      id="categoryDropdown"
                      className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg hidden"
                    >
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="px-4 py-2 hover:bg-pink-50 cursor-pointer text-gray-700 hover:text-pink-600"
                          onClick={() => {
                            const btnText =
                              document.getElementById("selectedCategory");
                            const dropdown =
                              document.getElementById("categoryDropdown");
                            if (btnText) {
                              btnText.textContent = category.name;
                            }
                            if (dropdown) {
                              dropdown.classList.add("hidden");
                            }
                          }}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenu
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Rédigez le contenu du contexte..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Entrez les tags séparés par des virgules"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddContexteModal(false)}
                    className="px-4 py-2 border border-solid border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Enregistrer comme Brouillon
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-700 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Publier le Contexte
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {showEditModal && editingContexte && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Modifier le Contexte
                </h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingContexte(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du contexte
                  </label>
                  <input
                    type="text"
                    defaultValue={editingContexte.title}
                    className="w-full px-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Entrez le titre du contexte"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <select
                    defaultValue={editingContexte.category}
                    className="w-full px-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    defaultValue={editingContexte.content}
                    className="w-full px-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Rédigez la description du contexte..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    defaultValue={editingContexte.tags.join(", ")}
                    className="w-full px-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Entrez les tags séparés par des virgules"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingContexte(null);
                    }}
                    className="px-4 py-2 border border-solid border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Enregistrer comme Brouillon
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-700 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Publier les Modifications
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && contexteToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-lg">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Confirmer la suppression
                </h2>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setContexteToDelete(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 mb-2">
                  Êtes-vous sûr de vouloir supprimer l'contexte :
                </p>
                <p className="text-lg font-medium text-gray-800">
                  "{contexteToDelete.title}"
                </p>
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                    <p className="text-red-600">
                      Cette action est irréversible. L'contexte sera
                      définitivement supprimé.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setContexteToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    // Here you would typically make an API call to delete the contexte
                    const updatedContextes = contextes.filter(
                      (a) => a.id !== contexteToDelete.id
                    );
                    // Update your contextes state here
                    setShowDeleteModal(false);
                    setContexteToDelete(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Confirmer la suppression
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Test Modal */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Tester les Réponses du Chatbot
                  </h2>
                  {testingContexte && (
                    <p className="mt-1 text-sm text-gray-600">
                      Test du contexte :{" "}
                      <span className="font-medium">
                        {testingContexte.title}
                      </span>
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowTestModal(false);
                    setTestingContexte(null);
                    setTestQuery("");
                    setSuggestedQuestions([]);
                  }}
                  className="text-gray-500 hover:text-gray-700 !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {suggestedQuestions.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Questions suggérées
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setTestQuery(question)}
                          className="px-3 py-1.5 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 text-sm !rounded-button whitespace-nowrap"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question de test
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={testQuery}
                      onChange={(e) => setTestQuery(e.target.value)}
                      className="flex-1 px-4 py-2 border border-solid border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Posez une question au chatbot..."
                    />
                    <button
                      onClick={handleTestQuery}
                      className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      <i className="fas fa-paper-plane mr-2"></i>Tester
                    </button>
                  </div>
                </div>
                {testResponse && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Réponse du Chatbot :
                    </h4>
                    <p className="text-gray-700">{testResponse}</p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        {/* <span className="text-gray-500">
                          Confiance :{" "}
                          <span className="font-medium text-green-600">
                            92%
                          </span>
                        </span> */}
                        <span className="text-gray-500">
                          Temps de réponse :{" "}
                          <span className="font-medium">0.8s</span>
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-thumbs-up mr-1"></i>Bonne réponse
                        </button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-thumbs-down mr-1"></i>À améliorer
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default KnowledgeBase;
