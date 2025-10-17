# Daily Itinerary Structure - Implementation Summary

## ✅ COMPLETED: All Components Aligned with Reference Image

### Reference Image Design
Based on the provided reference image, the daily itinerary has the following structure:

#### Left Side:
- **Day Badge**: Vertical text showing "Day 1" in a purple rounded pill
- **Circular Image**: Round image placeholder (180x180px) with gradient background
- **Date**: Below the image (e.g., "27th November")
- **Title**: Day title (e.g., "Arrival in Singapore & City Exploration")

#### Right Side (Timeline):
- **Vertical Blue Line**: Connecting all timeline items
- **Timeline Sections**: Three periods with circular dots:
  - **Morning**: List of activities with bullet points
  - **Afternoon**: List of activities with bullet points
  - **Evening**: List of activities with bullet points

---

## Implementation Details

### 1. Store Structure ✅
**File**: `/src/store/itineraryStore.ts`

```typescript
export interface TimelineItem {
  id: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  activities: string[]; // Simple array of activity descriptions
}

export interface DayItinerary {
  id: string;
  dayNumber: number;
  date: string;
  title: string; // e.g., "Arrival in Singapore & City Exploration"
  city: string;
  imageUrl?: string; // Optional image URL for the circular image
  timeline: TimelineItem[]; // Morning, Afternoon, Evening activities
}
```

**Key Features**:
- ✅ Simplified data structure (removed complex Activity/Transportation/meals objects)
- ✅ Timeline array with Morning/Afternoon/Evening periods
- ✅ Simple string arrays for activities
- ✅ Image URL field for circular day image
- ✅ Date and title fields for display below image

---

### 2. Form Page (DailyItinerary.tsx) ✅
**File**: `/src/pages/DailyItinerary.tsx`

**Form Fields**:
- Date input
- Title input (day description)
- City input
- Image URL input (optional)

**Timeline Sections**:
- Three collapsible sections (Morning, Afternoon, Evening)
- Each section allows adding/editing/removing simple text activities
- Clean bullet-point style for activities

**Helper Functions**:
- `addActivityToTimeline(dayId, period)` - Add new activity to a period
- `updateActivityInTimeline(dayId, period, index, value)` - Update activity text
- `removeActivityFromTimeline(dayId, period, index)` - Remove an activity

---

### 3. PDF Content Component ✅
**File**: `/src/components/PDFContent.tsx`

**Left Panel Design**:
```tsx
<div className='flex flex-col items-center min-w-[180px]'>
  {/* Day Badge - Purple circle with rotated text */}
  <div className='bg-purple-700 text-white rounded-full w-16 h-16'>
    <span className='transform -rotate-90'>Day {day.dayNumber}</span>
  </div>
  
  {/* Circular Image - 160x160px with gradient background */}
  <div className='w-40 h-40 rounded-full overflow-hidden bg-gradient-to-br from-blue-200 to-purple-200'>
    {day.imageUrl ? (
      <img src={day.imageUrl} alt={day.title} />
    ) : (
      <MdLocationOn className='text-6xl text-white' />
    )}
  </div>
  
  {/* Date and Title */}
  <div className='text-center mt-4'>
    <p className='font-bold'>{day.date}</p>
    <p className='text-xs'>{day.title}</p>
  </div>
</div>
```

**Right Panel Design (Timeline)**:
```tsx
<div className='flex-1 relative'>
  {/* Vertical Blue Line */}
  <div className='absolute left-0 top-0 bottom-0 w-1 bg-blue-300'></div>
  
  {/* Timeline Items */}
  {day.timeline.map((timeSlot) => (
    <div className='relative'>
      {/* Blue Dot on Timeline */}
      <div className='absolute -left-8 top-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white'></div>
      
      {/* Period Title (Morning/Afternoon/Evening) */}
      <h4 className='font-bold'>{timeSlot.period}</h4>
      
      {/* Activity List */}
      <ul>
        {timeSlot.activities.map((activity) => (
          <li>• {activity}</li>
        ))}
      </ul>
    </div>
  ))}
</div>
```

---

## Data Flow

```
User Input (Form) 
    ↓
Zustand Store (itineraryStore.ts)
    ↓
PDF Content Component
    ↓
html2canvas-pro + jsPDF
    ↓
Downloaded PDF
```

---

## Example Data Structure

```json
{
  "id": "1234567890",
  "dayNumber": 1,
  "date": "27th November",
  "title": "Arrival in Singapore & City Exploration",
  "city": "Singapore",
  "imageUrl": "https://example.com/singapore-beach.jpg",
  "timeline": [
    {
      "id": "morning-1",
      "period": "Morning",
      "activities": [
        "Arrive In Singapore. Transfer From Airport To Hotel."
      ]
    },
    {
      "id": "afternoon-1",
      "period": "Afternoon",
      "activities": [
        "Check Into Your Hotel.",
        "Visit Marina Bay Sands Sky Park (2-3 Hours).",
        "Optional: Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge."
      ]
    },
    {
      "id": "evening-1",
      "period": "Evening",
      "activities": [
        "Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)"
      ]
    }
  ]
}
```

---

## ✅ Status: COMPLETE

All three components (Store, Form Page, PDF Content) are now fully aligned with the reference image design:

1. ✅ **Store Structure**: Simplified to TimelineItem with period + activities array
2. ✅ **Form Page**: Clean input form with timeline sections for Morning/Afternoon/Evening
3. ✅ **PDF Content**: Matches image design with left panel (day badge, circular image, date/title) and right panel (vertical timeline with dots and activity lists)

---

## Testing Checklist

- ✅ Add a new day in the form
- ✅ Enter date, title, city, and optional image URL
- ✅ Add activities to Morning section
- ✅ Add activities to Afternoon section
- ✅ Add activities to Evening section
- ✅ Preview PDF - should match reference image layout
- ✅ Download PDF - verify timeline design is correct
- ✅ Check that data persists in Zustand store
- ✅ Verify no compilation errors

---

## Notes

- The design uses Tailwind CSS for styling
- Purple color (#7C3AED / purple-700) for day badge
- Blue color (#60A5FA / blue-300) for timeline line
- Blue dots (#3B82F6 / blue-500) for timeline markers
- Circular images with gradient fallback if no URL provided
- Activities displayed as bullet-pointed lists (• character)
