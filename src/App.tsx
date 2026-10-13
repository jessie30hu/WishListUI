import React from 'react';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';

import { HomeView } from './components/views/HomeView';
import { WishesView } from './components/views/WishesView';
import { PeopleView } from './components/views/PeopleView';
import { MessagesView } from './components/views/MessagesView';
import { ProfileView } from './components/views/ProfileView';

import { CreateWishModal } from './components/modals/CreateWishModal';
import { WishDetailModal } from './components/modals/WishDetailModal';
import { OtherProfileModal } from './components/modals/OtherProfileModal';
import { PremiumModal } from './components/modals/PremiumModal';
import { SettingsModal } from './components/modals/SettingsModal';

import { CURRENT_USER, MOCK_USERS, INITIAL_WISHES, MOCK_COMMON_MATCHES, MOCK_CONVERSATIONS, MOCK_VISITORS, MOCK_EXPERIENCE_STORIES } from './data/mockData';
import { Wish, User, Conversation } from './types';

export function App() {
  // Scheme A 5 Golden Tabs: 'home' | 'wishes' | 'people' | 'messages' | 'profile'
  const [activeTab, setActiveTab] = React.useState<string>('home');
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = React.useState<'zh' | 'en'>('zh');

  // App Data State
  const [currentUser, setCurrentUser] = React.useState<User>(CURRENT_USER);
  const [wishes, setWishes] = React.useState<Wish[]>(INITIAL_WISHES);
  const [matches] = React.useState(MOCK_COMMON_MATCHES);
  const [conversations, setConversations] = React.useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = React.useState<string>(MOCK_CONVERSATIONS[0].id);
  const [visitors] = React.useState(MOCK_VISITORS);
  const [stories] = React.useState(MOCK_EXPERIENCE_STORIES);

  // Modals State
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState<boolean>(false);
  const [selectedWishDetail, setSelectedWishDetail] = React.useState<Wish | null>(null);
  const [selectedOtherUser, setSelectedOtherUser] = React.useState<User | null>(null);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = React.useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState<boolean>(false);

  // Set Theme attribute on document root
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handlers
  const handleToggleHeart = (wishId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishes(prev => prev.map(w => {
      if (w.id === wishId) {
        const nextHearted = !w.isHearted;
        return {
          ...w,
          isHearted: nextHearted,
          heartsCount: nextHearted ? w.heartsCount + 1 : w.heartsCount - 1
        };
      }
      return w;
    }));
  };

  const handleAddWishCopy = (wish: Wish, e: React.MouseEvent) => {
    e.stopPropagation();
    const newWish: Wish = {
      ...wish,
      id: `wish_copy_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userLocation: currentUser.location,
      heartsCount: 1,
      isHearted: true,
      status: 'Planned',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setWishes(prev => [newWish, ...prev]);
    alert(language === 'zh' ? `已将“${wish.title}”保存至你的 Wish 愿望清单！` : `Added "${wish.title}" to your bucket list!`);
  };

  const handleCreateWish = (newWishData: Partial<Wish>) => {
    const newWish: Wish = {
      id: `wish_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userLocation: currentUser.location,
      title: newWishData.title || 'My New Life Wish',
      description: newWishData.description || '',
      coverUrl: newWishData.coverUrl || 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
      category: newWishData.category || 'Travel',
      granularity: newWishData.granularity || 'Macro',
      location: newWishData.location,
      targetDate: newWishData.targetDate,
      status: 'Planned',
      privacyLevel: newWishData.privacyLevel || 'Public',
      heartsCount: 1,
      isHearted: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setWishes(prev => [newWish, ...prev]);
    setCurrentUser(prev => ({ ...prev, wishesCount: prev.wishesCount + 1 }));
  };

  const handleOpenChatWithUser = (userId: string) => {
    const targetUser = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];
    let existingConv = conversations.find(c => c.partner.id === userId);

    if (!existingConv) {
      existingConv = {
        id: `conv_${Date.now()}`,
        partner: targetUser,
        lastMessage: 'Connected via Common Wish Match',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg_init_${Date.now()}`,
            senderId: userId,
            text: `Hi ${currentUser.name}! I noticed we match on Common Dreams. 🌌`,
            timestamp: 'Just now'
          }
        ]
      };
      setConversations(prev => [existingConv!, ...prev]);
    }

    setActiveConvId(existingConv.id);
    setActiveTab('messages');
  };

  const handleSendMessage = (convId: string, text: string, wishCard?: Wish) => {
    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        const newMsg = {
          id: `msg_${Date.now()}`,
          senderId: currentUser.id,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sharedWishCard: wishCard
        };
        return {
          ...c,
          lastMessage: text,
          lastMessageTime: 'Just now',
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
  };

  const handleSelectUser = (userId: string) => {
    const targetUser = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];
    setSelectedOtherUser(targetUser);
  };

  const handleUpgradePremium = () => {
    setCurrentUser(prev => ({ ...prev, isPremium: true }));
    alert(language === 'zh' ? '祝贺！成功升级 WishSync Premium 会员！' : 'Congratulations! Upgraded to WishSync Premium!');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <Header
        user={currentUser}
        activeTab={activeTab}
        theme={theme}
        language={language}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        onToggleLanguage={() => setLanguage(l => l === 'zh' ? 'en' : 'zh')}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
      />

      {/* Desktop Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
        unreadMessagesCount={1}
      />

      {/* Main View Area */}
      <main style={{ flexGrow: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {activeTab === 'home' && (
          <HomeView
            wishes={wishes}
            matches={matches}
            stories={stories}
            language={language}
            onSelectWish={w => setSelectedWishDetail(w)}
            onSelectUser={handleSelectUser}
            onOpenChat={handleOpenChatWithUser}
            onToggleHeart={handleToggleHeart}
            onAddWishCopy={handleAddWishCopy}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        )}

        {activeTab === 'wishes' && (
          <WishesView
            wishes={wishes}
            language={language}
            onSelectWish={w => setSelectedWishDetail(w)}
            onToggleHeart={handleToggleHeart}
            onAddWishCopy={handleAddWishCopy}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        )}

        {activeTab === 'people' && (
          <PeopleView
            matches={matches}
            language={language}
            onSelectUser={handleSelectUser}
            onOpenChat={handleOpenChatWithUser}
          />
        )}

        {activeTab === 'messages' && (
          <MessagesView
            conversations={conversations}
            activeConversationId={activeConvId}
            myWishes={wishes.filter(w => w.userId === currentUser.id)}
            currentUser={currentUser}
            visitors={visitors}
            language={language}
            onSelectConversation={setActiveConvId}
            onSendMessage={handleSendMessage}
            onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            user={currentUser}
            wishes={wishes}
            visitors={visitors}
            language={language}
            onSelectWish={w => setSelectedWishDetail(w)}
            onToggleHeart={handleToggleHeart}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
            onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation (Scheme A 5 Tabs) */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadMessagesCount={1}
      />

      {/* All Application Modals */}
      <CreateWishModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateWish={handleCreateWish}
        language={language}
      />

      <WishDetailModal
        wish={selectedWishDetail}
        isOpen={Boolean(selectedWishDetail)}
        onClose={() => setSelectedWishDetail(null)}
        onToggleHeart={handleToggleHeart}
        onOpenChat={userId => {
          setSelectedWishDetail(null);
          handleOpenChatWithUser(userId);
        }}
        language={language}
      />

      <OtherProfileModal
        user={selectedOtherUser}
        isOpen={Boolean(selectedOtherUser)}
        onClose={() => setSelectedOtherUser(null)}
        onOpenChat={userId => {
          setSelectedOtherUser(null);
          handleOpenChatWithUser(userId);
        }}
        language={language}
      />

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        onUpgrade={handleUpgradePremium}
        language={language}
      />

      <SettingsModal
        user={currentUser}
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        theme={theme}
        language={language}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        onToggleLanguage={() => setLanguage(l => l === 'zh' ? 'en' : 'zh')}
      />

    </div>
  );
}
