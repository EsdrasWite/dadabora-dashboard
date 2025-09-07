  export type usersType = {
    id: number;
    name: string;
    phone: string;
    created_at: string;
    status: "active" | "inactive" | undefined | any;
    location: string;
  };
 export type messagesType = {
    content: string;
    id: number;
    phone: string;
    sender: string;
    timestamp: string;
    user_id: number;
    user_name: string;
  };



//conversation types
export type ConversationMessage = {
    id: number;
    sender: string;
    text: string;
    time: string;
    // tags?: string[];
};

export type ConversationType = {
    id: number;
    status?: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    duration: string;
    messageCount: number;
    confidenceRate: number;
    user: string;
    phone: string;
    userAvatar: string;
    topic: string;
    lastMessage: string;
    messages: messagesType[];
};

// contexte types
export type contexteType={
  id?: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  category?: string;
  tags?: string[];
  author?: string;
  lastModified?: string;
  status?: string;
  views?: number;
  confidence?: number;
}

