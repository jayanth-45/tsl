import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import RequestDetails from './pages/RequestDetails';
import BookingDetails from './pages/BookingDetails';
import BookingCompleted from './pages/BookingCompleted';
import EmployeeManagement from './pages/EmployeeManagement';
import TravelRequests from './pages/TravelRequest';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  
  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header username="Admin" />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
          <main className="flex-1 lg:ml-0 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard onMenuClick={handleMenuClick} />} />
              <Route path="/dashboard" element={<Dashboard onMenuClick={handleMenuClick} />} />
              <Route path="/pending-requests" element={<TravelRequests onMenuClick={handleMenuClick} />} />
              <Route path="/travel-requests" element={<TravelRequests onMenuClick={handleMenuClick} />} />
              <Route path="/request/:id" element={<RequestDetails />} />
              <Route path="/request/:id/booking" element={<BookingDetails />} />
              <Route path="/request/:id/completed" element={<BookingCompleted />} />
              <Route path="/employees" element={<EmployeeManagement onMenuClick={handleMenuClick} />} />
              <Route path="/employee-management" element={<EmployeeManagement onMenuClick={handleMenuClick} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;