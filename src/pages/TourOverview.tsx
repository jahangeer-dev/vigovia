import React from 'react';
import { useItineraryStore, type TourOverviewData } from '../store/itineraryStore';

const TourOverview: React.FC = () => {
  const { tourOverview, setTourOverview } = useItineraryStore();

  const handleInputChange = (field: keyof TourOverviewData, value: string | number) => {
    setTourOverview({
      [field]: value
    });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...tourOverview.highlights];
    newHighlights[index] = value;
    setTourOverview({
      highlights: newHighlights
    });
  };

  const addHighlight = () => {
    setTourOverview({
      highlights: [...tourOverview.highlights, '']
    });
  };

  const removeHighlight = (index: number) => {
    setTourOverview({
      highlights: tourOverview.highlights.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tour Overview</h2>
        <p className="text-gray-600">Enter the basic information about your tour package</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trip Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trip Title *
          </label>
          <input
            type="text"
            value={tourOverview.tripTitle}
            onChange={(e) => handleInputChange('tripTitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Singapore Itinerary - 4 Days 3 Nights"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration *
          </label>
          <input
            type="text"
            value={tourOverview.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 4 Days 3 Nights"
          />
        </div>

        {/* Tour Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tour Code
          </label>
          <input
            type="text"
            value={tourOverview.tourCode}
            onChange={(e) => handleInputChange('tourCode', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., VIG-SG-001"
          />
        </div>

        {/* Departure From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departure From *
          </label>
          <input
            type="text"
            value={tourOverview.departureFrom}
            onChange={(e) => handleInputChange('departureFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Mumbai"
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination *
          </label>
          <input
            type="text"
            value={tourOverview.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Singapore"
          />
        </div>

        {/* Departure Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departure Date *
          </label>
          <input
            type="date"
            value={tourOverview.departureDate}
            onChange={(e) => handleInputChange('departureDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Arrival Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Arrival Date *
          </label>
          <input
            type="date"
            value={tourOverview.arrivalDate}
            onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Number of Travellers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Travellers *
          </label>
          <input
            type="number"
            min="1"
            value={tourOverview.numberOfTravellers}
            onChange={(e) => handleInputChange('numberOfTravellers', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="4"
          />
        </div>

        {/* Tour Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tour Type
          </label>
          <select
            value={tourOverview.tourType}
            onChange={(e) => handleInputChange('tourType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Tour Type</option>
            <option value="Family Package">Family Package</option>
            <option value="Honeymoon Package">Honeymoon Package</option>
            <option value="Adventure Tour">Adventure Tour</option>
            <option value="Cultural Tour">Cultural Tour</option>
            <option value="Business Travel">Business Travel</option>
            <option value="Group Tour">Group Tour</option>
          </select>
        </div>
      </div>

      {/* Tour Highlights */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Tour Highlights</h3>
          <button
            type="button"
            onClick={addHighlight}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Highlight
          </button>
        </div>

        <div className="space-y-3">
          {tourOverview.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Visit Marina Bay Sands"
              />
              {tourOverview.highlights.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="px-3 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourOverview;
