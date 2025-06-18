import React, { useState } from 'react';
import { Plane, Calendar, IndianRupee, Edit, Check, X, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { TravelRequest } from '../../types';

interface TravelRequestCardProps {
  request: TravelRequest;
  onClick?: () => void;
  onEdit?: (updatedRequest: TravelRequest) => void;
}

const TravelRequestCard: React.FC<TravelRequestCardProps> = ({ request, onClick, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequest, setEditedRequest] = useState<TravelRequest>({ ...request });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'flight_options_added':
        return 'bg-blue-100 text-blue-700';
      case 'employee_selected':
        return 'bg-purple-100 text-purple-700';
      case 'manager_approved':
        return 'bg-green-100 text-green-700';
      case 'booked':
        return 'bg-emerald-100 text-emerald-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'flight_options_added':
        return 'Flight Options Added';
      case 'employee_selected':
        return 'Employee Selected';
      case 'manager_approved':
        return 'Manager Approved';
      case 'booked':
        return 'Booked';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'flight_options_added':
        return <Plane className="w-3 h-3" />;
      case 'employee_selected':
        return <CheckCircle className="w-3 h-3" />;
      case 'manager_approved':
        return <CheckCircle className="w-3 h-3" />;
      case 'booked':
        return <CheckCircle className="w-3 h-3" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(editedRequest);
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedRequest({ ...request });
    setIsEditing(false);
  };

  const handleChange = (field: keyof TravelRequest, value: string | number) => {
    setEditedRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getActionButton = () => {
    switch (request.status) {
      case 'pending':
        return 'Add Flight Options';
      case 'flight_options_added':
        return 'View Flight Options';
      case 'employee_selected':
        return 'Pending Manager Approval';
      case 'manager_approved':
        return 'Book Flight';
      case 'booked':
        return 'View Booking';
      case 'completed':
        return 'View Details';
      default:
        return 'View Details';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex space-x-4">
        {/* Left side - Avatar with icons */}
        <div className="flex-shrink-0">
          <div className="w-16 h-32 bg-[#8B6B6B] rounded-lg flex flex-col items-center justify-center text-white relative">
            <div className="absolute top-3 text-lg font-semibold">
              {request.employee.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="absolute bottom-6 flex flex-col items-center space-y-2">
              <Plane className="w-5 h-5" />
              <Calendar className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{request.employee.name}</h3>
              <p className="text-sm text-gray-600">{request.employee.empId} • {request.employee.department}</p>
            </div>
            <span className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap flex items-center space-x-1 ${getStatusColor(request.status)}`}>
              {getStatusIcon(request.status)}
              <span>{getStatusText(request.status)}</span>
            </span>
          </div>

          <div className="space-y-2 mb-4">
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input
                    type="text"
                    value={editedRequest.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
                    <input
                      type="text"
                      value={editedRequest.dates}
                      onChange={(e) => handleChange('dates', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2">
                        <IndianRupee className="w-4 h-4" />
                      </span>
                      <input
                        type="number"
                        value={editedRequest.budget}
                        onChange={(e) => handleChange('budget', parseFloat(e.target.value))}
                        className="w-full p-2 pl-8 border border-gray-300 rounded-md"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h4 className="text-lg font-semibold text-gray-900">{request.destination}</h4>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{request.dates}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  <span>{request.budget.toLocaleString()}</span>
                </div>

                {/* Flight Selection Info */}
                {request.selectedFlightId && request.flightOptions && (
                  <div className="mt-2 p-2 bg-green-50 rounded-md">
                    {(() => {
                      const selectedFlight = request.flightOptions.find(f => f.id === request.selectedFlightId);
                      return selectedFlight ? (
                        <div className="text-sm text-green-800">
                          <div className="font-medium">Selected Flight: {selectedFlight.airline} {selectedFlight.flightNumber}</div>
                          <div>₹{selectedFlight.price.toLocaleString()} • {selectedFlight.departureTime} - {selectedFlight.arrivalTime}</div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Created: {request.createdAt}</span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              {(request.status === 'booked' || request.status === 'completed') && (
                isEditing ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSave}
                      className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 flex items-center justify-center sm:w-auto"
                    >
                      <span className="sm:hidden">Save</span>
                      <Check className="hidden sm:block w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 flex items-center justify-center sm:w-auto"
                    >
                      <span className="sm:hidden">Cancel</span>
                      <X className="hidden sm:block w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleEditClick}
                    className="px-3 py-1.5 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 flex items-center justify-center sm:w-auto"
                  >
                    <span className="sm:hidden">Edit Details</span>
                    <Edit className="hidden sm:block w-4 h-4" />
                  </button>
                )
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.();
                }}
                className="px-4 py-1.5 bg-[#8B6B6B] text-white text-sm font-medium rounded-lg hover:bg-[#7A5A5A] transition-colors"
              >
                {getActionButton()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelRequestCard;