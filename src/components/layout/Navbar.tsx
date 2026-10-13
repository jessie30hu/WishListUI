import React from 'react';
import { Home, Sparkles, Users, MessageSquare, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: 'zh' | 'en';
  unreadMessagesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  language,
  unreadMessagesCount
}) => {
  // Scheme A 5 Golden Tabs for Desktop
  const navItems = [
    { id: 'home', icon: Home, label: language === 'zh' ? '首页' : 'Home' },
    { id: 'wishes', icon: Sparkles, label: language === 'zh' ? '愿望清单' : 'Wishes' },
    { id: 'people', icon: Users, label: language === 'zh' ? '寻同路人' : 'People' },
    { id: 'messages', icon: MessageSquare, label: language === 'zh' ? '消息' : 'Messages', badge: unreadMessagesCount },
    { id: 'profile', icon: UserIcon, label: language === 'zh' ? '我的 Profile' : 'Profile' }
  ];

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)'
      }}
      className="hide-mobile-nav"
    >
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            style={{
              background: isActive ? 'var(--gradient-aurora)' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.55rem 1.25rem',
              fontSize: '0.88rem',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              align-items: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onClick={() => onTabChange(item.id)}
          >
            <Icon size={17} />
            <span>{item.label}</span>

            {item.badge && item.badge > 0 ? (
              <span
                style={{
                  backgroundColor: '#ec4899',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  padding: '0.1rem 0.45rem',
                  lineHeight: 1
                }}
              >
                {item.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
};
