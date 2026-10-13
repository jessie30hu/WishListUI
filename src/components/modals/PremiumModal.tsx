import React from 'react';
import { X, Crown, Check, Sparkles, Flame, Eye, Zap } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  language: 'zh' | 'en';
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  language
}) => {
  const [selectedPlan, setSelectedPlan] = React.useState<'yearly' | 'monthly'>('yearly');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '2rem', textAlign: 'center' }}>
        
        {/* Close */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.2rem' }}>
          <button className="btn-secondary" style={{ padding: '0.4rem', borderRadius: '50%' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Crown Header */}
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)' }}>
          <Crown size={32} color="#fff" />
        </div>

        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          {language === 'zh' ? '查看对你愿望感兴趣的人' : "See Who's Interested In You"}
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.45 }}>
          {language === 'zh' ? '解锁重复访客标记、完整历史与全量 Common Dreams 向量图谱' : 'Unlock repeated visitor tracking, full history & deep Common Dreams vector matching'}
        </p>

        {/* Feature Checkmarks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', marginBottom: '1.75rem', backgroundColor: 'rgba(255,255,255,0.04)', padding: '1.1rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem' }}>
            <Check size={16} color="#34d399" />
            <span><strong>See All Profile Visitors</strong> (Unrestricted visitor history)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem' }}>
            <Check size={16} color="#34d399" />
            <span><strong>Repeated Visitor Tag</strong> (Detect people viewing &gt;3 times)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem' }}>
            <Check size={16} color="#34d399" />
            <span><strong>Monthly 2x Wish Boosts</strong> (3x priority matching)</span>
          </div>
        </div>

        {/* Pricing Tier Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Yearly */}
          <div
            style={{
              border: selectedPlan === 'yearly' ? '2px solid #f59e0b' : '1px solid var(--border-color)',
              background: selectedPlan === 'yearly' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255,255,255,0.03)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={() => setSelectedPlan('yearly')}
          >
            <span style={{ position: 'absolute', top: '-10px', right: '10px', background: '#ec4899', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.5rem', borderRadius: '9999px' }}>
              SAVE 50%
            </span>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Yearly Plan</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fbbf24', margin: '0.2rem 0' }}>$29.99 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ yr</span></div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>$2.49 / month</div>
          </div>

          {/* Monthly */}
          <div
            style={{
              border: selectedPlan === 'monthly' ? '2px solid #f59e0b' : '1px solid var(--border-color)',
              background: selectedPlan === 'monthly' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255,255,255,0.03)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedPlan('monthly')}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Monthly Plan</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fbbf24', margin: '0.2rem 0' }}>$4.99 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ mo</span></div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Billed monthly</div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="btn-primary"
          style={{
            width: '100%',
            justify: 'center',
            padding: '0.8rem',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #f59e0b, #ec4899)'
          }}
          onClick={() => { onUpgrade(); onClose(); }}
        >
          <Crown size={18} /> Unlock WishSync Premium
        </button>

      </div>
    </div>
  );
};
