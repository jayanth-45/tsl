import React, { useState } from 'react';
import { Plane, Calendar, IndianRupee, Edit, Check, X } from 'lucide-react';
import { TravelRequest } from '../../types/travel';

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
        return 'bg-pink-100 text-pink-700';
      case 'booked':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
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
              <p className="text-sm text-gray-600">{request.employee.empId} {request.employee.department}</p>
            </div>
            <span className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(request.status)}`}>
              {getStatusText(request.status)}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={editedRequest.startDate}
                      onChange={(e) => handleChange('startDate', e.target.value)}
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
                  <span>{request.startDate}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  <span>{request.budget.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between">
  <span className="text-sm text-gray-500">Created: {request.createdAt}</span>
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    {request.status === 'booked' && (
      isEditing ? (
        <div className="flex gap-2">
          {/* Mobile and Desktop buttons combined with responsive sizing */}
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
      View Details
    </button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default TravelRequestCard;