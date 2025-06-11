import React, { useState } from 'react';
import { Download, FileText, Building, MapPin } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { mockExpenditureData, mockPlants } from '../../data/mockData';
import { ExpenditureData } from '../../types';

interface ExpenditureReportsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpenditureReports: React.FC<ExpenditureReportsProps> = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState<'department' | 'plant'>('department');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedPlant, setSelectedPlant] = useState<string>('all');

  const departments = Array.from(new Set(mockExpenditureData.map(item => item.department)));
  const plants = mockPlants.map(plant => plant.name);

  const getFilteredData = (): ExpenditureData[] => {
    let filtered = mockExpenditureData;

    if (reportType === 'department' && selectedDepartment !== 'all') {
      filtered = filtered.filter(item => item.department === selectedDepartment);
    }

    if (reportType === 'plant' && selectedPlant !== 'all') {
      filtered = filtered.filter(item => item.plant === selectedPlant);
    }

    return filtered;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const filteredData = getFilteredData();

    // Header
    doc.setFontSize(20);
    doc.text('TSL Travel Expenditure Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Report Type: ${reportType === 'department' ? 'Department-wise' : 'Plant-wise'}`, 20, 35);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);

    if (reportType === 'department') {
      // Department-wise report
      const groupedData = filteredData.reduce((acc, item) => {
        if (!acc[item.department]) {
          acc[item.department] = [];
        }
        acc[item.department].push(item);
        return acc;
      }, {} as Record<string, ExpenditureData[]>);

      let yPosition = 60;

      Object.entries(groupedData).forEach(([department, data]) => {
        // Department header
        doc.setFontSize(16);
        doc.text(`Department: ${department}`, 20, yPosition);
        yPosition += 10;

        // Calculate totals for department
        const totalBudget = data.reduce((sum, item) => sum + item.totalBudget, 0);
        const totalExpenditure = data.reduce((sum, item) => sum + item.actualExpenditure, 0);
        const totalPending = data.reduce((sum, item) => sum + item.pendingAmount, 0);
        const totalEmployees = data.reduce((sum, item) => sum + item.employeeCount, 0);
        const totalRequests = data.reduce((sum, item) => sum + item.requestCount, 0);

        // Summary table for department
        autoTable(doc, {
          startY: yPosition,
          head: [['Plant', 'Budget (₹)', 'Expenditure (₹)', 'Pending (₹)', 'Employees', 'Requests']],
          body: [
            ...data.map(item => [
              item.plant,
              item.totalBudget.toLocaleString(),
              item.actualExpenditure.toLocaleString(),
              item.pendingAmount.toLocaleString(),
              item.employeeCount.toString(),
              item.requestCount.toString()
            ]),
            ['Total', totalBudget.toLocaleString(), totalExpenditure.toLocaleString(), 
             totalPending.toLocaleString(), totalEmployees.toString(), totalRequests.toString()]
          ],
          theme: 'grid',
          headStyles: { fillColor: [139, 107, 107] },
          footStyles: { fillColor: [240, 240, 240], fontStyle: 'bold' }
        });

        yPosition = (doc as any).lastAutoTable.finalY + 20;

        // Add new page if needed
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
      });
    } else {
      // Plant-wise report
      const groupedData = filteredData.reduce((acc, item) => {
        if (!acc[item.plant]) {
          acc[item.plant] = [];
        }
        acc[item.plant].push(item);
        return acc;
      }, {} as Record<string, ExpenditureData[]>);

      let yPosition = 60;

      Object.entries(groupedData).forEach(([plant, data]) => {
        // Plant header
        doc.setFontSize(16);
        doc.text(`Plant: ${plant}`, 20, yPosition);
        yPosition += 10;

        // Calculate totals for plant
        const totalBudget = data.reduce((sum, item) => sum + item.totalBudget, 0);
        const totalExpenditure = data.reduce((sum, item) => sum + item.actualExpenditure, 0);
        const totalPending = data.reduce((sum, item) => sum + item.pendingAmount, 0);
        const totalEmployees = data.reduce((sum, item) => sum + item.employeeCount, 0);
        const totalRequests = data.reduce((sum, item) => sum + item.requestCount, 0);

        // Summary table for plant
        autoTable(doc, {
          startY: yPosition,
          head: [['Department', 'Budget (₹)', 'Expenditure (₹)', 'Pending (₹)', 'Employees', 'Requests']],
          body: [
            ...data.map(item => [
              item.department,
              item.totalBudget.toLocaleString(),
              item.actualExpenditure.toLocaleString(),
              item.pendingAmount.toLocaleString(),
              item.employeeCount.toString(),
              item.requestCount.toString()
            ]),
            ['Total', totalBudget.toLocaleString(), totalExpenditure.toLocaleString(), 
             totalPending.toLocaleString(), totalEmployees.toString(), totalRequests.toString()]
          ],
          theme: 'grid',
          headStyles: { fillColor: [139, 107, 107] },
          footStyles: { fillColor: [240, 240, 240], fontStyle: 'bold' }
        });

        yPosition = (doc as any).lastAutoTable.finalY + 20;

        // Add new page if needed
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
      });
    }

    // Save the PDF
    const fileName = `expenditure_report_${reportType}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Generate Expenditure Report</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setReportType('department')}
                className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors ${
                  reportType === 'department'
                    ? 'border-[#8B6B6B] bg-[#8B6B6B] bg-opacity-10'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Building className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Department-wise</div>
                  <div className="text-sm text-gray-600">Group by departments</div>
                </div>
              </button>

              <button
                onClick={() => setReportType('plant')}
                className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors ${
                  reportType === 'plant'
                    ? 'border-[#8B6B6B] bg-[#8B6B6B] bg-opacity-10'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <MapPin className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Plant-wise</div>
                  <div className="text-sm text-gray-600">Group by plants</div>
                </div>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B6B] focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Plant
              </label>
              <select
                value={selectedPlant}
                onChange={(e) => setSelectedPlant(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B6B] focus:border-transparent"
              >
                <option value="all">All Plants</option>
                {plants.map(plant => (
                  <option key={plant} value={plant}>{plant}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Report Preview</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• Report Type: {reportType === 'department' ? 'Department-wise' : 'Plant-wise'}</div>
              <div>• Department Filter: {selectedDepartment === 'all' ? 'All Departments' : selectedDepartment}</div>
              <div>• Plant Filter: {selectedPlant === 'all' ? 'All Plants' : selectedPlant}</div>
              <div>• Data Points: {getFilteredData().length} records</div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-[#8B6B6B] text-white rounded-lg hover:bg-[#7A5A5A] transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Generate PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenditureReports;