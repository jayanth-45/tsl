import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { Employee } from '../../types/employee';


interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Marketing':
        return 'bg-pink-100 text-pink-800';
      case 'Sales':
        return 'bg-green-100 text-green-800';
      case 'Engineering':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-gray-500" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 text-sm">{employee.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(employee.department)}`}>
              {employee.department}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{employee.position}</p>
          
          <div className="space-y-2">
            <div className="flex items-center text-xs text-gray-500">
              <Mail className="w-3 h-3 mr-2 flex-shrink-0" />
              <span className="truncate">{employee.email}</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-500">
              <Phone className="w-3 h-3 mr-2 flex-shrink-0" />
              <span>{employee.phone}</span>
            </div>
            
            <div className="text-xs text-gray-400">
              joined on : {employee.joinedDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;