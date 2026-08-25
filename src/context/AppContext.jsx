import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const INITIAL_USER = {
  name: "Athi Raj",
  username: "athiraj.kp",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  bio: "Frontend Developer & AI enthusiast 🚀 | Building Vibespace",
  followersCount: 16,
  followers: [
    { name: "Priyanka", handle: "priyanka.s_p_", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    { name: "Luna", handle: "lunaxtrader", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" }
  ],
  interests: ["Tech", "AI", "Frontend", "React"],
  onboarding: {
    followedTen: false,
    addedPhoto: true,
    addedBio: true
  }
};

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    author: {
      name: "Boleh Bromy",
      username: "bolehbromy",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      verified: false
    },
    timeAgo: "6h",
    content: "Bro disappeared like it never existed, why such thing terjadi ⚙️ meta.ai",
    media: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    likes: 12,
    repliesCount: 3,
    reposts: 0,
    shares: 1,
    isLiked: false,
    isSaved: false,
    community: "AI Vibes"
  },
  {
    id: 'post-2',
    author: {
      name: "Tech Reader",
      username: "techrader71",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      verified: true
    },
    timeAgo: "5h",
    content: "POV: Travel days feel different when your little buddy gets a front-row seat 🐱🎒 More fresh air, more curious views, less fuss along the way 🛒 Product Link: amzn.to/3Sa54... #ad 🔗",
    media: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    likes: 11,
    repliesCount: 5,
    reposts: 2,
    shares: 4,
    isLiked: false,
    isSaved: false
  },
  {
    id: 'post-3',
    author: {
      name: "Eli Tech",
      username: "eli.tech9",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      verified: false
    },
    timeAgo: "6h",
    content: "Solo founders! What have you been building lately?",
    likes: 26,
    repliesCount: 51,
    reposts: 3,
    shares: 12,
    isLiked: false,
    isSaved: false,
    community: "Tech Vibes"
  },
  {
    id: 'post-4',
    author: {
      name: "Classy Queen",
      username: "its_classy_queen_43",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150",
      verified: false
    },
    timeAgo: "7h",
    statusNote: "16h left",
    content: "அலட்சியமாக பார்த்தவர்கள் எல்லாம் ஆச்சரியமாக பார்க்கும் நாள் வரும்..!!🔥📈",
    likes: 60,
    repliesCount: 6,
    reposts: 2,
    shares: 2,
    isLiked: true,
    isSaved: false
  },
  {
    id: 'post-ad-1',
    isAd: true,
    author: {
      name: "adobeacrobat",
      username: "adobeacrobat",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150",
      verified: true
    },
    timeAgo: "Ad",
    content: "Bring all your project files into one workspace and ask AI Assistant questions to get deep insights with precise citations.",
    media: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    bannerTitle: "Level up your workflow with AI Assistant.",
    likes: 1420,
    repliesCount: 88,
    reposts: 230,
    shares: 1140,
    isLiked: false,
    isSaved: false
  },
  {
    id: 'post-5',
    author: {
      name: "Ashwa",
      username: "im.ashwaaa",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      verified: false
    },
    timeAgo: "7h",
    content: "Just started to learn C. And I'm in love with the process already... 📑💖 Can I expect some c programmers to drop their opinions and tips here?😉😁 Also I would love to connect with Ppl who are in the process of learning C.❤️🤝",
    media: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    likes: 11,
    repliesCount: 5,
    reposts: 0,
    shares: 2,
    isLiked: false,
    isSaved: false,
    community: "Tech Vibes"
  },
  {
    id: 'post-6',
    author: {
      name: "The AI Prime",
      username: "theaiprime",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      verified: true
    },
    timeAgo: "5d",
    content: "Vibe coding starts with: \"Bro, I'm basically a developer now.\"\n\nEnds with: \"Why did changing the button color break the entire app?\"\n\nAI: \"Here's a fix.\"\n\nBe honest—what's your personal vibe-coding breaking point? 😂",
    media: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    likes: 44900,
    repliesCount: 356,
    reposts: 492,
    shares: 1100,
    isLiked: true,
    isSaved: true,
    community: "AI Vibes"
  }
];

