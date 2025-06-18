import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Building2, Calendar, IndianRupee, Plane, Hotel, Phone, Mail, Plus, CheckCircle } from 'lucide-react';
import ProgressSteps from '../components/RequestDetails/ProgressSteps';
import { mockRequests } from '../data/mockData';

const RequestDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);

  const request = mockRequests.find(r => r.id === id);

  if (!request) {
    return <div>Request not found</div>;
  }

  const handleContinue = () => {
    switch (request.status) {
      case 'pending':
        navigate(`/request/${id}/flight-options`);
        break;
      case 'flight_options_added':
        // Show flight options for employee selection
        break;
      case 'employee_selected':
        // Waiting for manager approval
        break;
      case 'manager_approved':
        navigate(`/request/${id}/booking-confirmation`);
        break;
      case 'booked':
        navigate(`/request/${id}/booking`);
        break;
      default:
        navigate(`/request/${id}/booking`);
    }
  };

  const getActionButtonText = () => {
    switch (request.status) {
      case 'pending':
        return 'Add Flight Options';
      case 'flight_options_added':
        return 'View Flight Options';
      case 'employee_selected':
        return 'Waiting for Manager Approval';
      case 'manager_approved':
        return 'Book Flight';
      case 'booked':
        return 'View Booking Details';
      default:
        return 'Continue';
    }
  };

  const selectedFlight = request.flightOptions?.find(f => f.id === request.selectedFlightId);

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
        <ProgressSteps currentStep={currentStep} />
      </div>

      {/* Request Information */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Request Information</h2>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
            <div className="min-w-0">
              <span className="text-gray-600 text-sm sm:text-base">Employee:</span>
              <span className="ml-2 font-medium text-blue-600 text-sm sm:text-base">
                {request.employee.name} ({request.employee.empId})
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
            <div>
              <span className="text-gray-600 text-sm sm:text-base">Department:</span>
              <span className="ml-2 font-medium text-sm sm:text-base">{request.employee.department}</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-gray-600 mt-1 text-sm sm:text-base">Type:</div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs sm:text-sm font-medium rounded-full flex items-center space-x-1">
                <Plane className="w-3 h-3" />
                <span>Flight</span>
              </span>
              <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium rounded-full flex items-center space-x-1">
                <Hotel className="w-3 h-3" />
                <span>Hotel</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
            <div>
              <span className="text-gray-600 text-sm sm:text-base">Dates:</span>
              <span className="ml-2 font-medium text-sm sm:text-base">{request.dates}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
            <div>
              <span className="text-gray-600 text-sm sm:text-base">Budget:</span>
              <span className="ml-2 font-medium text-sm sm:text-base">₹ {request.budget.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Options Status */}
      {request.flightOptions && request.flightOptions.length > 0 && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Flight Options</h2>
          
          <div className="space-y-3">
            {request.flightOptions.map((flight, index) => (
              <div 
                key={flight.id} 
                className={`border rounded-lg p-4 ${
                  flight.id === request.selectedFlightId 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Plane className="w-4 h-4 text-[#8B6B6B]" />
                    <div>
                      <span className="font-semibold">{flight.airline} {flight.flightNumber}</span>
                      {flight.id === request.selectedFlightId && (
                        <CheckCircle className="w-4 h-4 text-green-600 inline ml-2" />
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{flight.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{flight.departureTime} - {flight.arrivalTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedFlight && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Employee selected: {selectedFlight.airline} {selectedFlight.flightNumber}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Travel Details */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Travel Details</h2>
        
        <div className="space-y-3 sm:space-y-4">
          <div>
            <span className="text-gray-600 font-medium text-sm sm:text-base">Destination:</span>
            <p className="text-gray-900 mt-1 text-sm sm:text-base">{request.destination}</p>
          </div>

          <div>
            <span className="text-gray-600 font-medium text-sm sm:text-base">Purpose:</span>
            <p className="text-gray-900 mt-1 text-sm sm:text-base">{request.purpose}</p>
          </div>

          <div>
            <span className="text-gray-600 font-medium text-sm sm:text-base">Description:</span>
            <p className="text-gray-900 mt-1 text-sm sm:text-base">{request.description}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Contact Information</h2>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
            <div className="min-w-0">
              <span className="text-gray-600 text-sm sm:text-base">Phone:</span>
              <span className="ml-2 font-medium text-sm sm:text-base">{request.employee.phone}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
            <div className="min-w-0">
              <span className="text-gray-600 text-sm sm:text-base">Email:</span>
              <span className="ml-2 font-medium text-orange-600 text-sm sm:text-base break-all">{request.employee.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={request.status === 'employee_selected'}
          className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
            request.status === 'employee_selected'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#8B6B6B] text-white hover:bg-[#7A5A5A]'
          }`}
        >
          {request.status === 'pending' && <Plus className="w-4 h-4" />}
          {request.status === 'manager_approved' && <Plane className="w-4 h-4" />}
          <span>{getActionButtonText()}</span>
        </button>
      </div>
    </div>
  );
};

export default RequestDetails;