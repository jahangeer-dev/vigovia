import React, { useState } from 'react';

interface Activity {
  id: string;
  time: string;
  type: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  description: string;
  location: string;
}

interface Transportation {
  id: string;
  type: 'Flight' | 'Transfer' | 'Train' | 'Bus' | 'Car';
  from: string;
  to: string;
  time: string;
  details: string;
}

interface DayItinerary {
  id: string;
  dayNumber: number;
  date: string;
  city: string;
  activities: Activity[];
  transportation: Transportation[];
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  accommodation: string;
}

const DailyItinerary: React.FC = () => {
  const [itinerary, setItinerary] = useState<DayItinerary[]>([
    {
      id: '1',
      dayNumber: 1,
      date: '',
      city: '',
      activities: [],
      transportation: [],
      meals: {
        breakfast: '',
        lunch: '',
        dinner: ''
      },
      accommodation: ''
    }
  ]);

  const addDay = () => {
    const newDay: DayItinerary = {
      id: Date.now().toString(),
      dayNumber: itinerary.length + 1,
      date: '',
      city: '',
      activities: [],
      transportation: [],
      meals: {
        breakfast: '',
        lunch: '',
        dinner: ''
      },
      accommodation: ''
    };
    setItinerary([...itinerary, newDay]);
  };

  const removeDay = (dayId: string) => {
    if (itinerary.length > 1) {
      const updatedItinerary = itinerary
        .filter(day => day.id !== dayId)
        .map((day, index) => ({ ...day, dayNumber: index + 1 }));
      setItinerary(updatedItinerary);
    }
  };

  const updateDay = (dayId: string, field: keyof DayItinerary, value: any) => {
    setItinerary(prev =>
      prev.map(day =>
        day.id === dayId ? { ...day, [field]: value } : day
      )
    );
  };

  const addActivity = (dayId: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      time: '',
      type: 'Morning',
      title: '',
      description: '',
      location: ''
    };
    
    setItinerary(prev =>
      prev.map(day =>
        day.id === dayId
          ? { ...day, activities: [...day.activities, newActivity] }
          : day
      )
    );
  };

  const updateActivity = (dayId: string, activityId: string, field: keyof Activity, value: any) => {
    setItinerary(prev =>
      prev.map(day =>
        day.id === dayId
          ? {
              ...day,
              activities: day.activities.map(activity =>
                activity.id === activityId ? { ...activity, [field]: value } : activity
              )
            }
          : day
      )
    );
  };

  const removeActivity = (dayId: string, activityId: string) => {
    setItinerary(prev =>
      prev.map(day =>
        day.id === dayId
          ? { ...day, activities: day.activities.filter(activity => activity.id !== activityId) }
          : day
      )
    );
  };

  const addTransportation = (dayId: string) => {
    const newTransportation: Transportation = {
      id: Date.now().toString(),
      type: 'Flight',
      from: '',
      to: '',
      time: '',
      details: ''
    };
    
    setItinerary(prev =>
      prev.map(day =>
        day.id === dayId
          ? { ...day, transportation: [...day.transportation, newTransportation] }
          : day
      )
    );
  };

  const updateTransportation = (dayId: string, transportId: string, field: keyof Transportation, value: any) => {
    setItinerary(prev =>
      prev.map(day =>
        day.id === dayId
          ? {
              ...day,
              transportation: day.transportation.map(transport =>
                transport.id === transportId ? { ...transport, [field]: value } : transport
              )
            }
          : day
      )
    );
  };

  const removeTransportation = (dayId: string, transportId: string) => {
    setItinerary(prev =>
      prev.map(day =>
        day.id === dayId
          ? { ...day, transportation: day.transportation.filter(transport => transport.id !== transportId) }
          : day
      )
    );
  };

  const updateMeal = (dayId: string, mealType: keyof DayItinerary['meals'], value: string) => {
    setItinerary(prev =>
      prev.map(day =>
        day.id === dayId
          ? { ...day, meals: { ...day.meals, [mealType]: value } }
          : day
      )
    );
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Daily Itinerary</h2>
            <p className="text-gray-600">Plan your day-by-day activities, transportation, and meals</p>
          </div>
          <button
            onClick={addDay}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Day
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {itinerary.map((day) => (
          <div key={day.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Day {day.dayNumber}</h3>
              {itinerary.length > 1 && (
                <button
                  onClick={() => removeDay(day.id)}
                  className="px-3 py-1 text-red-600 border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove Day
                </button>
              )}
            </div>

            {/* Day Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={day.date}
                  onChange={(e) => updateDay(day.id, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={day.city}
                  onChange={(e) => updateDay(day.id, 'city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Singapore"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation</label>
                <input
                  type="text"
                  value={day.accommodation}
                  onChange={(e) => updateDay(day.id, 'accommodation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Hotel name"
                />
              </div>
            </div>

            {/* Transportation Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-medium text-gray-900">Transportation</h4>
                <button
                  onClick={() => addTransportation(day.id)}
                  className="px-3 py-1 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  + Add Transport
                </button>
              </div>
              <div className="space-y-3">
                {day.transportation.map((transport) => (
                  <div key={transport.id} className="bg-white p-4 rounded-md border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
                      <select
                        value={transport.type}
                        onChange={(e) => updateTransportation(day.id, transport.id, 'type', e.target.value as Transportation['type'])}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Flight">Flight</option>
                        <option value="Transfer">Transfer</option>
                        <option value="Train">Train</option>
                        <option value="Bus">Bus</option>
                        <option value="Car">Car</option>
                      </select>
                      <input
                        type="text"
                        value={transport.from}
                        onChange={(e) => updateTransportation(day.id, transport.id, 'from', e.target.value)}
                        placeholder="From"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={transport.to}
                        onChange={(e) => updateTransportation(day.id, transport.id, 'to', e.target.value)}
                        placeholder="To"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="time"
                        value={transport.time}
                        onChange={(e) => updateTransportation(day.id, transport.id, 'time', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeTransportation(day.id, transport.id)}
                        className="px-3 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={transport.details}
                      onChange={(e) => updateTransportation(day.id, transport.id, 'details', e.target.value)}
                      placeholder="Additional details (flight number, booking reference, etc.)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Activities Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-medium text-gray-900">Activities & Sightseeing</h4>
                <button
                  onClick={() => addActivity(day.id)}
                  className="px-3 py-1 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  + Add Activity
                </button>
              </div>
              <div className="space-y-3">
                {day.activities.map((activity) => (
                  <div key={activity.id} className="bg-white p-4 rounded-md border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                      <select
                        value={activity.type}
                        onChange={(e) => updateActivity(day.id, activity.id, 'type', e.target.value as Activity['type'])}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                      <input
                        type="time"
                        value={activity.time}
                        onChange={(e) => updateActivity(day.id, activity.id, 'time', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={activity.location}
                        onChange={(e) => updateActivity(day.id, activity.id, 'location', e.target.value)}
                        placeholder="Location"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeActivity(day.id, activity.id)}
                        className="px-3 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={activity.title}
                      onChange={(e) => updateActivity(day.id, activity.id, 'title', e.target.value)}
                      placeholder="Activity title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      value={activity.description}
                      onChange={(e) => updateActivity(day.id, activity.id, 'description', e.target.value)}
                      placeholder="Activity description"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Meals Section */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Meals</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Breakfast</label>
                  <input
                    type="text"
                    value={day.meals.breakfast}
                    onChange={(e) => updateMeal(day.id, 'breakfast', e.target.value)}
                    placeholder="e.g., Hotel breakfast"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lunch</label>
                  <input
                    type="text"
                    value={day.meals.lunch}
                    onChange={(e) => updateMeal(day.id, 'lunch', e.target.value)}
                    placeholder="e.g., Local cuisine"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dinner</label>
                  <input
                    type="text"
                    value={day.meals.dinner}
                    onChange={(e) => updateMeal(day.id, 'dinner', e.target.value)}
                    placeholder="e.g., Marina Bay restaurant"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyItinerary;