export const INITIAL_USER_REPLIES = [
  {
    id: 'reply-1',
    parentPost: {
      id: 'parent-1',
      author: { username: 'lunaxtrader', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
      content: "Any trader's from Chennai. Dm us let's connect and travel together 🖤🔥",
      date: '10/15/24'
    },
    userReply: {
      id: 'ur-1',
      author: { username: 'athiraj.kp', avatar: INITIAL_USER.avatar },
      content: "Im also trader",
      date: '3/15/25',
      likes: 0
    }
  },
  {
    id: 'reply-2',
    parentPost: {
      id: 'parent-2',
      author: { username: 'sanj.ithprakash', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
      content: "I need trader friends",
      date: '3/14/25'
    },
    userReply: {
      id: 'ur-2',
      author: { username: 'athiraj.kp', avatar: INITIAL_USER.avatar },
      content: "Indian market or forex??",
      date: '3/15/25',
      likes: 2
    }
  }
];

export const COMMUNITIES = [
  { id: 'ai', name: 'AI Vibes', icon: '🤖', count: '14.2k' },
  { id: 'tech', name: 'Tech Vibes', icon: '💻', count: '48.9k' },
  { id: 'business', name: 'Business Vibes', icon: '💼', count: '29.1k' },
  { id: 'author', name: 'Author Vibes', icon: '🖨️', count: '8.4k' },
  { id: 'book', name: 'Book Vibes', icon: '📘', count: '19.6k' },
];

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'messages', 'activity', 'profile', 'saved', 'liked', 'settings', 'community'
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  
  const [user, setUser] = useState(INITIAL_USER);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [userReplies, setUserReplies] = useState(INITIAL_USER_REPLIES);
  
  // Kuyil Flying Animation State
  const [flyKey, setFlyKey] = useState(0);
  const [isFlying, setIsFlying] = useState(true);

  const triggerKuyilFlight = () => {
    setFlyKey(prev => prev + 1);
    setIsFlying(true);
  };

  // UI Overlays
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isListenRoomOpen, setIsListenRoomOpen] = useState(false);
  
  // Voice Spaces State
  const [activeVoiceRoom, setActiveVoiceRoom] = useState(null);
  const [isVoiceRoomMinimized, setIsVoiceRoomMinimized] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  
  // Direct Messages state
  const [conversations, setConversations] = useState([
    { id: 'c1', user: { name: "Priyanka S", username: "priyanka.s_p_", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" }, lastMessage: "Hey! How is Vibespace coming along?", time: "12h" },
    { id: 'c2', user: { name: "Luna Trader", username: "lunaxtrader", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" }, lastMessage: "Let's connect on crypto vibes!", time: "1d" }
  ]);
  const [activeChat, setActiveChat] = useState(null);

  // Follow states
  const [followedUsers, setFollowedUsers] = useState(['priyanka.s_p_']);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const toggleLike = (postId) => {
    setPosts(prevPosts => prevPosts.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  const toggleSave = (postId) => {
    setPosts(prevPosts => prevPosts.map(p => {
      if (p.id === postId) {
        return { ...p, isSaved: !p.isSaved };
      }
      return p;
    }));
  };

  const addPost = (newPostData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        verified: true
      },
      timeAgo: "Just now",
      content: newPostData.content,
      media: newPostData.media || null,
      videoUrl: newPostData.videoUrl || null,
      listenMusic: newPostData.listenMusic || null,
      voiceSpace: newPostData.voiceSpace || null,
      postType: newPostData.postType || 'text',
      likes: 0,
      repliesCount: 0,
      reposts: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      community: newPostData.community || null
    };

    setPosts([newPost, ...posts]);
  };

  const [selectedUserProfile, setSelectedUserProfile] = useState(null);

  const viewUserProfile = (userObj) => {
    if (!userObj) {
      setSelectedUserProfile(null);
      setActiveTab('profile');
      return;
    }
    const fullUser = {
      name: userObj.name || userObj.username,
      username: userObj.username,
      avatar: userObj.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      bio: userObj.bio || `Welcome to @${userObj.username}'s profile on Kuyil!`,
      followersCount: userObj.followersCount || (userObj.username === 'techrader71' ? 48900 : 1240),
      followers: userObj.followers || [
        { name: "Athi Raj", handle: "athiraj.kp", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" }
      ],
      interests: userObj.interests || ["Music", "Tech", "Vibes"]
    };
    setSelectedUserProfile(fullUser);
    setSelectedCommunity(null);
    setActiveTab('profile');
  };

  const toggleFollow = (handle) => {
    setFollowedUsers(prev => 
      prev.includes(handle) ? prev.filter(h => h !== handle) : [...prev, handle]
    );
  };

  const deletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
  };

  return (
    <AppContext.Provider value={{
      flyKey,
      isFlying,
      setIsFlying,
      triggerKuyilFlight,
      theme,
      toggleTheme,
      activeTab,
      setActiveTab,
      selectedCommunity,
      setSelectedCommunity,
      selectedUserProfile,
      setSelectedUserProfile,
      viewUserProfile,
      user,
      setUser,
      posts,
      userReplies,
      conversations,
      activeChat,
      setActiveChat,
      followedUsers,
      toggleFollow,
      isDrawerOpen,
      setIsDrawerOpen,
      isComposeOpen,
      setIsComposeOpen,
      isEditProfileOpen,
      setIsEditProfileOpen,
      isListenRoomOpen,
      setIsListenRoomOpen,
      activeVoiceRoom,
      setActiveVoiceRoom,
      isVoiceRoomMinimized,
      setIsVoiceRoomMinimized,
      isMicOn,
      setIsMicOn,
      isHandRaised,
      setIsHandRaised,
      toggleLike,
      toggleSave,
      addPost,
      deletePost
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
