import React, { useState, useMemo } from 'react';

import { departments, employees } from '../data/employee';
import StatsCards from '../components/RequestDetails/Statscard';
import DepartmentCard from '../components/RequestDetails/DepartmentCard';
import EmployeeCard from '../components/RequestDetails/EmployeeCard';
import SearchBar from '../components/RequestDetails/SearchBar';
import { MdDashboard } from 'react-icons/md';


interface DashboardProps {
  onMenuClick: () => void;
}
const EmployeeManagement:React.FC<DashboardProps> = ({ onMenuClick }) =>{
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = useMemo(() => {
    let filtered = employees;

    if (selectedDepartment) {
      filtered = filtered.filter(employee => employee.department === selectedDepartment);
    }

    if (searchTerm) {
      filtered = filtered.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [selectedDepartment, searchTerm]);

  const handleDepartmentClick = (departmentName: string) => {
    setSelectedDepartment(selectedDepartment === departmentName ? null : departmentName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
 
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <MdDashboard onClick={onMenuClick} className='w-5 h-5'/>
          <h1 className="text-xl font-semibold text-gray-900">Employee Management</h1>
        </div>

        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Employees..."
        />

        <StatsCards 
          totalDepartments={departments.length}
          totalEmployees={employees.length}
        />

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Departments</h2>
          <div className="grid grid-cols-3 gap-3">
            {departments.map((department) => (
              <DepartmentCard
                key={department.id}
                department={department}
                isSelected={selectedDepartment === department.name}
                onClick={() => handleDepartmentClick(department.name)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Employees</h2>
            {selectedDepartment && (
              <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Filtered by {selectedDepartment}
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No employees found</p>
                {selectedDepartment && (
                  <button
                    onClick={() => setSelectedDepartment(null)}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;