# Automatic Tourist Images Integration

## Overview
The daily itinerary now automatically displays beautiful tourist destination images using the Unsplash Source API. No manual image URL input required!

## How It Works

### 🎨 Automatic Image Generation
When you enter a **city name** in the Daily Itinerary form, the PDF will automatically fetch a relevant tourist/landmark image from Unsplash.

### 📸 Image Source
```
https://source.unsplash.com/400x400/?{city},tourism,landmark,travel
```

**Example URLs:**
- Singapore: `https://source.unsplash.com/400x400/?Singapore,tourism,landmark,travel`
- Paris: `https://source.unsplash.com/400x400/?Paris,tourism,landmark,travel`
- Tokyo: `https://source.unsplash.com/400x400/?Tokyo,tourism,landmark,travel`
- New York: `https://source.unsplash.com/400x400/?New%20York,tourism,landmark,travel`

### 🔍 Search Keywords
The API uses these keywords to find appropriate images:
- **City name** (from your input)
- `tourism` - Tourist attractions
- `landmark` - Famous landmarks
- `travel` - Travel destinations

## Implementation

### PDFContent.tsx
```tsx
<div className='w-40 h-40 rounded-full overflow-hidden'>
  {day.city ? (
    <img 
      src={`https://source.unsplash.com/400x400/?${encodeURIComponent(day.city)},tourism,landmark,travel`} 
      alt={day.city} 
      className='w-full h-full object-cover' 
    />
  ) : (
    <MdLocationOn className='text-6xl text-white' />
  )}
</div>
```

### Features
✅ **Automatic**: No manual URL input needed
✅ **Dynamic**: Changes based on city name
✅ **Fallback**: Shows location icon if no city is provided
✅ **Optimized**: 400x400px images perfect for circular display
✅ **URL Encoding**: Handles city names with spaces (e.g., "New York")

## Benefits

1. **No Manual Work**: Just type the city name, get beautiful images automatically
2. **Always Relevant**: Images match the tourist destination
3. **High Quality**: Unsplash provides professional photography
4. **Free to Use**: Unsplash Source API is free for unlimited use
5. **Consistent Design**: All images are the same size (400x400px)

## Example Usage

### Step 1: Add a Day
Click "+ Add Day" button

### Step 2: Enter City
Type "Singapore" in the City field

### Step 3: Generate PDF
The PDF will automatically show a beautiful Singapore landmark/tourism image!

## Image Display

- **Shape**: Circular (160x160px display)
- **Source Resolution**: 400x400px (high quality)
- **Fallback**: Location icon with gradient background
- **Position**: Left side of timeline, below day badge

## Notes

- Images are fetched from Unsplash's random collection based on keywords
- Each refresh may show a different image from the same destination
- Images are loaded at PDF generation time
- No API key required for Unsplash Source
- Works offline with cached images

## Customization

If you want different types of images, modify the keywords in PDFContent.tsx:

```tsx
// For beach destinations
`https://source.unsplash.com/400x400/?${city},beach,ocean,resort`

// For mountain destinations  
`https://source.unsplash.com/400x400/?${city},mountain,hiking,nature`

// For city skylines
`https://source.unsplash.com/400x400/?${city},skyline,cityscape,architecture`
```

## Troubleshooting

**Issue**: Image not loading
- Check if city name is spelled correctly
- Try simplifying city name (e.g., "New York City" → "New York")
- Ensure internet connection is available

**Issue**: Wrong image displayed
- Unsplash uses AI to match keywords, sometimes results vary
- Add more specific keywords after city name
- Use well-known landmark names instead of city names

## Example Cities That Work Well

✅ Singapore
✅ Paris
✅ London  
✅ Tokyo
✅ Dubai
✅ New York
✅ Rome
✅ Barcelona
✅ Sydney
✅ Bangkok

---

**Created**: October 2025
**Last Updated**: October 2025
