
import React from 'react';
import { 
  BarChart3, PieChart, TrendingUp, Activity, LineChart, MessageSquare, 
  DollarSign, Percent, Tag, ShoppingCart, Users, Search, Share2, Heart, ExternalLink, Radio,
  FolderTree, Grid2X2
} from 'lucide-react';

interface TabIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const TabIcon: React.FC<TabIconProps> = ({ name, size = 16, className }) => {
  switch (name) {
    case 'BarChart3':
      return <BarChart3 size={size} className={className} />;
    case 'PieChart':
      return <PieChart size={size} className={className} />;
    case 'TrendingUp':
      return <TrendingUp size={size} className={className} />;
    case 'Activity':
      return <Activity size={size} className={className} />;
    case 'LineChart':
      return <LineChart size={size} className={className} />;
    case 'MessageSquare':
      return <MessageSquare size={size} className={className} />;
    case 'DollarSign':
      return <DollarSign size={size} className={className} />;
    case 'Percent':
      return <Percent size={size} className={className} />;
    case 'Tag':
      return <Tag size={size} className={className} />;
    case 'ShoppingCart':
      return <ShoppingCart size={size} className={className} />;
    case 'Users':
      return <Users size={size} className={className} />;
    case 'Search':
      return <Search size={size} className={className} />;
    case 'Share2':
      return <Share2 size={size} className={className} />;
    case 'Heart':
      return <Heart size={size} className={className} />;
    case 'ExternalLink':
      return <ExternalLink size={size} className={className} />;
    case 'Radio':
      return <Radio size={size} className={className} />;
    case 'FolderTree':
      return <FolderTree size={size} className={className} />;
    case 'Grid2X2':
      return <Grid2X2 size={size} className={className} />;
    default:
      return <BarChart3 size={size} className={className} />;
  }
};
