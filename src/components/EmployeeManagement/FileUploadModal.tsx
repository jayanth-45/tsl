import React, { useState, useRef } from 'react';
import { Upload, X, Download, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Employee } from '../../types';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeesUploaded: (employees: Employee[]) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onEmployeesUploaded
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedData, setUploadedData] = useState<Employee[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = ['name', 'empId', 'department', 'email', 'phone'];

  const downloadTemplate = () => {
    const templateData = [
      {
        name: 'John Doe',
        empId: 'EMP001',
        department: 'Engineering',
        email: 'john.doe@company.com',
        phone: '+1234567890',
        position: 'Software Engineer',
        joinedDate: '2024-01-15',
        managerId: 'EMP002',
        managerName: 'Jane Smith',
        plant: 'Mumbai Plant',
        salary: 75000
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employee Template');
    XLSX.writeFile(wb, 'employee_template.xlsx');
  };

  const validateData = (data: any[]): { valid: Employee[]; errors: string[] } => {
    const validEmployees: Employee[] = [];
    const validationErrors: string[] = [];

    data.forEach((row, index) => {
      const rowNumber = index + 2; // +2 because index starts at 0 and we skip header
      const missingFields = requiredFields.filter(field => !row[field]);

      if (missingFields.length > 0) {
        validationErrors.push(`Row ${rowNumber}: Missing required fields: ${missingFields.join(', ')}`);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(row.email)) {
        validationErrors.push(`Row ${rowNumber}: Invalid email format`);
        return;
      }

      validEmployees.push({
        id: `emp_${Date.now()}_${index}`,
        name: row.name,
        empId: row.empId,
        department: row.department,
        email: row.email,
        phone: row.phone,
        position: row.position || '',
        joinedDate: row.joinedDate || '',
        managerId: row.managerId || null,
        managerName: row.managerName || null,
        plant: row.plant || '',
        salary: parseFloat(row.salary) || 0
      });
    });

    return { valid: validEmployees, errors: validationErrors };
  };

  const handleFile = (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const { valid, errors } = validateData(jsonData);
        setUploadedData(valid);
        setErrors(errors);
      };
      reader.readAsArrayBuffer(file);
    } else if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const { valid, errors } = validateData(results.data);
          setUploadedData(valid);
          setErrors(errors);
        },
        error: (error) => {
          setErrors([`CSV parsing error: ${error.message}`]);
        }
      });
    } else {
      setErrors(['Please upload only Excel (.xlsx, .xls) or CSV files']);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (uploadedData.length > 0 && errors.length === 0) {
      onEmployeesUploaded(uploadedData);
      onClose();
      setUploadedData([]);
      setErrors([]);
    }
  };

  const handleClose = () => {
    onClose();
    setUploadedData([]);
    setErrors([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Upload Employee Data</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Template Download */}
          <div className="mb-6">
            <button
              onClick={downloadTemplate}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Template</span>
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Download the template to see the required format for employee data
            </p>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileInput}
            />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop your file here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700"
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-600">
              Supports Excel (.xlsx, .xls) and CSV files
            </p>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-medium text-red-800">Validation Errors</h3>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview */}
          {uploadedData.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-4">
                Preview ({uploadedData.length} employees)
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Emp ID</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Department</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Email</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Manager</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Plant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {uploadedData.slice(0, 5).map((employee, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{employee.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{employee.empId}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{employee.department}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{employee.email}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{employee.managerName || '-'}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{employee.plant || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {uploadedData.length > 5 && (
                  <p className="text-sm text-gray-600 mt-2">
                    ... and {uploadedData.length - 5} more employees
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={uploadedData.length === 0 || errors.length > 0}
            className="px-4 py-2 bg-[#8B6B6B] text-white rounded-lg hover:bg-[#7A5A5A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload {uploadedData.length} Employees
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;