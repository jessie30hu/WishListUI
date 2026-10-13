import React from 'react';
import { CategoryType, GranularityType, PrivacyLevel, Wish } from '../../types';
import { X, Sparkles, Image, MapPin, Calendar, Lock, Globe, Flame } from 'lucide-react';

interface CreateWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWish: (newWish: Partial<Wish>) => void;
  language: 'zh' | 'en';
}

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
];

export const CreateWishModal: React.FC<CreateWishModalProps> = ({
  isOpen,
  onClose,
  onCreateWish,
  language
}) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState<CategoryType>('Travel');
  const [granularity, setGranularity] = React.useState<GranularityType>('Macro');
  const [location, setLocation] = React.useState('');
  const [targetDate, setTargetDate] = React.useState('');
  const [coverUrl, setCoverUrl] = React.useState(PRESET_COVERS[0]);
  const [privacyLevel, setPrivacyLevel] = React.useState<PrivacyLevel>('Public');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateWish({
      title,
      description,
      category,
      granularity,
      location: location || undefined,
      targetDate: targetDate || undefined,
      coverUrl,
      privacyLevel,
      status: 'Planned'
    });

    // Reset
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '1.75rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ padding: '0.4rem', borderRadius: '10px', background: 'var(--gradient-aurora)' }}>
              <Sparkles size={18} color="#fff" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {language === 'zh' ? '记录全新人生愿望 (Create Wish)' : 'Post New Life Wish'}
            </h3>
          </div>
          <button className="btn-secondary" style={{ padding: '0.4rem', borderRadius: '50%' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Wish Title *
            </label>
            <input
              type="text"
              required
              placeholder={language === 'zh' ? '例如：在冰岛玻璃木屋看一次北极光' : 'e.g. See the Northern Lights in Iceland'}
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '0.7rem 1rem',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Description & Details
            </label>
            <textarea
              rows={3}
              placeholder={language === 'zh' ? '描述你想如何体验这个愿望、你对同伴的期望...' : 'Describe how you want to experience this wish...'}
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '0.7rem 1rem',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          {/* Category & Granularity Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as CategoryType)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.85rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              >
                {(['Travel', 'Adventure', 'Food', 'Learning', 'Career', 'Experience', 'Personal Growth', 'Lifestyle', 'Relationship', 'Others'] as const).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Scope & Granularity
              </label>
              <select
                value={granularity}
                onChange={e => setGranularity(e.target.value as GranularityType)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.85rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              >
                <option value="Macro">🌌 Macro (Lifetime Dream)</option>
                <option value="Micro">⚡ Micro (Short-term Goal)</option>
              </select>
            </div>
          </div>

          {/* Cover Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Cover Image Inspiration
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
              {PRESET_COVERS.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="cover preset"
                  style={{
                    width: '60px',
                    height: '45px',
                    borderRadius: '6px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: coverUrl === url ? '2px solid #a855f7' : '1px solid var(--border-color)',
                    opacity: coverUrl === url ? 1 : 0.6
                  }}
                  onClick={() => setCoverUrl(url)}
                />
              ))}
            </div>
          </div>

          {/* Location & Target Date Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Location (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Reykjavik, Iceland"
                value={location}
                onChange={e => setLocation(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.6rem 0.85rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Target Date (Optional)
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.6rem 0.85rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center', padding: '0.75rem' }} type="submit">
            <Sparkles size={18} />
            <span>{language === 'zh' ? '立即发布愿望' : 'Post Wish Now'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
