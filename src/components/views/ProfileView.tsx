import React from 'react';
import { User, Wish, Visitor } from '../../types';
import { WishCard } from '../common/WishCard';
import { Sparkles, Heart, CheckCircle2, ShieldCheck, MapPin, Plus, Settings, Eye, Crown } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  wishes: Wish[];
  visitors: Visitor[];
  language: 'zh' | 'en';
  onSelectWish: (wish: Wish) => void;
  onToggleHeart: (wishId: string, e: React.MouseEvent) => void;
  onOpenCreateModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenPremiumModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  wishes,
  visitors,
  language,
  onSelectWish,
  onToggleHeart,
  onOpenCreateModal,
  onOpenSettingsModal,
  onOpenPremiumModal
}) => {
  const [activeFilter, setActiveFilter] = React.useState<'All' | 'Planned' | 'In Progress' | 'Completed'>('All');

  const myWishes = wishes.filter(w => w.userId === user.id);
  const filteredWishes = activeFilter === 'All' ? myWishes : myWishes.filter(w => w.status === activeFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>
      
      {/* Profile Header (Wish > Social Data Visual Priority) */}
      <section
        className="glass-panel glass-card-glow"
        style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <button
          className="btn-secondary"
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', padding: '0.45rem' }}
          onClick={onOpenSettingsModal}
          title="Settings"
        >
          <Settings size={18} />
        </button>

        {/* Avatar */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #a855f7' }}
          />
          {user.verifiedBadge && (
            <div
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                backgroundColor: '#6366f1',
                borderRadius: '50%',
                padding: '4px',
                color: '#fff',
                display: 'flex'
              }}
            >
              <ShieldCheck size={16} />
            </div>
          )}
        </div>

        {/* Name & Bio */}
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.2rem' }}>
          {user.name}
        </h2>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.8rem' }}>
          <MapPin size={13} /> {user.location}
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.5, marginBottom: '1.2rem' }}>
          "{user.bio}"
        </p>

        {/* 方案A 特色入口 B：Profile 顶部访客与动态悬浮卡片 */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(168,85,247,0.15))',
            border: '1px solid rgba(236, 72, 153, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '0.65rem 1.2rem',
            marginBottom: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.85rem'
          }}
          onClick={onOpenPremiumModal}
        >
          <Eye size={16} color="#ec4899" />
          <span style={{ fontWeight: 700, color: '#f472b6' }}>
            {language === 'zh' ? `已有 ${visitors.length} 人看过了你的愿望清单` : `${visitors.length} people viewed your bucket list`}
          </span>
          <span style={{ color: '#fbbf24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <Crown size={14} /> 解锁 🔥
          </span>
        </div>

        {/* Stat Badges: Wish > Social Metrics */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#818cf8' }}>{myWishes.length}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{language === 'zh' ? '人生愿望' : 'Total Wishes'}</div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>{user.completedCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{language === 'zh' ? '已达成愿望' : 'Completed'}</div>
          </div>

          <div style={{ background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ec4899' }}>{user.heartsReceivedCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{language === 'zh' ? '共鸣 Hearts' : 'Hearts Received'}</div>
          </div>
        </div>
      </section>

      {/* My Wishes Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
            {language === 'zh' ? '我的愿望清单' : 'My Wishlist'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {language === 'zh' ? '记录与追踪你想在这一生完成的所有体验' : 'Track and manage your lifetime Bucket List'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['All', 'Planned', 'In Progress', 'Completed'] as const).map(st => (
            <button
              key={st}
              style={{
                background: activeFilter === st ? 'var(--gradient-aurora)' : 'rgba(255,255,255,0.06)',
                color: activeFilter === st ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${activeFilter === st ? 'transparent' : 'var(--border-color)'}`,
                borderRadius: '9999px',
                padding: '0.35rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => setActiveFilter(st)}
            >
              {st}
            </button>
          ))}
          <button className="btn-primary" onClick={onOpenCreateModal}>
            <Plus size={15} />
            <span>{language === 'zh' ? '新建 Wish' : 'New Wish'}</span>
          </button>
        </div>
      </div>

      {/* Wishes Grid */}
      <div className="wish-grid">
        {filteredWishes.map(wish => (
          <WishCard
            key={wish.id}
            wish={wish}
            onSelectWish={onSelectWish}
            onToggleHeart={onToggleHeart}
          />
        ))}
      </div>

    </div>
  );
};
