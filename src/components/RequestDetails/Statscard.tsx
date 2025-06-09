import React from 'react';
import { Users, Building } from 'lucide-react';

interface StatsCardsProps {
  totalDepartments: number;
  totalEmployees: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ totalDepartments, totalEmployees }) => {
  return (
    <div className="flex justify-between mb-8">
      <div className="text-center bg-white p-4 rounded-lg shadow-md  ml-4">
        <div className="flex items-center justify-center mb-2 ">
          <div className="text-4xl font-bold text-gray-800">{totalDepartments}</div>
          <Building className="w-6 h-6 text-gray-500 ml-2" />
        </div>
        <div className="text-gray-600 font-medium">Departments</div>
      </div>
      
      <div className="text-center bg-white p-6 rounded-lg shadow-md  mr-4">
        <div className="flex items-center justify-center mb-2">
          <div className="text-4xl font-bold text-gray-800">{totalEmployees}</div>
          <Users className="w-6 h-6 text-gray-500 ml-2" />
        </div>
        <div className="text-gray-600 font-medium">Employees</div>
      </div>
    </div>
  );
};

export default StatsCards;