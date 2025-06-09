import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, iconColor = 'text-gray-600' }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{value}</div>
          <div className="text-sm sm:text-base text-gray-600 font-medium">{title}</div>
        </div>
        <div className={`${iconColor}`}>
          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;