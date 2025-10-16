import React, { useState } from 'react';

interface Inclusion {
  id: string;
  category: string;
  details: string;
  icon?: string;
}

interface Exclusion {
  id: string;
  details: string;
  category?: string;
}

interface ImportantNote {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'important';
}

const InclusionsExclusions: React.FC = () => {
  const [inclusions, setInclusions] = useState<Inclusion[]>([
    {
      id: '1',
      category: '',
      details: '',
      icon: '✈️'
    }
  ]);

  const [exclusions, setExclusions] = useState<Exclusion[]>([
    {
      id: '1',
      details: '',
      category: ''
    }
  ]);

  const [importantNotes, setImportantNotes] = useState<ImportantNote[]>([]);

  // Predefined common inclusions
  const commonInclusions = [
    { category: 'Flights', details: 'Round-trip flights as per itinerary', icon: '✈️' },
    { category: 'Accommodation', details: 'Hotel accommodation as mentioned', icon: '🏨' },
    { category: 'Meals', details: 'Breakfast at hotel', icon: '🍽️' },
    { category: 'Transportation', details: 'Airport transfers', icon: '🚐' },
    { category: 'Sightseeing', details: 'Guided city tours', icon: '🎯' },
    { category: 'Activities', details: 'Entrance fees to mentioned attractions', icon: '🎪' },
    { category: 'Guide', details: 'Professional tour guide', icon: '👨‍💼' },
    { category: 'Insurance', details: 'Travel insurance', icon: '🛡️' }
  ];

  // Predefined common exclusions
  const commonExclusions = [
    'Visa fees and passport charges',
    'Personal expenses and shopping',
    'Tips and gratuities',
    'Travel insurance (unless specified)',
    'Meals not mentioned in inclusions',
    'Optional tours and activities',
    'Excess baggage charges',
    'Any services not mentioned in inclusions',
    'Medical expenses and emergency costs',
    'Flight delays or cancellation charges'
  ];

  // Inclusion functions
  const addInclusion = () => {
    const newInclusion: Inclusion = {
      id: Date.now().toString(),
      category: '',
      details: '',
      icon: '📋'
    };
    setInclusions([...inclusions, newInclusion]);
  };

  const removeInclusion = (id: string) => {
    setInclusions(inclusions.filter(inclusion => inclusion.id !== id));
  };

  const updateInclusion = (id: string, field: keyof Inclusion, value: string) => {
    setInclusions(inclusions.map(inclusion =>
      inclusion.id === id ? { ...inclusion, [field]: value } : inclusion
    ));
  };

  const addCommonInclusion = (commonInclusion: typeof commonInclusions[0]) => {
    const newInclusion: Inclusion = {
      id: Date.now().toString(),
      category: commonInclusion.category,
      details: commonInclusion.details,
      icon: commonInclusion.icon
    };
    setInclusions([...inclusions, newInclusion]);
  };

  // Exclusion functions
  const addExclusion = () => {
    const newExclusion: Exclusion = {
      id: Date.now().toString(),
      details: '',
      category: ''
    };
    setExclusions([...exclusions, newExclusion]);
  };

  const removeExclusion = (id: string) => {
    setExclusions(exclusions.filter(exclusion => exclusion.id !== id));
  };

  const updateExclusion = (id: string, field: keyof Exclusion, value: string) => {
    setExclusions(exclusions.map(exclusion =>
      exclusion.id === id ? { ...exclusion, [field]: value } : exclusion
    ));
  };

  const addCommonExclusion = (exclusionText: string) => {
    const newExclusion: Exclusion = {
      id: Date.now().toString(),
      details: exclusionText,
      category: ''
    };
    setExclusions([...exclusions, newExclusion]);
  };

  // Important Notes functions
  const addImportantNote = () => {
    const newNote: ImportantNote = {
      id: Date.now().toString(),
      title: '',
      description: '',
      type: 'info'
    };
    setImportantNotes([...importantNotes, newNote]);
  };

  const removeImportantNote = (id: string) => {
    setImportantNotes(importantNotes.filter(note => note.id !== id));
  };

  const updateImportantNote = (id: string, field: keyof ImportantNote, value: string) => {
    setImportantNotes(importantNotes.map(note =>
      note.id === id ? { ...note, [field]: value } : note
    ));
  };

  const getTypeColor = (type: ImportantNote['type']) => {
    switch (type) {
      case 'warning': return 'border-yellow-300 bg-yellow-50';
      case 'important': return 'border-red-300 bg-red-50';
      default: return 'border-blue-300 bg-blue-50';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inclusions & Exclusions</h2>
        <p className="text-gray-600">Define what's included and excluded in your tour package</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inclusions Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <span className="text-green-600">✅</span>
              Inclusions
            </h3>
            <button
              onClick={addInclusion}
              className="px-3 py-1 text-green-600 border border-green-300 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              + Add
            </button>
          </div>

          {/* Quick Add Common Inclusions */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Quick add common inclusions:</p>
            <div className="grid grid-cols-2 gap-2">
              {commonInclusions.map((inclusion, index) => (
                <button
                  key={index}
                  onClick={() => addCommonInclusion(inclusion)}
                  className="text-left px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {inclusion.icon} {inclusion.category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {inclusions.map((inclusion) => (
              <div key={inclusion.id} className="p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="grid grid-cols-12 gap-2 mb-2">
                  <div className="col-span-1">
                    <input
                      type="text"
                      value={inclusion.icon || ''}
                      onChange={(e) => updateInclusion(inclusion.id, 'icon', e.target.value)}
                      className="w-full px-2 py-1 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="📋"
                    />
                  </div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={inclusion.category}
                      onChange={(e) => updateInclusion(inclusion.id, 'category', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Category"
                    />
                  </div>
                  <div className="col-span-6">
                    <input
                      type="text"
                      value={inclusion.details}
                      onChange={(e) => updateInclusion(inclusion.id, 'details', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Details"
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => removeInclusion(inclusion.id)}
                      className="w-full px-2 py-1 text-red-600 border border-red-300 rounded hover:bg-red-50"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <span className="text-red-600">❌</span>
              Exclusions
            </h3>
            <button
              onClick={addExclusion}
              className="px-3 py-1 text-red-600 border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              + Add
            </button>
          </div>

          {/* Quick Add Common Exclusions */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Quick add common exclusions:</p>
            <div className="space-y-1">
              {commonExclusions.slice(0, 5).map((exclusion, index) => (
                <button
                  key={index}
                  onClick={() => addCommonExclusion(exclusion)}
                  className="block w-full text-left px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 truncate"
                  title={exclusion}
                >
                  {exclusion}
                </button>
              ))}
              <details className="text-xs">
                <summary className="cursor-pointer text-blue-600 hover:text-blue-800">Show more...</summary>
                <div className="mt-1 space-y-1">
                  {commonExclusions.slice(5).map((exclusion, index) => (
                    <button
                      key={index + 5}
                      onClick={() => addCommonExclusion(exclusion)}
                      className="block w-full text-left px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {exclusion}
                    </button>
                  ))}
                </div>
              </details>
            </div>
          </div>

          <div className="space-y-3">
            {exclusions.map((exclusion) => (
              <div key={exclusion.id} className="p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="grid grid-cols-12 gap-2 mb-2">
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={exclusion.category || ''}
                      onChange={(e) => updateExclusion(exclusion.id, 'category', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Category (optional)"
                    />
                  </div>
                  <div className="col-span-8">
                    <input
                      type="text"
                      value={exclusion.details}
                      onChange={(e) => updateExclusion(exclusion.id, 'details', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Exclusion details"
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => removeExclusion(exclusion.id)}
                      className="w-full px-2 py-1 text-red-600 border border-red-300 rounded hover:bg-red-50"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Notes Section */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <span className="text-blue-600">ℹ️</span>
            Important Notes & Terms
          </h3>
          <button
            onClick={addImportantNote}
            className="px-3 py-1 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Note
          </button>
        </div>

        {importantNotes.length === 0 ? (
          <p className="text-gray-500 italic">No important notes added yet.</p>
        ) : (
          <div className="space-y-4">
            {importantNotes.map((note) => (
              <div key={note.id} className={`p-4 border rounded-md ${getTypeColor(note.type)}`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                  <select
                    value={note.type}
                    onChange={(e) => updateImportantNote(note.id, 'type', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="important">Important</option>
                  </select>
                  <input
                    type="text"
                    value={note.title}
                    onChange={(e) => updateImportantNote(note.id, 'title', e.target.value)}
                    className="md:col-span-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Note title"
                  />
                  <button
                    onClick={() => removeImportantNote(note.id)}
                    className="px-3 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  value={note.description}
                  onChange={(e) => updateImportantNote(note.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Note description..."
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{inclusions.length}</div>
            <div className="text-sm text-green-600">Inclusions</div>
          </div>
          <div className="p-4 bg-red-100 rounded-lg">
            <div className="text-2xl font-bold text-red-700">{exclusions.length}</div>
            <div className="text-sm text-red-600">Exclusions</div>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{importantNotes.length}</div>
            <div className="text-sm text-blue-600">Important Notes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InclusionsExclusions;
