import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileSelect, selectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
      />
      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-3 sm:mb-4" />
      <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
        {selectedFile ? selectedFile.name : 'Click or drag file to this area to upload'}
      </p>
      <button
        onClick={handleClick}
        className="px-3 sm:px-4 py-2 bg-[#8B6B6B] text-white rounded-lg text-sm font-medium hover:bg-[#7A5A5A] transition-colors"
      >
        Browse Files
      </button>
    </div>
  );
};

export default FileUpload;