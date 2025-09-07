
  export const dummyUsers = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    phone: `+33 6 12 34 56 ${String(i + 10).padStart(2, "0")}`,
    created_at: `2024-06-${String(i + 1).padStart(2, "0")} 10:00:00`,
  }));

  
  export const conversations = [
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
      userAvatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20french%20woman%20with%20short%20brown%20hair%20wearing%20a%20light%20blue%20blouse%20against%20a%20clean%20white%20background%20modern%20healthcare%20setting&width=40&height=40&seq=user1&orientation=squarish",
      topic: "consultation nutrition diabète",
      lastMessage: "Merci beaucoup pour ces conseils nutritionnels détaillés.",
      messages: [
        {
          id: 1,
          sender: "user",
          text: "Bonjour, j'aimerais des conseils pour mieux gérer mon diabète au quotidien.",
          time: "15/01/2024 12:30",
          // tags: ["diabète", "gestion"],
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
          // tags: ["diabète type 2", "alimentation"],
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
      userAvatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20french%20man%20with%20glasses%20wearing%20a%20white%20shirt%20against%20a%20clean%20white%20background%20modern%20healthcare%20setting&width=40&height=40&seq=user2&orientation=squarish",
      topic: "urgence douleur poitrine",
      lastMessage: "La douleur persiste depuis ce matin...",
      messages: [
        {
          id: 1,
          sender: "user",
          text: "La douleur persiste depuis ce matin...",
          time: "15/01/2024 13:15",
          // tags: ["urgence", "douleur", "poitrine"],
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
      userAvatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20french%20woman%20with%20long%20blonde%20hair%20wearing%20a%20green%20sweater%20against%20a%20clean%20white%20background%20modern%20healthcare%20setting&width=40&height=40&seq=user3&orientation=squarish",
      topic: "tension",
      lastMessage: "Je vais suivre vos recommandations pour la tension.",
      messages: [
        {
          id: 1,
          sender: "user",
          text: "Je vais suivre vos recommandations pour la tension.",
          time: "15/01/2024 11:20",
          // tags: ["consultation", "diabète"],
        },
      ],
    },
    {
      id: 4,
      status: "active",
      startDate: "2025-08-12",
      startTime: "11:45",
      endDate: null,
      endTime: null,
      duration: "15m 30s",
      messageCount: 10,
      confidenceRate: 88,
      user: "Lucas Petit",
      email: "lucas.petit@email.com",
      userAvatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20french%20man%20with%20dark%20hair%20wearing%20a%20navy%20blue%20shirt%20against%20a%20clean%20white%20background%20modern%20healthcare%20setting&width=40&height=40&seq=user4&orientation=squarish",
      topic: "consultation allergie",
      lastMessage: "Je comprends mieux les précautions à prendre maintenant.",
      messages: [],
    },
    {
      id: 5,
      status: "completed",
      startDate: "2025-08-12",
      startTime: "10:30",
      endDate: "2025-08-12",
      endTime: "10:45",
      duration: "15m",
      messageCount: 14,
      confidenceRate: 94,
      user: "Emma Laurent",
      email: "emma.laurent@email.com",
      userAvatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20french%20woman%20with%20auburn%20hair%20wearing%20a%20cream%20colored%20blouse%20against%20a%20clean%20white%20background%20modern%20healthcare%20setting&width=40&height=40&seq=user5&orientation=squarish",
      topic: "suivi grossesse",
      lastMessage: "Merci pour ces informations sur le suivi de grossesse.",
      messages: [],
    },
    {
      id: 6,
      status: "active",
      startDate: "2025-08-12",
      startTime: "09:15",
      endDate: null,
      endTime: null,
      duration: "20m",
      messageCount: 18,
      confidenceRate: 91,
      user: "Thomas Moreau",
      email: "thomas.moreau@email.com",
      userAvatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20french%20man%20with%20salt%20and%20pepper%20hair%20wearing%20a%20gray%20sweater%20against%20a%20clean%20white%20background%20modern%20healthcare%20setting&width=40&height=40&seq=user6&orientation=squarish",
      topic: "consultation cardiologie",
      lastMessage: "Les symptômes persistent depuis une semaine.",
      messages: [],
    },
    {
      id: 7,
      status: "completed",
      startDate: "2025-08-12",
      startTime: "08:00",
      endDate: "2025-08-12",
      endTime: "08:20",
      duration: "20m",
      messageCount: 16,
      confidenceRate: 93,
      user: "Claire Dupont",
      email: "claire.dupont@email.com",
      userAvatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20french%20woman%20with%20black%20hair%20wearing%20a%20purple%20blouse%20against%20a%20clean%20white%20background%20modern%20healthcare%20setting&width=40&height=40&seq=user7&orientation=squarish",
      topic: "consultation dermatologie",
      lastMessage: "Je vais appliquer le traitement comme recommandé.",
      messages: [],
    },
    {
      id: 8,
      status: "active",
      startDate: "2025-08-12",
      startTime: "07:45",
      endDate: null,
      endTime: null,
      duration: "25m",
      messageCount: 20,
      confidenceRate: 87,
      user: "Antoine Roux",
      email: "antoine.roux@email.com",
      userAvatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20french%20man%20with%20blonde%20hair%20wearing%20a%20white%20shirt%20against%20a%20clean%20white%20background%20modern%20healthcare%20setting&width=40&height=40&seq=user8&orientation=squarish",
      topic: "consultation orthopédie",
      lastMessage: "La douleur au genou est plus intense le matin.",
      messages: [],
    },
    {
      id: 9,
      status: "completed",
      startDate: "2025-08-12",
      startTime: "07:00",
      endDate: "2025-08-12",
      endTime: "07:20",
      duration: "20m",
      messageCount: 15,
      confidenceRate: 95,
      user: "Julie Martin",
      email: "julie.martin@email.com",
      userAvatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20french%20woman%20with%20red%20hair%20wearing%20a%20beige%20blouse%20against%20a%20clean%20white%20background%20modern%20healthcare%20setting&width=40&height=40&seq=user9&orientation=squarish",
      topic: "consultation nutrition",
      lastMessage: "Le nouveau régime alimentaire me convient parfaitement.",
      messages: [],
    },
    {
      id: 10,
      status: "active",
      startDate: "2025-08-12",
      startTime: "06:30",
      endDate: null,
      endTime: null,
      duration: "30m",
      messageCount: 22,
      confidenceRate: 90,
      user: "Nicolas Blanc",
      email: "nicolas.blanc@email.com",
      userAvatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20french%20man%20with%20brown%20hair%20wearing%20a%20light%20blue%20shirt%20against%20a%20clean%20white%20background%20modern%20healthcare%20setting&width=40&height=40&seq=user10&orientation=squarish",
      topic: "consultation pneumologie",
      lastMessage: "Les difficultés respiratoires sont plus fréquentes.",
      messages: [],
    },
  ];
  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200";
  };
  const getStatusIcon = (status: string) => {
    return status === "active" ? "fas fa-circle" : "fas fa-check-circle";
  };
  const getConfidenceColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 80) return "text-yellow-600";
    return "text-red-600";
  };