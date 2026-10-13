import React from 'react';
import { Wish, CategoryType, WishStatus, GranularityType } from '../../types';
import { WishCard } from '../common/WishCard';
import { Search, Plus, Sparkles, Filter, CheckCircle2, Clock } from 'lucide-react';

interface WishesViewProps {
  wishes: Wish[];
  language: 'zh' | 'en';
  onSelectWish: (wish: Wish) => void;
  onToggleHeart: (wishId: string, e: React.MouseEvent) => void;
  onAddWishCopy: (wish: Wish, e: React.MouseEvent) => void;
  onOpenCreateModal: () => void;
}

export const WishesView: React.FC<WishesViewProps> = ({
  wishes,
  language,
  onSelectWish,
  onToggleHeart,
  onAddWishCopy,
  onOpenCreateModal
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryType | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = React.useState<WishStatus | 'All'>('All');
  const [selectedGranularity, setSelectedGranularity] = React.useState<GranularityType | 'All'>('All');
  const [activeTab, setActiveTab] = React.useState<'all' | 'my'>('all');

  const categories: (CategoryType | 'All')[] = [
    'All', 'Travel', 'Adventure', 'Food', 'Learning', 'Career', 'Experience', 'Personal Growth', 'Lifestyle', 'Relationship'
  ];

  const filteredWishes = wishes.filter(w => {
    // Tab filter
    if (activeTab === 'my' && w.userId !== 'user_me') return false;

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = w.title.toLowerCase().includes(q);
      const matchDesc = w.description.toLowerCase().includes(q);
      const matchLoc = w.location?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchLoc) return false;
    }

    // Category filter
    if (selectedCategory !== 'All' && w.category !== selectedCategory) return false;

    // Status filter
    if (selectedStatus !== 'All' && w.status !== selectedStatus) return false;

    // Granularity filter
    if (selectedGranularity !== 'All' && w.granularity !== selectedGranularity) return false;

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', paddingBottom: '3rem' }}>
      
      {/* Header & Primary Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
            {language === 'zh' ? '愿望探索与管理' : 'Bucket List & Wish Hub'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {language === 'zh' ? '管理你的愿望，或从社区中发现人生灵感' : 'Organize your dreams & explore global community wishes'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '9999px', padding: '0.25rem', display: 'flex', border: '1px solid var(--border-color)' }}>
            <button
              style={{
                background: activeTab === 'all' ? 'var(--gradient-aurora)' : 'transparent',
                color: activeTab === 'all' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.4rem 1rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('all')}
            >
              {language === 'zh' ? '全部灵感广场' : 'Explore All'}
            </button>
            <button
              style={{
                background: activeTab === 'my' ? 'var(--gradient-aurora)' : 'transparent',
                color: activeTab === 'my' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.4rem 1rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('my')}
            >
              {language === 'zh' ? '我的愿望清单' : 'My Wishes'}
            </button>
          </div>

          <button className="btn-primary" onClick={onOpenCreateModal}>
            <Plus size={16} />
            <span>{language === 'zh' ? '新建 Wish' : 'New Wish'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Secondary Filter Toolbar */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder={language === 'zh' ? '搜索愿望标题、地点、描述关键词...' : 'Search wishes by title, location, keywords...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)',
              padding: '0.65rem 1rem 0.65rem 2.6rem',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Filter Controls Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
          {/* Status filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
            <Filter size={14} color="#a855f7" />
            <span style={{ color: 'var(--text-muted)' }}>Status:</span>
            {(['All', 'Planned', 'In Progress', 'Completed'] as const).map(st => (
              <button
                key={st}
                style={{
                  background: selectedStatus === st ? 'rgba(168, 85, 247, 0.25)' : 'transparent',
                  color: selectedStatus === st ? '#c084fc' : 'var(--text-secondary)',
                  border: `1px solid ${selectedStatus === st ? 'rgba(168, 85, 247, 0.4)' : 'transparent'}`,
                  borderRadius: '6px',
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedStatus(st)}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Granularity filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Scope:</span>
            {(['All', 'Macro', 'Micro'] as const).map(gr => (
              <button
                key={gr}
                style={{
                  background: selectedGranularity === gr ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                  color: selectedGranularity === gr ? '#818cf8' : 'var(--text-secondary)',
                  border: `1px solid ${selectedGranularity === gr ? 'rgba(99, 102, 241, 0.4)' : 'transparent'}`,
                  borderRadius: '6px',
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedGranularity(gr)}
              >
                {gr === 'Macro' ? '🌌 Lifetime' : gr === 'Micro' ? '⚡ Micro' : 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingTop: '0.2rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              style={{
                background: selectedCategory === cat ? 'var(--gradient-aurora)' : 'rgba(255,255,255,0.06)',
                color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${selectedCategory === cat ? 'transparent' : 'var(--border-color)'}`,
                borderRadius: '9999px',
                padding: '0.3rem 0.8rem',
                fontSize: '0.78rem',
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

      {/* Wishes Result Grid */}
      {filteredWishes.length > 0 ? (
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
      ) : (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <Sparkles size={40} color="#a855f7" style={{ marginBottom: '1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {language === 'zh' ? '没有找到匹配的愿望' : 'No matching wishes found'}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {language === 'zh' ? '尝试调整筛选条件，或者直接创建一个全新的 Wish！' : 'Try adjusting your filters or create a brand new wish!'}
          </p>
          <button className="btn-primary" onClick={onOpenCreateModal}>
            <Plus size={16} />
            <span>{language === 'zh' ? '立即创建愿望' : 'Create New Wish'}</span>
          </button>
        </div>
      )}

    </div>
  );
};
