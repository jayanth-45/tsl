import React from 'react';
import { Briefcase } from 'lucide-react';
import { Department } from '../../types/employee';


interface DepartmentCardProps {
  department: Department;
  isSelected: boolean;
  onClick: () => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, isSelected, onClick }) => {
  const getBackgroundColor = () => {
    if (isSelected) {
      switch (department.name) {
        case 'Marketing':
          return 'bg-amber-600';
        case 'Sales':
          return 'bg-blue-600';
        case 'Engineering':
          return 'bg-green-600';
        default:
          return 'bg-gray-600';
      }
    }
    
    switch (department.name) {
      case 'Marketing':
        return 'bg-amber-100';
      case 'Sales':
        return 'bg-blue-100';
      case 'Engineering':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getTextColor = () => {
    return isSelected ? 'text-white' : 'text-gray-700';
  };

  return (
    <div
      onClick={onClick}
      className={`${getBackgroundColor()} rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md min-w-0`}
    >
      <div className="flex items-center justify-center mb-3">
        <div className={`w-8 h-8 ${isSelected ? 'bg-[#8c6d73]' : 'bg-white'} rounded flex items-center justify-center`}>
          <Briefcase className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
        </div>
      </div>
      
      <div className={`font-semibold text-sm ${getTextColor()} text-center mb-1`}>
        {department.name}
      </div>
      <div className={`text-xs ${getTextColor()} opacity-80 text-center`}>
        {department.employeeCount} employees
      </div>
    </div>
  );
};

export default DepartmentCard;