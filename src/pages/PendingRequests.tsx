import React from 'react';
import { useNavigate } from 'react-router-dom';
import RequestCard from '../components/Dashboard/RequestCard';
import { mockRequests } from '../data/mockData';

const PendingRequests: React.FC = () => {
  const navigate = useNavigate();

  const handleRequestClick = (requestId: string) => {
    navigate(`/request/${requestId}`);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Travel Requests</h1>
      
      <div className="space-y-3 sm:space-y-4">
        {mockRequests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onClick={() => handleRequestClick(request.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PendingRequests;