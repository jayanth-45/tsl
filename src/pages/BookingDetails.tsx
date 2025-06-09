import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket, Receipt, Hotel, Edit } from 'lucide-react';
import ProgressSteps from '../components/RequestDetails/ProgressSteps';
import FileUpload from '../components/RequestDetails/FileUpload';
import { BookingDetails as BookingDetailsType } from '../types';

const BookingDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<BookingDetailsType>({
    flightTicketNumber: '',
    flightInvoice: undefined,
    hotelName: '',
    hotelInvoice: undefined,
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const handleFileSelect = (field: keyof BookingDetailsType) => (file: File) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleEditClick = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue || '');
  };

  const handleSaveEdit = (field: keyof BookingDetailsType) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: tempValue
    }));
    setEditingField(null);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const handleSaveAndComplete = () => {
    navigate(`/request/${id}/completed`);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6 sm:mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Request Details</h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-6 sm:mb-8">
        <ProgressSteps currentStep={3} />
      </div>

      {/* Flight Details */}
      <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Flight Details</h2>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Flight Ticket Number */}
          <div className="relative">
            <Ticket className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            {editingField === 'flightTicketNumber' ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B6B] focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter ticket price"
                />
                <button 
                  onClick={() => handleSaveEdit('flightTicketNumber')}
                  className="ml-2 px-3 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="ml-2 px-3 py-1 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  value={bookingDetails.flightTicketNumber || ''}
                  readOnly
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-sm sm:text-base"
                  placeholder="Ticket price"
                />
                <button 
                  onClick={() => handleEditClick('flightTicketNumber', bookingDetails.flightTicketNumber || '')}
                  className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <FileUpload
            label="Upload Flight Ticket"
            onFileSelect={handleFileSelect('flightInvoice')}
            selectedFile={bookingDetails.flightInvoice}
          />

          {/* Flight Invoice */}
          <div className="relative">
            {editingField === 'flightInvoiceNumber' ? (
              <div className="flex items-center">
                 <label className="mb-1 text-sm font-medium text-gray-700">Invoice Upload</label>

              </div>
            ) : (
              <div className="flex items-center">
                  <label className="mb-1 text-sm font-medium text-gray-700">Invoice Upload</label>

              </div>
            )}
          </div>

          <FileUpload
            label="Upload Flight Invoice"
            onFileSelect={handleFileSelect('flightInvoice')}
            selectedFile={bookingDetails.flightInvoice}
          />
        </div>
      </div>

      {/* Hotel Details */}
      <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Hotel Details</h2>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Hotel Name */}
          <div className="relative">
            {editingField === 'hotelName' ? (
              <div className="flex items-center">
                              <label className="mb-1 text-sm font-medium text-gray-700">Hotel Invoice Upload</label>

              </div>
            ) : (
              <div className="flex items-center">
                                         <label className="mb-1 text-sm font-medium text-gray-700">Hotel Invoice Upload</label>

              </div>
            )}
          </div>

          <FileUpload
            label="Upload Hotel Invoice"
            onFileSelect={handleFileSelect('hotelInvoice')}
            selectedFile={bookingDetails.hotelInvoice}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSaveAndComplete}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#8B6B6B] text-white rounded-lg font-medium hover:bg-[#7A5A5A] transition-colors"
        >
          Save and Complete Booking
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;