import React from 'react';
import { Visitor, User } from '../../types';
import { Eye, Crown, Flame, ShieldCheck, ArrowRight, Lock, Sparkles } from 'lucide-react';

interface VisitorsViewProps {
  visitors: Visitor[];
  currentUser: User;
  language: 'zh' | 'en';
  onSelectUser: (userId: string) => void;
  onOpenPremiumModal: () => void;
}

export const VisitorsView: React.FC<VisitorsViewProps> = ({
  visitors,
  currentUser,
  language,
  onSelectUser,
  onOpenPremiumModal
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', paddingBottom: '3rem' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Eye size={26} color="#a855f7" />
            {language === 'zh' ? '谁关注了我 (Profile Visitors)' : 'Who Viewed Your Profile'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {language === 'zh' ? '发现对你的人生愿望感兴趣的人' : 'Discover who is curious about your bucket list & life dreams'}
          </p>
        </div>

        {!currentUser.isPremium && (
          <button
            style={{
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.25), rgba(245, 158, 11, 0.25))',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              color: '#fbbf24',
              borderRadius: '9999px',
              padding: '0.55rem 1.1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              align-items: 'center',
              gap: '0.5rem'
            }}
            onClick={onOpenPremiumModal}
          >
            <Crown size={16} />
            {language === 'zh' ? '解锁重复访客与全部记录' : 'Unlock All Visitor History'}
          </button>
        )}
      </div>

      {/* Visitor List */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {visitors.map((item, index) => {
          const isBlurred = !currentUser.isPremium && index >= 2;

          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Blur Overlay for Non-Premium */}
              {isBlurred && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(11, 15, 25, 0.85)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem'
                  }}
                >
                  <Lock size={16} color="#fbbf24" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {language === 'zh' ? '升级 Premium 查看更多访客历史' : 'Unlock Premium to reveal this visitor'}
                  </span>
                  <button className="btn-primary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }} onClick={onOpenPremiumModal}>
                    Unlock
                  </button>
                </div>
              )}

              {/* Visitor User Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <img
                  src={item.visitor.avatar}
                  alt={item.visitor.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700 }}>
                      {item.visitor.name}
                    </h4>
                    {item.visitor.verifiedBadge && <ShieldCheck size={15} color="#6366f1" />}

                    {/* Repeated Visitor Tag */}
                    {item.isRepeated && (
                      <span
                        style={{
                          backgroundColor: 'rgba(236, 72, 153, 0.2)',
                          color: '#ec4899',
                          border: '1px solid rgba(236, 72, 153, 0.4)',
                          padding: '0.1rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          align-items: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <Flame size={12} /> Viewed repeatedly ({item.visitCount} times)
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Viewed your profile {item.lastVisitedAt}
                  </p>
                </div>
              </div>

              {/* Action */}
              <button
                className="btn-secondary"
                style={{ fontSize: '0.8rem' }}
                onClick={() => onSelectUser(item.visitor.id)}
              >
                {language === 'zh' ? '查看 Profile' : 'View Profile'} <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
