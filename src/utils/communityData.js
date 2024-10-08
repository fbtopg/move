import { getRandomProfilePicture } from "./profilePictures";

export const myGroups = [
  {
    id: 1,
    name: "Morning chill",
    members: 5,
    image:
      "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMC5qcGciLCJpYXQiOjE3MjgxOTMwOTgsImV4cCI6MTc1OTcyOTA5OH0.TIDMfZ1HBhzfg-7VKPufXLE41_I-Jlsm6WMtyDFPOlk&t=2024-10-06T05%3A38%3A18.966Z",
    hasActivity: true,
    lastActivity: "Just now",
    memberProfiles: [
      getRandomProfilePicture(),
      getRandomProfilePicture(),
      getRandomProfilePicture(),
    ],
    description: "A group for morning activities and relaxation.",
  },
  {
    id: 2,
    name: "Climbing bros",
    members: 8,
    image:
      "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000_01.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMF8wMS5qcGciLCJpYXQiOjE3MjgxOTMwNzYsImV4cCI6MTc1OTcyOTA3Nn0.SnPjAPmZmpKMWm5FPCduJ-eQycFeRmaIgNIazjXSsyE&t=2024-10-06T05%3A37%3A57.333Z",
    hasActivity: true,
    lastActivity: "5m ago",
    memberProfiles: [
      getRandomProfilePicture(),
      getRandomProfilePicture(),
      getRandomProfilePicture(),
    ],
    description: "For climbing enthusiasts and adventurers.",
  },
  {
    id: 3,
    name: "Trip",
    members: 3,
    image:
      "https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/KakaoTalk_20240929_105444000_02.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvS2FrYW9UYWxrXzIwMjQwOTI5XzEwNTQ0NDAwMF8wMi5qcGciLCJpYXQiOjE3MjgxOTMwOTAsImV4cCI6MTc1OTcyOTA5MH0.KrJjSiUbjbCTdk5oyKozzdkrtb2ZpQkLcLcPXdIIBT8&t=2024-10-06T05%3A38%3A11.060Z",
    hasActivity: true,
    lastActivity: "2h ago",
    memberProfiles: [
      getRandomProfilePicture(),
      getRandomProfilePicture(),
      getRandomProfilePicture(),
    ],
    description: "Plan and share your travel experiences.",
  },
];

export const activities = {
  today: [
    {
      name: "Emma",
      activity:
        "finished walking 1km and completed daily walk. • just now",
      type: "walk",
      profilePicture: getRandomProfilePicture(),
    },
    {
      name: "John",
      activity:
        "solved quiz #089 and completed daily quiz. • just now",
      type: "quiz",
      profilePicture: getRandomProfilePicture(),
    },
    {
      name: "Sarah",
      activity:
        "finished walking 1km and completed daily walk. • just now",
      type: "walk",
      profilePicture: getRandomProfilePicture(),
    },
  ],
  thisMonth: [
    {
      name: "Geonu",
      activity:
        "finished walking 1km and completed daily walk. • 2d",
      type: "walk",
      profilePicture: getRandomProfilePicture(),
    },
    {
      name: "Astrid",
      activity:
        "finished walking 1km and completed daily walk. • 5d",
      type: "walk",
      profilePicture: getRandomProfilePicture(),
    },
    {
      name: "Fitra",
      activity:
        "solved quiz #089 and completed daily quiz. • 1w",
      type: "quiz",
      profilePicture: getRandomProfilePicture(),
    },
  ],
  earlier: [
    {
      name: "Rissa",
      activity:
        "solved quiz #089 and completed daily quiz. • 2w",
      type: "quiz",
      profilePicture: getRandomProfilePicture(),
    },
    {
      name: "John",
      activity:
        "finished walking 1km and completed daily walk. • 3w",
      type: "walk",
      profilePicture: getRandomProfilePicture(),
    },
  ],
};

export const recommendedGroups = [
  { 
    id: 7, 
    name: 'Nike+', 
    members: 250, 
    capacity: 1000,
    image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupbanner/2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBiYW5uZXIvMi5wbmciLCJpYXQiOjE3MjgzNTE1OTEsImV4cCI6MTc1OTg4NzU5MX0.mR4QUZ2vLCfZc1eGhQNN6fdYoLrh2Aauk0SCFBH8kbU&t=2024-10-08T01%3A39%3A52.781Z', 
    hasActivity: true, 
    lastActivity: '30m ago', 
    memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], 
    description: 'Connect with fellow Nike enthusiasts and track your fitness journey.',
    isOwner: false 
  },
  { 
    id: 8, 
    name: 'Hoka walkers', 
    members: 180, 
    capacity: 1000,
    image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupbanner/1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBiYW5uZXIvMS5wbmciLCJpYXQiOjE3MjgzNTE1NjQsImV4cCI6MTc1OTg4NzU2NH0.MjRB37cffEKODxIMUeexkh3rJnj8G3sjn_F8OkQ_Xb0&t=2024-10-08T01%3A39%3A24.996Z', 
    hasActivity: true, 
    lastActivity: '1h ago', 
    memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], 
    description: 'Join our community of Hoka enthusiasts for daily walks and running tips.',
    isOwner: false 
  },
  { 
    id: 9, 
    name: 'Traveloka explorers', 
    members: 320, 
    capacity: 1000,
    image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupbanner/3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBiYW5uZXIvMy5wbmciLCJpYXQiOjE3MjgzNTE2MDUsImV4cCI6MTc1OTg4NzYwNX0.CeD3bp-6xsfIqJGseNlJ0G0hCmAF2EFlGmrpnH7s660&t=2024-10-08T01%3A40%3A06.477Z', 
    hasActivity: true, 
    lastActivity: '45m ago', 
    memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], 
    description: 'Discover new destinations and share travel experiences with fellow Traveloka users.',
    isOwner: false 
  },
];