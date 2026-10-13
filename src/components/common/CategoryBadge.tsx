import React from 'react';
import { CategoryType } from '../../types';
import { Compass, Flame, Utensils, GraduationCap, Briefcase, Sparkles, Heart, Sun, UserCheck, Tag } from 'lucide-react';

interface CategoryBadgeProps {
  category: CategoryType;
  size?: 'sm' | 'md';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'md' }) => {
  const getCategoryConfig = (cat: CategoryType) => {
    switch (cat) {
      case 'Travel':
        return { icon: Compass, label: 'Travel', color: 'rgba(99, 102, 241, 0.2)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.4)' };
      case 'Adventure':
        return { icon: Flame, label: 'Adventure', color: 'rgba(245, 158, 11, 0.2)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.4)' };
      case 'Food':
        return { icon: Utensils, label: 'Food', color: 'rgba(239, 68, 68, 0.2)', text: '#f87171', border: 'rgba(239, 68, 68, 0.4)' };
      case 'Learning':
        return { icon: GraduationCap, label: 'Learning', color: 'rgba(16, 185, 129, 0.2)', text: '#34d399', border: 'rgba(16, 185, 129, 0.4)' };
      case 'Career':
        return { icon: Briefcase, label: 'Career', color: 'rgba(14, 165, 233, 0.2)', text: '#38bdf8', border: 'rgba(14, 165, 233, 0.4)' };
      case 'Experience':
        return { icon: Sparkles, label: 'Experience', color: 'rgba(168, 85, 247, 0.2)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.4)' };
      case 'Personal Growth':
        return { icon: Sun, label: 'Growth', color: 'rgba(234, 179, 8, 0.2)', text: '#facc15', border: 'rgba(234, 179, 8, 0.4)' };
      case 'Lifestyle':
        return { icon: UserCheck, label: 'Lifestyle', color: 'rgba(236, 72, 153, 0.2)', text: '#f472b6', border: 'rgba(236, 72, 153, 0.4)' };
      case 'Relationship':
        return { icon: Heart, label: 'Relationship', color: 'rgba(244, 63, 94, 0.2)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.4)' };
      default:
        return { icon: Tag, label: 'Others', color: 'rgba(107, 114, 128, 0.2)', text: '#9ca3af', border: 'rgba(107, 114, 128, 0.4)' };
    }
  };

  const config = getCategoryConfig(category);
  const Icon = config.icon;

  const isSmall = size === 'sm';

  return (
    <span
      style={{
        backgroundColor: config.color,
        color: config.text,
        border: `1px solid ${config.border}`,
        padding: isSmall ? '0.15rem 0.5rem' : '0.25rem 0.7rem',
        borderRadius: '9999px',
        fontSize: isSmall ? '0.7rem' : '0.78rem',
        fontWeight: 600,
        display: 'inline-flex',
        align-items: 'center',
        gap: isSmall ? '0.25rem' : '0.35rem',
      }}
    >
      <Icon size={isSmall ? 11 : 14} />
      {config.label}
    </span>
  );
};
