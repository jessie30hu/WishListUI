import { User, Wish, CommonWishMatch, Conversation, Visitor, SharedExperienceStory } from '../types';

export const CURRENT_USER: User = {
  id: 'user_me',
  name: 'Leo Zhang',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Seeking life adventures, aurora nights, and building soul-aligned ideas. 🌌✈️',
  location: 'Shanghai / Remote',
  verifiedBadge: true,
  heartsReceivedCount: 142,
  wishesCount: 8,
  completedCount: 3,
  isPremium: false,
  createdAt: '2026-01-15'
};

export const MOCK_USERS: User[] = [
  {
    id: 'user_1',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: 'Photographer & stargazing enthusiast. Chasing polar lights & mountain peaks. 📸⛰️',
    location: 'Reykjavik / Berlin',
    verifiedBadge: true,
    heartsReceivedCount: 389,
    wishesCount: 12,
    completedCount: 5,
    isPremium: true,
    createdAt: '2026-02-01'
  },
  {
    id: 'user_2',
    name: 'Kenji Sato',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Culinary explorer & coffee roaster. Dreaming of Japan omakase tours & Kyoto autumn.',
    location: 'Tokyo, Japan',
    verifiedBadge: true,
    heartsReceivedCount: 215,
    wishesCount: 9,
    completedCount: 4,
    isPremium: false,
    createdAt: '2026-02-10'
  },
  {
    id: 'user_3',
    name: 'Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    bio: 'Digital nomad & yoga instructor. Roadtripping through New Zealand in a van.',
    location: 'Auckland / Remote',
    verifiedBadge: true,
    heartsReceivedCount: 450,
    wishesCount: 15,
    completedCount: 7,
    isPremium: true,
    createdAt: '2026-01-20'
  },
  {
    id: 'user_4',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Tech founder & skydiving instructor. Living abroad and building AI tools.',
    location: 'San Francisco, CA',
    verifiedBadge: false,
    heartsReceivedCount: 98,
    wishesCount: 6,
    completedCount: 2,
    isPremium: false,
    createdAt: '2026-03-01'
  }
];

export const INITIAL_WISHES: Wish[] = [
  {
    id: 'wish_1',
    userId: 'user_me',
    userName: 'Leo Zhang',
    userAvatar: CURRENT_USER.avatar,
    userLocation: 'Shanghai',
    title: 'See the Northern Lights in Iceland',
    description: 'Sleep under a glass dome igloo in Reykjavik and watch aurora borealis light up the Arctic sky.',
    coverUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
    category: 'Travel',
    granularity: 'Macro',
    location: 'Iceland',
    targetDate: '2027-02-15',
    status: 'Planned',
    privacyLevel: 'Public',
    heartsCount: 84,
    isHearted: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'wish_2',
    userId: 'user_me',
    userName: 'Leo Zhang',
    userAvatar: CURRENT_USER.avatar,
    userLocation: 'Shanghai',
    title: 'Road trip across New Zealand South Island',
    description: 'Rent a campervan, drive past Lake Tekapo, Mount Cook, and camp under the Milky Way.',
    coverUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80',
    category: 'Adventure',
    granularity: 'Macro',
    location: 'New Zealand',
    targetDate: '2026-11-20',
    status: 'In Progress',
    privacyLevel: 'Public',
    heartsCount: 62,
    isHearted: false,
    createdAt: '2026-02-15'
  },
  {
    id: 'wish_3',
    userId: 'user_1',
    userName: 'Elena Rostova',
    userAvatar: MOCK_USERS[0].avatar,
    userLocation: 'Reykjavik',
    title: 'Photograph Northern Lights from Kirkjufell',
    description: 'Capture long-exposure aurora photos behind the Iconic Church Mountain waterfall.',
    coverUrl: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=80',
    category: 'Travel',
    granularity: 'Macro',
    location: 'Kirkjufell, Iceland',
    targetDate: '2027-01-10',
    status: 'Planned',
    privacyLevel: 'Public',
    heartsCount: 120,
    isHearted: true,
    createdAt: '2026-02-12'
  },
  {
    id: 'wish_4',
    userId: 'user_2',
    userName: 'Kenji Sato',
    userAvatar: MOCK_USERS[1].avatar,
    userLocation: 'Tokyo',
    title: 'Try 3-Star Michelin Omakase in Tokyo',
    description: 'Experience authentic edomae sushi crafted by master chefs during cherry blossom week.',
    coverUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    category: 'Food',
    granularity: 'Micro',
    location: 'Ginza, Tokyo',
    targetDate: '2027-04-05',
    status: 'Planned',
    privacyLevel: 'Public',
    heartsCount: 45,
    isHearted: false,
    createdAt: '2026-02-18'
  },
  {
    id: 'wish_5',
    userId: 'user_3',
    userName: 'Sophia Chen',
    userAvatar: MOCK_USERS[2].avatar,
    userLocation: 'Auckland',
    title: 'Live abroad in a van for 6 months',
    description: 'Work remotely while waking up by pristine alpine lakes and coastal cliffs.',
    coverUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    category: 'Lifestyle',
    granularity: 'Macro',
    location: 'Global',
    targetDate: '2026-09-01',
    status: 'In Progress',
    privacyLevel: 'Public',
    heartsCount: 156,
    isHearted: true,
    createdAt: '2026-01-25'
  },
  {
    id: 'wish_6',
    userId: 'user_me',
    userName: 'Leo Zhang',
    userAvatar: CURRENT_USER.avatar,
    userLocation: 'Shanghai',
    title: 'Get PADI Open Water Diving Certification',
    description: 'Learn deep sea diving and explore coral reefs in the Red Sea or Coral Triangle.',
    coverUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    category: 'Adventure',
    granularity: 'Micro',
    location: 'Raja Ampat',
    targetDate: '2026-07-15',
    status: 'Completed',
    privacyLevel: 'Public',
    heartsCount: 78,
    isHearted: true,
    completedAt: '2026-06-30',
    createdAt: '2026-01-05'
  }
];

