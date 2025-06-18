import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Send, Plane, CheckCircle, FileText } from 'lucide-react';
import { mockRequests } from '../data/mockData';

const BookingConfirmation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const request = mockRequests.find(r => r.id === id);
  const selectedFlight = request?.flightOptions?.find(f => f.id === request.selectedFlightId);
  
  const [bookingDetails, setBookingDetails] = useState({
    ticketNumber: '',
    bookingReference: '',
    confirmationFile: null as File | null
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBookingDetails(prev => ({
        ...prev,
        confirmationFile: file
      }));
    }
  };

  const handleSendConfirmation = () => {
    if (!bookingDetails.ticketNumber || !bookingDetails.bookingReference) {
      alert('Please fill all required fields');
      return;
    }

    // Here you would typically:
    // 1. Update the request status to 'booked'
    // 2. Save booking details
    // 3. Send confirmation to employee
    
    console.log('Sending booking confirmation:', bookingDetails);
    alert('Booking confirmation sent to employee successfully!');
    navigate('/');
  };

  if (!request || !selectedFlight) {
    return <div>Request or selected flight not found</div>;
  }

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
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Flight Booking Confirmation</h1>
      </div>

      {/* Request Summary */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600 text-sm">Employee:</span>
            <p className="font-medium">{request.employee.name}</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Employee ID:</span>
            <p className="font-medium">{request.employee.empId}</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Destination:</span>
            <p className="font-medium">{request.destination}</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Travel Dates:</span>
            <p className="font-medium">{request.dates}</p>
          </div>
        </div>
      </div>

      {/* Selected Flight Details */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Selected Flight</h2>
        <div className="border border-green-200 bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Plane className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">
              {selectedFlight.airline} {selectedFlight.flightNumber}
            </span>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Price:</span>
              <p className="font-medium text-green-800">₹{selectedFlight.price.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-600">Departure:</span>
              <p className="font-medium">{selectedFlight.departureTime}</p>
            </div>
            <div>
              <span className="text-gray-600">Arrival:</span>
              <p className="font-medium">{selectedFlight.arrivalTime}</p>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            Duration: {selectedFlight.duration}
          </div>
        </div>
      </div>

      {/* Booking Details Form */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Booking Details</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Number *
            </label>
            <input
              type="text"
              value={bookingDetails.ticketNumber}
              onChange={(e) => setBookingDetails(prev => ({
                ...prev,
                ticketNumber: e.target.value
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B6B] focus:border-transparent"
              placeholder="Enter ticket number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Booking Reference *
            </label>
            <input
              type="text"
              value={bookingDetails.bookingReference}
              onChange={(e) => setBookingDetails(prev => ({
                ...prev,
                bookingReference: e.target.value
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B6B] focus:border-transparent"
              placeholder="Enter booking reference"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Ticket/Confirmation (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="confirmation-file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <label htmlFor="confirmation-file" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">
                  {bookingDetails.confirmationFile 
                    ? bookingDetails.confirmationFile.name 
                    : 'Click to upload ticket or confirmation document'
                  }
                </p>
                <span className="px-4 py-2 bg-[#8B6B6B] text-white rounded-lg text-sm hover:bg-[#7A5A5A] transition-colors">
                  Browse Files
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSendConfirmation}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#8B6B6B] text-white rounded-lg hover:bg-[#7A5A5A] transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Send Confirmation to Employee</span>
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Next Steps:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>The booking confirmation will be sent to the employee's email</li>
              <li>Employee will receive ticket details and travel instructions</li>
              <li>Request status will be updated to "Booked"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;