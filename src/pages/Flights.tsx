import React from 'react';
import { useItineraryStore, useFlights } from '../store/itineraryStore';
import { MdFlight, MdAdd, MdDelete } from 'react-icons/md';

const Flights: React.FC = () => {
  const flights = useFlights();
  const { addFlight, removeFlight, updateFlight } = useItineraryStore();

  const handleAddFlight = () => {
    addFlight();
  };

  const handleRemoveFlight = (flightId: string) => {
    removeFlight(flightId);
  };

  const handleUpdateFlight = (flightId: string, field: string, value: string) => {
    updateFlight(flightId, { [field]: value });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <MdFlight className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Flight Details</h1>
            <p className="text-gray-500 mt-1">Manage flight information for your itinerary</p>
          </div>
        </div>
        <button
          onClick={handleAddFlight}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <MdAdd className="w-5 h-5" />
          Add Flight
        </button>
      </div>

      {flights.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <MdFlight className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Flights Added</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first flight</p>
          <button
            onClick={handleAddFlight}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <MdAdd className="w-5 h-5" />
            Add Flight
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {flights.map((flight, index) => (
            <div
              key={flight.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <MdFlight className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Flight {index + 1}
                  </h3>
                </div>
                <button
                  onClick={() => handleRemoveFlight(flight.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove Flight"
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flight Date *
                  </label>
                  <input
                    type="date"
                    value={flight.date}
                    onChange={(e) => handleUpdateFlight(flight.id, 'date', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Airline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Airline *
                  </label>
                  <input
                    type="text"
                    value={flight.airline}
                    onChange={(e) => handleUpdateFlight(flight.id, 'airline', e.target.value)}
                    placeholder="e.g., Air India, IndiGo"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Flight Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flight Number *
                  </label>
                  <input
                    type="text"
                    value={flight.flightNumber}
                    onChange={(e) => handleUpdateFlight(flight.id, 'flightNumber', e.target.value)}
                    placeholder="e.g., AI 123, 6E 456"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Origin City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origin City *
                  </label>
                  <input
                    type="text"
                    value={flight.originCity}
                    onChange={(e) => handleUpdateFlight(flight.id, 'originCity', e.target.value)}
                    placeholder="e.g., Mumbai, Delhi"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Origin Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origin Airport Code *
                  </label>
                  <input
                    type="text"
                    value={flight.originCode}
                    onChange={(e) => handleUpdateFlight(flight.id, 'originCode', e.target.value.toUpperCase())}
                    placeholder="e.g., BOM, DEL"
                    maxLength={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all uppercase"
                  />
                </div>

                {/* Destination City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination City *
                  </label>
                  <input
                    type="text"
                    value={flight.destinationCity}
                    onChange={(e) => handleUpdateFlight(flight.id, 'destinationCity', e.target.value)}
                    placeholder="e.g., Bangalore, Chennai"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Destination Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Airport Code *
                  </label>
                  <input
                    type="text"
                    value={flight.destinationCode}
                    onChange={(e) => handleUpdateFlight(flight.id, 'destinationCode', e.target.value.toUpperCase())}
                    placeholder="e.g., BLR, MAA"
                    maxLength={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all uppercase"
                  />
                </div>
              </div>

              {/* Notes - Full Width */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={flight.notes || ''}
                  onChange={(e) => handleUpdateFlight(flight.id, 'notes', e.target.value)}
                  placeholder="Any additional flight information, special requirements, or notes..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flights;
