import React, { useState, useMemo } from 'react';

import { travelRequests } from '../data/travelDate';
import TravelRequestCard from '../components/RequestDetails/TravelRequestCard';
import { MdDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  onMenuClick: () => void;
}
const TravelRequests: React.FC<DashboardProps> = ({ onMenuClick }) =>{
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'booked' | 'completed'>('all');
const navigate= useNavigate();
  const filteredRequests = useMemo(() => {
    if (activeTab === 'all') {
      return travelRequests;
    }
    return travelRequests.filter(request => request.status === activeTab);
  }, [activeTab]);

  const tabs = [
    { id: 'all', label: 'All Requests', color: 'text-red-600 border-red-600' },
    { id: 'pending', label: 'Pending', color: 'text-gray-600 border-transparent' },
    { id: 'booked', label: 'Booked', color: 'text-gray-600 border-transparent' },
    { id: 'completed', label: 'completed', color: 'text-gray-600 border-transparent' }
  ];

  const getTabColor = (tabId: string) => {
    return activeTab === tabId ? 'text-red-600 border-red-600' : 'text-gray-600 border-transparent';
  };

  const handleRequestClick = (requestId: string) => {
    console.log('Request clicked:', requestId);
    navigate(`/request/${requestId}`);
    
    // Handle navigation to request details
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6 b">
          <MdDashboard onClick={onMenuClick} className='w-4 h-4'  />
          <h1 className="text-xl font-semibold text-gray-900">Travel Requests</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'all' | 'pending' | 'booked' | 'completed')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${getTabColor(tab.id)}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <TravelRequestCard
                key={request.id}
                request={request}
                onClick={() => handleRequestClick(request.id)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No {activeTab === 'all' ? '' : activeTab} requests found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelRequests;