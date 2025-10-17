import React from 'react';
import { useItineraryStore, useHotels } from '../store/itineraryStore';
import { MdHotel, MdAdd, MdDelete } from 'react-icons/md';

const HotelDetails: React.FC = () => {
  const hotels = useHotels();
  const { addHotel, removeHotel, updateHotel } = useItineraryStore();

  const handleAddHotel = () => {
    addHotel();
  };

  const handleRemoveHotel = (hotelId: string) => {
    removeHotel(hotelId);
  };

  const handleUpdateHotel = (hotelId: string, field: string, value: string) => {
    const updates: any = { [field]: value };
    
    // Auto-calculate nights when both check-in and check-out dates are present
    if (field === 'checkIn' || field === 'checkOut') {
      const hotel = hotels.find(h => h.id === hotelId);
      if (hotel) {
        const checkIn = field === 'checkIn' ? value : hotel.checkIn;
        const checkOut = field === 'checkOut' ? value : hotel.checkOut;
        
        if (checkIn && checkOut) {
          const checkInDate = new Date(checkIn);
          const checkOutDate = new Date(checkOut);
          const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
          const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
          updates.nights = nights > 0 ? nights : 0;
        }
      }
    }
    
    updateHotel(hotelId, updates);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
            <MdHotel className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hotel Details</h1>
            <p className="text-gray-500 mt-1">Manage hotel accommodations for your itinerary</p>
          </div>
        </div>
        <button
          onClick={handleAddHotel}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <MdAdd className="w-5 h-5" />
          Add Hotel
        </button>
      </div>

      {hotels.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
            <MdHotel className="w-10 h-10 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Hotels Added</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first hotel</p>
          <button
            onClick={handleAddHotel}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <MdAdd className="w-5 h-5" />
            Add Hotel
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {hotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <MdHotel className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Hotel {index + 1}
                  </h3>
                </div>
                <button
                  onClick={() => handleRemoveHotel(hotel.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove Hotel"
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hotel Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hotel Name *
                  </label>
                  <input
                    type="text"
                    value={hotel.hotelName}
                    onChange={(e) => handleUpdateHotel(hotel.id, 'hotelName', e.target.value)}
                    placeholder="e.g., Grand Hyatt, Taj Palace"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={hotel.city}
                    onChange={(e) => handleUpdateHotel(hotel.id, 'city', e.target.value)}
                    placeholder="e.g., Mumbai, Delhi, Bangalore"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Check-in Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    value={hotel.checkIn}
                    onChange={(e) => handleUpdateHotel(hotel.id, 'checkIn', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Check-out Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    value={hotel.checkOut}
                    onChange={(e) => handleUpdateHotel(hotel.id, 'checkOut', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Number of Nights - Auto-calculated */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Nights
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={hotel.nights}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 cursor-not-allowed"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      Auto-calculated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
