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
    image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupbanner/Frame%20427319183.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBiYW5uZXIvRnJhbWUgNDI3MzE5MTgzLnBuZyIsImlhdCI6MTcyODM1MDk2NSwiZXhwIjoxNzU5ODg2OTY1fQ.imrwDeU291zfEooKqgJPplZQoSnhlW_doW0bkcIbztE&t=2024-10-08T01%3A29%3A26.093Z', 
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
    image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupbanner/Frame%20427319184.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBiYW5uZXIvRnJhbWUgNDI3MzE5MTg0LnBuZyIsImlhdCI6MTcyODM1MDk3MiwiZXhwIjoxNzU5ODg2OTcyfQ.1eocN8qPCXLJ-c8dS4AVnIrkxYaBaVA97wLJmHSiaHo&t=2024-10-08T01%3A29%3A33.850Z', 
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
    image: 'https://hviyoqsvhpvddaafusuc.supabase.co/storage/v1/object/sign/images/group/groupbanner/Frame%20427319185.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ3JvdXAvZ3JvdXBiYW5uZXIvRnJhbWUgNDI3MzE5MTg1LnBuZyIsImlhdCI6MTcyODM1MDk4MCwiZXhwIjoxNzU5ODg2OTgwfQ.cbkx3wDaUMWj_sEaAX-OVdJf3hK-6LOgyp5HQ0sTZg0&t=2024-10-08T01%3A29%3A41.320Z', 
    hasActivity: true, 
    lastActivity: '2h ago', 
    memberProfiles: [getRandomProfilePicture(), getRandomProfilePicture(), getRandomProfilePicture()], 
    description: 'Practice languages with native speakers and make friends from around the world.',
    isOwner: false 
  },
];
