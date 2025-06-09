import React from 'react';
import { TravelRequest } from '../../types';

interface RequestCardProps {
  request: TravelRequest;
  onClick: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#8B6B6B] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
          {request.employee.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{request.employee.name}</h3>
            <span className="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full whitespace-nowrap">
              Pending
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate">{request.destination} {request.createdAt}</p>
          <p className="text-sm text-gray-500">Budget: ₹{request.budget.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;