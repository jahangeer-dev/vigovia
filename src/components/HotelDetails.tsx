import React, { useState } from 'react';

interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  numberOfRooms: number;
  roomType: string;
  rating: number;
  amenities: string[];
  contactNumber: string;
  email: string;
  pricePerNight: number;
  currency: string;
  bookingReference: string;
  notes: string;
}

const HotelDetails: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: '1',
      name: '',
      address: '',
      city: '',
      checkInDate: '',
      checkOutDate: '',
      numberOfNights: 1,
      numberOfRooms: 1,
      roomType: '',
      rating: 5,
      amenities: [],
      contactNumber: '',
      email: '',
      pricePerNight: 0,
      currency: 'USD',
      bookingReference: '',
      notes: ''
    }
  ]);

  const [newAmenity, setNewAmenity] = useState<{ [key: string]: string }>({});

  const addHotel = () => {
    const newHotel: Hotel = {
      id: Date.now().toString(),
      name: '',
      address: '',
      city: '',
      checkInDate: '',
      checkOutDate: '',
      numberOfNights: 1,
      numberOfRooms: 1,
      roomType: '',
      rating: 5,
      amenities: [],
      contactNumber: '',
      email: '',
      pricePerNight: 0,
      currency: 'USD',
      bookingReference: '',
      notes: ''
    };
    setHotels([...hotels, newHotel]);
  };

  const removeHotel = (hotelId: string) => {
    if (hotels.length > 1) {
      setHotels(hotels.filter(hotel => hotel.id !== hotelId));
    }
  };

  const updateHotel = (hotelId: string, field: keyof Hotel, value: any) => {
    setHotels(prev =>
      prev.map(hotel =>
        hotel.id === hotelId ? { ...hotel, [field]: value } : hotel
      )
    );
  };

  const addAmenity = (hotelId: string) => {
    const amenityText = newAmenity[hotelId]?.trim();
    if (amenityText) {
      setHotels(prev =>
        prev.map(hotel =>
          hotel.id === hotelId
            ? { ...hotel, amenities: [...hotel.amenities, amenityText] }
            : hotel
        )
      );
      setNewAmenity(prev => ({ ...prev, [hotelId]: '' }));
    }
  };

  const removeAmenity = (hotelId: string, amenityIndex: number) => {
    setHotels(prev =>
      prev.map(hotel =>
        hotel.id === hotelId
          ? { ...hotel, amenities: hotel.amenities.filter((_, index) => index !== amenityIndex) }
          : hotel
      )
    );
  };

  const calculateNights = (checkIn: string, checkOut: string): number => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff > 0 ? daysDiff : 0;
    }
    return 0;
  };

  const handleDateChange = (hotelId: string, field: 'checkInDate' | 'checkOutDate', value: string) => {
    const updatedHotels = hotels.map(hotel => {
      if (hotel.id === hotelId) {
        const updatedHotel = { ...hotel, [field]: value };
        
        // Auto-calculate nights when both dates are available
        if (field === 'checkInDate' && hotel.checkOutDate) {
          updatedHotel.numberOfNights = calculateNights(value, hotel.checkOutDate);
        } else if (field === 'checkOutDate' && hotel.checkInDate) {
          updatedHotel.numberOfNights = calculateNights(hotel.checkInDate, value);
        }
        
        return updatedHotel;
      }
      return hotel;
    });
    
    setHotels(updatedHotels);
  };

  const commonAmenities = [
    'Free WiFi', 'Swimming Pool', 'Fitness Center', 'Spa', 'Restaurant', 
    'Bar/Lounge', 'Room Service', 'Concierge', 'Business Center', 'Parking',
    'Airport Shuttle', 'Laundry Service', 'Air Conditioning', 'Balcony',
    'City View', 'Ocean View', 'Pet Friendly', 'Non-Smoking Rooms'
  ];

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Hotel Details</h2>
            <p className="text-gray-600">Manage hotel bookings and accommodation details</p>
          </div>
          <button
            onClick={addHotel}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Hotel
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {hotels.map((hotel, index) => (
          <div key={hotel.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Hotel {index + 1}</h3>
              {hotels.length > 1 && (
                <button
                  onClick={() => removeHotel(hotel.id)}
                  className="px-3 py-1 text-red-600 border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove Hotel
                </button>
              )}
            </div>

            {/* Basic Hotel Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotel Name *
                </label>
                <input
                  type="text"
                  value={hotel.name}
                  onChange={(e) => updateHotel(hotel.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Marina Bay Sands"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={hotel.address}
                  onChange={(e) => updateHotel(hotel.id, 'address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 10 Bayfront Avenue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={hotel.city}
                  onChange={(e) => updateHotel(hotel.id, 'city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Singapore"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotel Rating
                </label>
                <select
                  value={hotel.rating}
                  onChange={(e) => updateHotel(hotel.id, 'rating', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={5}>5 Star</option>
                  <option value={4}>4 Star</option>
                  <option value={3}>3 Star</option>
                  <option value={2}>2 Star</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
            </div>

            {/* Booking Details */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    value={hotel.checkInDate}
                    onChange={(e) => handleDateChange(hotel.id, 'checkInDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    value={hotel.checkOutDate}
                    onChange={(e) => handleDateChange(hotel.id, 'checkOutDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Nights
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={hotel.numberOfNights}
                    onChange={(e) => updateHotel(hotel.id, 'numberOfNights', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-calculated from dates</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Rooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={hotel.numberOfRooms}
                    onChange={(e) => updateHotel(hotel.id, 'numberOfRooms', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type
                  </label>
                  <input
                    type="text"
                    value={hotel.roomType}
                    onChange={(e) => updateHotel(hotel.id, 'roomType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Deluxe Room, Suite, Standard Room"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Booking Reference
                  </label>
                  <input
                    type="text"
                    value={hotel.bookingReference}
                    onChange={(e) => updateHotel(hotel.id, 'bookingReference', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Booking confirmation number"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Pricing</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Night
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={hotel.pricePerNight}
                    onChange={(e) => updateHotel(hotel.id, 'pricePerNight', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={hotel.currency}
                    onChange={(e) => updateHotel(hotel.id, 'currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="SGD">SGD</option>
                    <option value="INR">INR</option>
                    <option value="AUD">AUD</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Cost
                  </label>
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700">
                    {hotel.currency} {(hotel.pricePerNight * hotel.numberOfNights * hotel.numberOfRooms).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={hotel.contactNumber}
                    onChange={(e) => updateHotel(hotel.id, 'contactNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+65 6688 8888"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={hotel.email}
                    onChange={(e) => updateHotel(hotel.id, 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="reservations@hotel.com"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Hotel Amenities</h4>
              
              {/* Quick Add Buttons */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Quick add common amenities:</p>
                <div className="flex flex-wrap gap-2">
                  {commonAmenities.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => {
                        if (!hotel.amenities.includes(amenity)) {
                          updateHotel(hotel.id, 'amenities', [...hotel.amenities, amenity]);
                        }
                      }}
                      disabled={hotel.amenities.includes(amenity)}
                      className={`px-3 py-1 text-sm rounded-md border ${
                        hotel.amenities.includes(amenity)
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amenity Input */}
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={newAmenity[hotel.id] || ''}
                  onChange={(e) => setNewAmenity(prev => ({ ...prev, [hotel.id]: e.target.value }))}
                  placeholder="Add custom amenity"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && addAmenity(hotel.id)}
                />
                <button
                  onClick={() => addAmenity(hotel.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>

              {/* Current Amenities */}
              {hotel.amenities.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
                      >
                        {amenity}
                        <button
                          onClick={() => removeAmenity(hotel.id, index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={hotel.notes}
                onChange={(e) => updateHotel(hotel.id, 'notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Special requests, important information, etc."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDetails;
