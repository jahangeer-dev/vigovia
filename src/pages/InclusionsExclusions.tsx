import React from 'react';
import { useItineraryStore } from '../store/itineraryStore';
import type { Inclusion } from '../store/itineraryStore';

const InclusionsExclusions: React.FC = () => {
  const { inclusionsExclusions, setInclusionsExclusions } = useItineraryStore();
  const { inclusions, transferPolicy } = inclusionsExclusions;

  // Predefined common inclusions
  const commonInclusions = [
    { category: 'Flight', count: 2, details: 'All Flights Mentioned', statusComments: 'Awaiting Confirmation' },
    { category: 'Tourist Tax', count: 2, details: 'All Hotels Tourist Tax', statusComments: 'Awaiting Confirmation' },
    { category: 'Hotel', count: 2, details: 'Airport To Hotel - Hotel To Attractions - Day Trips If Any', statusComments: 'Included' },
    { category: 'Transfers', count: 1, details: 'Private Transfers', statusComments: 'Included' },
    { category: 'Activities', count: 3, details: 'Guided Tours & Activities', statusComments: 'Included' }
  ];

  // Inclusion functions
  const addInclusion = () => {
    const newInclusion: Inclusion = {
      id: Date.now().toString(),
      category: '',
      count: 0,
      details: '',
      statusComments: ''
    };
    setInclusionsExclusions({
      inclusions: [...inclusions, newInclusion]
    });
  };

  const removeInclusion = (id: string) => {
    setInclusionsExclusions({
      inclusions: inclusions.filter(inclusion => inclusion.id !== id)
    });
  };

  const updateInclusion = (id: string, field: keyof Inclusion, value: string | number) => {
    setInclusionsExclusions({
      inclusions: inclusions.map(inclusion =>
        inclusion.id === id ? { ...inclusion, [field]: value } : inclusion
      )
    });
  };

  const addCommonInclusion = (commonInclusion: typeof commonInclusions[0]) => {
    const newInclusion: Inclusion = {
      id: Date.now().toString(),
      category: commonInclusion.category,
      count: commonInclusion.count,
      details: commonInclusion.details,
      statusComments: commonInclusion.statusComments
    };
    setInclusionsExclusions({
      inclusions: [...inclusions, newInclusion]
    });
  };

  const updateTransferPolicy = (value: string) => {
    setInclusionsExclusions({
      transferPolicy: value
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inclusion Summary</h2>
        <p className="text-gray-600">Define what's included in your tour package</p>
      </div>

      {/* Inclusions Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <span className="text-purple-600">📋</span>
            Inclusions
          </h3>
          <button
            onClick={addInclusion}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            + Add Inclusion
          </button>
        </div>

        {/* Quick Add Common Inclusions */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-3">Quick add common inclusions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {commonInclusions.map((inclusion, index) => (
              <button
                key={index}
                onClick={() => addCommonInclusion(inclusion)}
                className="text-left px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-purple-50 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <div className="font-medium text-gray-900">{inclusion.category}</div>
                <div className="text-xs text-gray-600">Count: {inclusion.count}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Inclusion Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-900 text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold rounded-tl-lg">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Count</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Details</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status / Comments</th>
                <th className="px-4 py-3 text-center text-sm font-semibold rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inclusions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500 italic">
                    No inclusions added yet. Click "Add Inclusion" or use quick add buttons above.
                  </td>
                </tr>
              ) : (
                inclusions.map((inclusion) => (
                  <tr key={inclusion.id} className="border-b border-gray-200 hover:bg-purple-50">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={inclusion.category}
                        onChange={(e) => updateInclusion(inclusion.id, 'category', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Flight, Hotel"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={inclusion.count}
                        onChange={(e) => updateInclusion(inclusion.id, 'count', parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="0"
                        min="0"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={inclusion.details}
                        onChange={(e) => updateInclusion(inclusion.id, 'details', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Details"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={inclusion.statusComments}
                        onChange={(e) => updateInclusion(inclusion.id, 'statusComments', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Status or comments"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeInclusion(inclusion.id)}
                        className="px-3 py-1 text-red-600 border border-red-300 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
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

      {/* Transfer Policy Section */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-2">
            <span className="text-purple-600">📝</span>
            Transfer Policy (Refundable Upon Claim)
          </h3>
          <p className="text-sm text-gray-600">Define the policy for delayed transfers</p>
        </div>

        <textarea
          value={transferPolicy}
          onChange={(e) => updateTransferPolicy(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter transfer policy details..."
        />
      </div>

      {/* Summary */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600">{inclusions.length}</div>
            <div className="text-sm text-gray-600 mt-1">Total Inclusions</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600">
              {inclusions.reduce((sum, inc) => sum + inc.count, 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Items Count</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InclusionsExclusions;