export const MOCK_COMMON_MATCHES: CommonWishMatch[] = [
  {
    id: 'match_1',
    user: MOCK_USERS[0],
    targetWish: INITIAL_WISHES[2],
    myWish: INITIAL_WISHES[0],
    score: 96,
    explanation: 'You both dream of witnessing the Northern Lights and capturing aurora skies in Iceland.',
    commonWishesCount: 4,
    matchedWishTitles: [
      'See the Northern Lights in Iceland',
      'Road trip across New Zealand',
      'Sleep under the stars',
      'Learn another language'
    ]
  },
  {
    id: 'match_2',
    user: MOCK_USERS[2],
    targetWish: INITIAL_WISHES[4],
    myWish: INITIAL_WISHES[1],
    score: 91,
    explanation: 'You both share a passion for campervan road trips, alpine lakes, and nomadic freedom.',
    commonWishesCount: 5,
    matchedWishTitles: [
      'Road trip campervan NZ',
      'Live abroad for 6+ months',
      'PADI Diving certification',
      'Learn Spanish',
      'Stargazing camp'
    ]
  },
  {
    id: 'match_3',
    user: MOCK_USERS[1],
    targetWish: INITIAL_WISHES[3],
    myWish: INITIAL_WISHES[0],
    score: 84,
    explanation: 'You both dream of travelling to Japan during cherry blossom season and exploring Tokyo.',
    commonWishesCount: 3,
    matchedWishTitles: [
      'Visit Japan in spring',
      'Omakase culinary journey',
      'Mount Fuji hiking'
    ]
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    partner: MOCK_USERS[0],
    lastMessage: "I'd love to partner up for the Iceland trip! Have you checked Feb flights?",
    lastMessageTime: '10:42 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'msg_1',
        senderId: 'user_1',
        text: 'Hi Leo! I saw your wish about the Northern Lights in Iceland. 🌌',
        timestamp: '10:30 AM'
      },
      {
        id: 'msg_2',
        senderId: 'user_me',
        text: 'Hey Elena! Yes! Kirkjufell has been on my bucket list for 3 years.',
        timestamp: '10:35 AM'
      },
      {
        id: 'msg_3',
        senderId: 'user_1',
        text: 'Same here! I live nearby in Reykjavik part of the year. Let us do it together!',
        timestamp: '10:40 AM',
        sharedWishCard: INITIAL_WISHES[0]
      },
      {
        id: 'msg_4',
        senderId: 'user_1',
        text: "I'd love to partner up for the Iceland trip! Have you checked Feb flights?",
        timestamp: '10:42 AM'
      }
    ]
  },
  {
    id: 'conv_2',
    partner: MOCK_USERS[2],
    lastMessage: 'The van life in NZ is surreal! Sending you my favorite campsite spot.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'msg_201',
        senderId: 'user_3',
        text: 'The van life in NZ is surreal! Sending you my favorite campsite spot.',
        timestamp: 'Yesterday'
      }
    ]
  }
];

export const MOCK_VISITORS: Visitor[] = [
  {
    id: 'vis_1',
    visitor: MOCK_USERS[0],
    visitCount: 5,
    isRepeated: true,
    lastVisitedAt: '2 hours ago'
  },
  {
    id: 'vis_2',
    visitor: MOCK_USERS[2],
    visitCount: 3,
    isRepeated: true,
    lastVisitedAt: '4 hours ago'
  },
  {
    id: 'vis_3',
    visitor: MOCK_USERS[1],
    visitCount: 1,
    isRepeated: false,
    lastVisitedAt: '1 day ago'
  },
  {
    id: 'vis_4',
    visitor: MOCK_USERS[3],
    visitCount: 1,
    isRepeated: false,
    lastVisitedAt: '2 days ago'
  }
];

export const MOCK_EXPERIENCE_STORIES: SharedExperienceStory[] = [
  {
    id: 'story_1',
    userA: MOCK_USERS[0],
    userB: CURRENT_USER,
    wishTitle: 'Witness Northern Lights at Kirkjufell',
    coverUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
    location: 'Grundarfjörður, Iceland',
    completedDate: 'Feb 2026',
    storyText: 'We met on WishSync after matching 96% on our Northern Lights wish. Spent 5 freezing nights waiting under the Arctic sky, and on the last night the green aurora burst across the entire sky!',
    likesCount: 342
  },
  {
    id: 'story_2',
    userA: MOCK_USERS[2],
    userB: MOCK_USERS[3],
    wishTitle: 'Campervan Road Trip through NZ South Island',
    coverUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    location: 'Mount Cook, New Zealand',
    completedDate: 'Jan 2026',
    storyText: 'Drove 2,400 km across glaciers, lupin fields, and fjords. From strangers sharing a bucket list to lifelong travel partners.',
    likesCount: 519
  }
];
