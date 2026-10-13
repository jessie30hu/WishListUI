export type CategoryType = 
  | 'Travel'
  | 'Adventure'
  | 'Food'
  | 'Learning'
  | 'Career'
  | 'Experience'
  | 'Personal Growth'
  | 'Lifestyle'
  | 'Relationship'
  | 'Others';

export type GranularityType = 'Micro' | 'Macro';
export type WishStatus = 'Planned' | 'In Progress' | 'Completed';
export type PrivacyLevel = 'Public' | 'MatchOnly' | 'Private';

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  verifiedBadge: boolean;
  heartsReceivedCount: number;
  wishesCount: number;
  completedCount: number;
  isPremium: boolean;
  createdAt: string;
}

export interface Wish {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userLocation: string;
  title: string;
  description: string;
  coverUrl: string;
  category: CategoryType;
  granularity: GranularityType;
  location?: string;
  targetDate?: string;
  status: WishStatus;
  privacyLevel: PrivacyLevel;
  heartsCount: number;
  isHearted?: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface CommonWishMatch {
  id: string;
  user: User;
  targetWish: Wish;
  myWish: Wish;
  score: number; // 0-100
  explanation: string;
  commonWishesCount: number;
  matchedWishTitles: string[];
}

export interface SharedWishCheckitem {
  id: string;
  text: string;
  done: boolean;
}

export interface SharedWish {
  id: string;
  wishA: Wish;
  userA: User;
  userB: User;
  intentTag: 'LookingForPartner' | 'SeekingAdvice' | 'LocalMeetup' | 'SoloShare';
  status: 'Invited' | 'Accepted' | 'Planning' | 'In Progress' | 'Completed';
  targetDate?: string;
  checklist: SharedWishCheckitem[];
  photos: string[];
  story?: string;
  completedAt?: string;
}

export interface Visitor {
  id: string;
  visitor: User;
  visitCount: number;
  isRepeated: boolean;
  lastVisitedAt: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  sharedWishCard?: Wish;
  sharedWishInvite?: SharedWish;
}

export interface Conversation {
  id: string;
  partner: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: MessageItem[];
}

export interface SharedExperienceStory {
  id: string;
  userA: User;
  userB: User;
  wishTitle: string;
  coverUrl: string;
  location: string;
  completedDate: string;
  storyText: string;
  likesCount: number;
}
