
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Plane, Building } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import RequestCard from '../components/Dashboard/RequestCard';
import { mockRequests } from '../data/mockData';
import { MdDashboard } from 'react-icons/md';
interface DashboardProps {
  onMenuClick: () => void;
}
const Dashboard: React.FC<DashboardProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleRequestClick = (requestId: string) => {
    navigate(`/request/${requestId}`);
  };

  const handleViewAllClick = () => {
    navigate('/pending-requests');
  };
 


  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6 sm:mb-8">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded grid grid-cols-2 gap-0.5 p-1 " >
         <MdDashboard   onClick={onMenuClick} className='w-5 h-5' />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <StatsCard
          title="Travel Request"
          value="12"
          icon={Clock}
          iconColor="text-gray-600"
        />
        <StatsCard
          title="Total Employee"
          value="86"
          icon={Users}
          iconColor="text-[#8B6B6B]"
        />
        <StatsCard
          title="Flight Budget Used"
          value="68%"
          icon={Plane}
          iconColor="text-[#8B6B6B]"
        />
        <StatsCard
          title="Hotel Budget Used"
          value="42%"
          icon={Building}
          iconColor="text-gray-600"
        />
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Requests</h2>
          <button 
            onClick={handleViewAllClick}
            className="text-[#8B6B6B] font-medium hover:text-[#7A5A5A] transition-colors text-sm sm:text-base"
          >
            View All
          </button>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {mockRequests.slice(0, 3).map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onClick={() => handleRequestClick(request.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;