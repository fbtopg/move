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
    name: 'Yoga Enthusiasts', 
    members: 120, 
    image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/yoga_group.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAveW9nYV9ncm91cC5qcGciLCJpYXQiOjE3MjgyMDAwMjAsImV4cCI6MTc1OTczNjAyMH0.qcGtNMQVOz_G3I67gm8x--EAKdpR5bGKMD9UxFWZdyc&t=2024-10-06T07%3A33%3A41.601Z', 
    hasActivity: true, 
    lastActivity: '1h ago', 
    memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], 
    description: 'Join us for daily yoga sessions and mindfulness practices.',
    isOwner: false 
  },
  { 
    id: 8, 
    name: 'Foodies United', 
    members: 85, 
    image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/food_group.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZm9vZF9ncm91cC5qcGciLCJpYXQiOjE3MjgyMDAwMjAsImV4cCI6MTc1OTczNjAyMH0.qcGtNMQVOz_G3I67gm8x--EAKdpR5bGKMD9UxFWZdyc&t=2024-10-06T07%3A33%3A41.601Z', 
    hasActivity: true, 
    lastActivity: '3h ago', 
    memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], 
    description: 'Discover new recipes, share food experiences, and connect with fellow food lovers.',
    isOwner: false 
  },
  { 
    id: 9, 
    name: 'Language Exchange', 
    members: 150, 
    image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/language_group.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvbGFuZ3VhZ2VfZ3JvdXAuanBnIiwiaWF0IjoxNzI4MjAwMDIwLCJleHAiOjE3NTk3MzYwMjB9.qcGtNMQVOz_G3I67gm8x--EAKdpR5bGKMD9UxFWZdyc&t=2024-10-06T07%3A33%3A41.601Z', 
    hasActivity: true, 
    lastActivity: '2h ago', 
    memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], 
    description: 'Practice languages with native speakers and make friends from around the world.',
    isOwner: false 
  },
];
