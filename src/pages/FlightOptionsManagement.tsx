import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Plus, Trash2, Save, Clock, IndianRupee } from 'lucide-react';
import { mockRequests, mockFlightOptions } from '../data/mockData';
import { FlightOption, TravelRequest } from '../types';

const FlightOptionsManagement: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const request = mockRequests.find(r => r.id === id);
  const [flightOptions, setFlightOptions] = useState<FlightOption[]>(
    request?.flightOptions || []
  );

  const [newFlight, setNewFlight] = useState<Partial<FlightOption>>({
    airline: '',
    flightNumber: '',
    price: 0,
    departureTime: '',
    arrivalTime: '',
    duration: ''
  });

  const handleAddFlight = () => {
    if (flightOptions.length >= 3) {
      alert('Maximum 3 flight options allowed');
      return;
    }

    if (!newFlight.airline || !newFlight.flightNumber || !newFlight.price) {
      alert('Please fill all required fields');
      return;
    }

    const flight: FlightOption = {
      id: `flight_${Date.now()}`,
      airline: newFlight.airline!,
      flightNumber: newFlight.flightNumber!,
      price: newFlight.price!,
      departureTime: newFlight.departureTime!,
      arrivalTime: newFlight.arrivalTime!,
      duration: newFlight.duration!
    };

    setFlightOptions([...flightOptions, flight]);
    setNewFlight({
      airline: '',
      flightNumber: '',
      price: 0,
      departureTime: '',
      arrivalTime: '',
      duration: ''
    });
  };

  const handleRemoveFlight = (flightId: string) => {
    setFlightOptions(flightOptions.filter(f => f.id !== flightId));
  };

  const handleSaveOptions = () => {
    if (flightOptions.length === 0) {
      alert('Please add at least one flight option');
      return;
    }

    // Here you would typically update the request in your state management
    console.log('Saving flight options:', flightOptions);
    
    // Navigate back to request details
    navigate(`/request/${id}`);
  };

  if (!request) {
    return <div>Request not found</div>;
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
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Manage Flight Options</h1>
      </div>

      {/* Request Summary */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Request Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600 text-sm">Employee:</span>
            <p className="font-medium">{request.employee.name} ({request.employee.empId})</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Destination:</span>
            <p className="font-medium">{request.destination}</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Travel Dates:</span>
            <p className="font-medium">{request.dates}</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Budget:</span>
            <p className="font-medium">₹{request.budget.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Current Flight Options */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Flight Options ({flightOptions.length}/3)</h2>
        </div>

        {flightOptions.length > 0 ? (
          <div className="space-y-4">
            {flightOptions.map((flight, index) => (
              <div key={flight.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Plane className="w-4 h-4 text-[#8B6B6B]" />
                      <span className="font-semibold text-gray-900">
                        {flight.airline} {flight.flightNumber}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <div className="flex items-center">
                          <IndianRupee className="w-3 h-3 mr-1" />
                          <span className="font-medium">{flight.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Departure:</span>
                        <p className="font-medium">{flight.departureTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Arrival:</span>
                        <p className="font-medium">{flight.arrivalTime}</p>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>Duration: {flight.duration}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRemoveFlight(flight.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Plane className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No flight options added yet</p>
          </div>
        )}
      </div>

      {/* Add New Flight Option */}
      {flightOptions.length < 3 && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Add Flight Option</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Airline *</label>
              <input
                type="text"
                value={newFlight.airline || ''}
                onChange={(e) => setNewFlight({...newFlight, airline: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B6B] focus:border-transparent"
                placeholder="e.g., Air India"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Flight Number *</label>
              <input
                type="text"
                value={newFlight.flightNumber || ''}
                onChange={(e) => setNewFlight({...newFlight, flightNumber: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B6B] focus:border-transparent"
                placeholder="e.g., AI 131"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
              <input
                type="number"
                value={newFlight.price || ''}
                onChange={(e) => setNewFlight({...newFlight, price: parseFloat(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B6B] focus:border-transparent"
                placeholder="e.g., 8500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={newFlight.duration || ''}
                onChange={(e) => setNewFlight({...newFlight, duration: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B6B] focus:border-transparent"
                placeholder="e.g., 3h 15m"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time</label>
              <input
                type="time"
                value={newFlight.departureTime || ''}
                onChange={(e) => setNewFlight({...newFlight, departureTime: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B6B] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Arrival Time</label>
              <input
                type="time"
                value={newFlight.arrivalTime || ''}
                onChange={(e) => setNewFlight({...newFlight, arrivalTime: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B6B6B] focus:border-transparent"
              />
            </div>
          </div>
          
          <button
            onClick={handleAddFlight}
            className="flex items-center space-x-2 px-4 py-2 bg-[#8B6B6B] text-white rounded-lg hover:bg-[#7A5A5A] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Flight Option</span>
          </button>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveOptions}
          className="flex items-center space-x-2 px-6 py-3 bg-[#8B6B6B] text-white rounded-lg hover:bg-[#7A5A5A] transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Flight Options</span>
        </button>
      </div>
    </div>
  );
};

export default FlightOptionsManagement;