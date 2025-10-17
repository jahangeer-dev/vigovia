import React from 'react';
import { useItineraryStore } from '../store/itineraryStore';

const DailyItinerary: React.FC = () => {
  const { 
    dailyItinerary,
    setDailyItinerary,
    addDay,
    removeDay,
    updateDay,
    activitiesData,
    addActivity,
    removeActivity,
    updateActivity
  } = useItineraryStore();

  // Ensure all days have timeline initialized
  React.useEffect(() => {
    const needsUpdate = dailyItinerary.some(day => !day.timeline || day.timeline.length === 0);
    if (needsUpdate) {
      const updatedItinerary = dailyItinerary.map(day => {
        if (!day.timeline || day.timeline.length === 0) {
          return {
            ...day,
            timeline: [
              { id: `${day.id}-morning`, period: 'Morning' as const, activities: [] },
              { id: `${day.id}-afternoon`, period: 'Afternoon' as const, activities: [] },
              { id: `${day.id}-evening`, period: 'Evening' as const, activities: [] }
            ]
          };
        }
        return day;
      });
      setDailyItinerary(updatedItinerary);
    }
  }, [dailyItinerary, setDailyItinerary]);

  const addActivityToTimeline = (dayId: string, period: 'Morning' | 'Afternoon' | 'Evening') => {
    const updatedItinerary = dailyItinerary.map(day => {
      if (day.id === dayId) {
        const updatedTimeline = day.timeline.map(slot => {
          if (slot.period === period) {
            return { ...slot, activities: [...slot.activities, ''] };
          }
          return slot;
        });
        return { ...day, timeline: updatedTimeline };
      }
      return day;
    });
    setDailyItinerary(updatedItinerary);
  };

  const updateActivityInTimeline = (dayId: string, period: 'Morning' | 'Afternoon' | 'Evening', index: number, value: string) => {
    const updatedItinerary = dailyItinerary.map(day => {
      if (day.id === dayId) {
        const updatedTimeline = day.timeline.map(slot => {
          if (slot.period === period) {
            const updatedActivities = [...slot.activities];
            updatedActivities[index] = value;
            return { ...slot, activities: updatedActivities };
          }
          return slot;
        });
        return { ...day, timeline: updatedTimeline };
      }
      return day;
    });
    setDailyItinerary(updatedItinerary);
  };

  const removeActivityFromTimeline = (dayId: string, period: 'Morning' | 'Afternoon' | 'Evening', index: number) => {
    const updatedItinerary = dailyItinerary.map(day => {
      if (day.id === dayId) {
        const updatedTimeline = day.timeline.map(slot => {
          if (slot.period === period) {
            const updatedActivities = slot.activities.filter((_, i) => i !== index);
            return { ...slot, activities: updatedActivities };
          }
          return slot;
        });
        return { ...day, timeline: updatedTimeline };
      }
      return day;
    });
    setDailyItinerary(updatedItinerary);
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
        {dailyItinerary.map((day) => (
          <div key={day.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Day {day.dayNumber}</h3>
              {dailyItinerary.length > 1 && (
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
                  onChange={(e) => updateDay(day.id, { date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={day.title}
                  onChange={(e) => updateDay(day.id, { title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Arrival in Singapore & City Exploration"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={day.city}
                  onChange={(e) => updateDay(day.id, { city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Singapore"
                />
              </div>
            </div>

            {/* Timeline Sections */}
            <div className="space-y-6">
              {day.timeline && day.timeline.map((timeSlot) => (
                <div key={timeSlot.id} className="bg-white p-4 rounded-md border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-medium text-gray-900">{timeSlot.period}</h4>
                    <button
                      onClick={() => addActivityToTimeline(day.id, timeSlot.period)}
                      className="px-3 py-1 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      + Add Activity
                    </button>
                  </div>
                  <div className="space-y-2">
                    {timeSlot.activities.map((activity, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <span className="text-gray-600">•</span>
                        <input
                          type="text"
                          value={activity}
                          onChange={(e) => updateActivityInTimeline(day.id, timeSlot.period, index, e.target.value)}
                          placeholder={`Enter ${timeSlot.period.toLowerCase()} activity`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => removeActivityFromTimeline(day.id, timeSlot.period, index)}
                          className="px-3 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    {timeSlot.activities.length === 0 && (
                      <p className="text-gray-400 text-sm">No activities added for {timeSlot.period.toLowerCase()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Activity Table Section */}
      <div className="mt-12 pt-8 border-t-2 border-gray-300">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Activity Table</h2>
              <p className="text-gray-600">Manage all activities with their city, type, and time required</p>
            </div>
            <button
              onClick={addActivity}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              + Add Activity
            </button>
          </div>
        </div>

        {/* Activity Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Time Required</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activitiesData.activities.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No activities added yet. Click "Add Activity" to get started.
                    </td>
                  </tr>
                ) : (
                  activitiesData.activities.map((activity, index) => (
                    <tr key={activity.id} className={index % 2 === 0 ? 'bg-[#F9EEFF]' : 'bg-white'}>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={activity.city}
                          onChange={(e) => updateActivity(activity.id, { city: e.target.value })}
                          placeholder="e.g., Rio De Janeiro"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={activity.activity}
                          onChange={(e) => updateActivity(activity.id, { activity: e.target.value })}
                          placeholder="e.g., Sydney Harbour Cruise & Taronga Zoo"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={activity.type}
                          onChange={(e) => updateActivity(activity.id, { type: e.target.value })}
                          placeholder="e.g., Nature/Sightseeing"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={activity.timeRequired}
                          onChange={(e) => updateActivity(activity.id, { timeRequired: e.target.value })}
                          placeholder="e.g., 2-3 Hours"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeActivity(activity.id)}
                          className="px-3 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Add Presets */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Quick add common activity types:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                addActivity();
                const newId = Date.now().toString();
                setTimeout(() => {
                  updateActivity(newId, { 
                    type: 'Nature/Sightseeing',
                    timeRequired: '2-3 Hours'
                  });
                }, 0);
              }}
              className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
            >
              + Nature/Sightseeing
            </button>
            <button
              onClick={() => {
                addActivity();
                const newId = Date.now().toString();
                setTimeout(() => {
                  updateActivity(newId, { 
                    type: 'Airlines Standard',
                    timeRequired: '2-3 Hours'
                  });
                }, 0);
              }}
              className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
            >
              + Airlines Standard
            </button>
            <button
              onClick={() => {
                addActivity();
                const newId = Date.now().toString();
                setTimeout(() => {
                  updateActivity(newId, { 
                    type: 'Cultural Tour',
                    timeRequired: '3-4 Hours'
                  });
                }, 0);
              }}
              className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
            >
              + Cultural Tour
            </button>
          </div>
        </div>

        {/* Summary */}
        {activitiesData.activities.length > 0 && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700">Total Activities</p>
                <p className="text-2xl font-bold text-purple-600">{activitiesData.activities.length}</p>
              </div>
              <div className="text-sm text-gray-600">
                <p>These activities will appear in the Activity Table section of your PDF itinerary.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyItinerary;
