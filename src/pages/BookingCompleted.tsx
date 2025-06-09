import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import ProgressSteps from '../components/RequestDetails/ProgressSteps';
import { mockRequests } from '../data/mockData';

const BookingCompleted: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const request = mockRequests.find(r => r.id === id);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6 sm:mb-8">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Request Details</h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 sm:mb-12">
        <ProgressSteps currentStep={4} />
      </div>

      {/* Completion Message */}
      <div className="flex flex-col items-center justify-center py-12 sm:py-16">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#8B6B6B] rounded-full flex items-center justify-center mb-6 sm:mb-8">
          <Check className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
          Booking Completed For
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 text-center">
          Employee {request?.employee.name || 'JohnSmith'}
        </p>
      </div>
    </div>
  );
};

export default BookingCompleted;