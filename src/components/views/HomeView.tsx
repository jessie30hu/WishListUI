import React from 'react';
import { Wish, CommonWishMatch, SharedExperienceStory, CategoryType } from '../../types';
import { WishCard } from '../common/WishCard';
import { UserCard } from '../common/UserCard';
import { ExperienceCard } from '../common/ExperienceCard';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Heart, Plus, Users } from 'lucide-react';

interface HomeViewProps {
  wishes: Wish[];
  matches: CommonWishMatch[];
  stories: SharedExperienceStory[];
  language: 'zh' | 'en';
  onSelectWish: (wish: Wish) => void;
  onSelectUser: (userId: string) => void;
  onOpenChat: (userId: string) => void;
  onToggleHeart: (wishId: string, e: React.MouseEvent) => void;
  onAddWishCopy: (wish: Wish, e: React.MouseEvent) => void;
  onOpenCreateModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  wishes,
  matches,
  stories,
  language,
  onSelectWish,
  onSelectUser,
  onOpenChat,
  onToggleHeart,
  onAddWishCopy,
  onOpenCreateModal
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryType | 'All'>('All');

  const topMatch = matches[0];

  const filteredWishes = selectedCategory === 'All'
    ? wishes
    : wishes.filter(w => w.category === selectedCategory);

  const categories: (CategoryType | 'All')[] = [
    'All', 'Travel', 'Adventure', 'Food', 'Learning', 'Lifestyle', 'Experience'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '3rem' }}>
      
      {/* 1. Hero Banner */}
      <section
        className="glass-panel glass-card-glow"
        style={{
          padding: '2.5rem 2rem',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.9) 100%)'
        }}
      >
        <div style={{ maxWidth: '650px', position: 'relative', zIndex: 2 }}>
          <span className="badge-aurora" style={{ marginBottom: '1rem' }}>
            <Sparkles size={13} /> {language === 'zh' ? '人生愿望社交系统 V3.0' : 'Semantic Wish Matching Platform'}
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '0.8rem' }} className="text-gradient">
            {language === 'zh' ? '找到和你拥有相似人生愿望的人' : 'Find someone to dream with.'}
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {language === 'zh'
              ? '不看粉丝，不比身价。记录你这一生最想经历的事，找到陪伴你一起出发的同路人。'
              : 'Defined by what you want to experience in your lifetime. Share your bucket list and connect with soulmates.'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={onOpenCreateModal}>
              <Plus size={18} />
              {language === 'zh' ? '记录我的愿望' : 'Post Your Wish'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Featured AI Common Wish Match Banner */}
      {topMatch && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#c084fc" />
              {language === 'zh' ? 'AI 共同愿望匹配' : 'Featured Common Wish Match'}
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {language === 'zh' ? '基于多维语义图谱算法' : 'Powered by Vector Semantic Engine'}
            </span>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: '1.5rem',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(236, 72, 153, 0.12))',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={topMatch.user.avatar}
                  alt={topMatch.user.name}
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #a855f7' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{topMatch.user.name}</h4>
                    {topMatch.user.verifiedBadge && <ShieldCheck size={16} color="#6366f1" />}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {topMatch.user.location} · {topMatch.commonWishesCount} Common Dreams
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="badge-aurora" style={{ fontSize: '0.9rem', padding: '0.4rem 0.9rem' }}>
                  ⚡ {topMatch.score}% Common Wish Match
                </span>
                <button className="btn-primary" onClick={() => onOpenChat(topMatch.user.id)}>
                  {language === 'zh' ? '发起对话' : 'Chat Now'}
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '0.9rem 1.1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #ec4899' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f472b6', marginBottom: '0.2rem' }}>
                🌌 {topMatch.targetWish.title}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                "{topMatch.explanation}"
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. Discover Wishes Grid */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {language === 'zh' ? '愿望灵感广场' : 'Discover Wishes'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {language === 'zh' ? '探索社区精彩人生愿望，点击 "+1 Wish" 快捷加入' : 'Explore bucket lists & click "+1 Wish" to add to your goals'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                style={{
                  background: selectedCategory === cat ? 'var(--gradient-aurora)' : 'rgba(255,255,255,0.06)',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${selectedCategory === cat ? 'transparent' : 'var(--border-color)'}`,
                  borderRadius: '9999px',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
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
              onAddWishCopy={onAddWishCopy}
            />
          ))}
        </div>
      </section>

      {/* 4. People You May Like */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} color="#6366f1" />
              {language === 'zh' ? '愿望契合同路人' : 'People Who Share Your Dreams'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {language === 'zh' ? '优先根据共同愿望数量与契合度推荐' : 'Prioritized by Common Dreams & Lifestyle Alignment'}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {matches.map(m => (
            <UserCard
              key={m.id}
              match={m}
              onSelectUser={onSelectUser}
              onOpenChat={onOpenChat}
            />
          ))}
        </div>
      </section>

      {/* 5. We Did It — Shared Experience Wall */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#34d399' }}>
            {language === 'zh' ? '极光履约墙 (We Did It)' : 'Shared Experience Wall'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {language === 'zh' ? '通过 WishSync 认识并真正在现实中一起完成的愿望故事' : 'Real stories of matched partners who completed wishes together'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {stories.map(s => (
            <ExperienceCard key={s.id} story={s} />
          ))}
        </div>
      </section>

    </div>
  );
};
