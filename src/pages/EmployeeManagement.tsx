import React, { useState, useMemo } from 'react';
import { Upload, Download, FileText } from 'lucide-react';
import { departments, employees } from '../data/employee';
import StatsCards from '../components/RequestDetails/Statscard';
import DepartmentCard from '../components/RequestDetails/DepartmentCard';
import EmployeeCard from '../components/RequestDetails/EmployeeCard';
import SearchBar from '../components/RequestDetails/SearchBar';
import FileUploadModal from '../components/EmployeeManagement/FileUploadModal';
import ExpenditureReports from '../components/Reports/ExpenditureReports';
import { MdDashboard } from 'react-icons/md';
import { Employee } from '../types';

interface DashboardProps {
  onMenuClick: () => void;
}

const EmployeeManagement: React.FC<DashboardProps> = ({ onMenuClick }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeList, setEmployeeList] = useState<Employee[]>(employees);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);

  const filteredEmployees = useMemo(() => {
    let filtered = employeeList;

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
  }, [selectedDepartment, searchTerm, employeeList]);

  const handleDepartmentClick = (departmentName: string) => {
    setSelectedDepartment(selectedDepartment === departmentName ? null : departmentName);
  };

  const handleEmployeesUploaded = (newEmployees: Employee[]) => {
    setEmployeeList(prev => [...prev, ...newEmployees]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MdDashboard onClick={onMenuClick} className='w-5 h-5 cursor-pointer' />
            <h1 className="text-xl font-semibold text-gray-900">Employee Management</h1>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setIsReportsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Reports</span>
            </button>
            
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#8B6B6B] text-white rounded-lg hover:bg-[#7A5A5A] transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload Employees</span>
            </button>
          </div>
        </div>

        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Employees..."
        />

        <StatsCards 
          totalDepartments={departments.length}
          totalEmployees={employeeList.length}
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

      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onEmployeesUploaded={handleEmployeesUploaded}
      />

      <ExpenditureReports
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
      />
    </div>
  );
};

export default EmployeeManagement;