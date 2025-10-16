# Vigovia Itinerary PDF Generator

This project now includes a comprehensive PDF generation system that creates professional-looking travel itineraries matching your brand requirements.

## 📋 Features

### PDF Template Design
- **Professional Layout**: Clean, modern design with proper typography and spacing
- **Brand Integration**: Uses your Vigovia logo from the `public/logo.png` file
- **Comprehensive Content**: Includes all itinerary sections:
  - Tour Overview with trip details and highlights
  - Daily Itinerary with activities, transportation, and meals
  - Hotel Details with ratings, amenities, and contact information
  - Payment Plan with installment schedules and terms
  - Inclusions/Exclusions with categorized lists
  - Important Notes with visual indicators

### PDF Generation Process
- **Preview Before Export**: Modal preview showing exactly how the PDF will look
- **High-Quality Output**: Uses html2canvas for crisp rendering at 2x scale
- **Automatic Pagination**: Handles multi-page content automatically
- **Professional Formatting**: Consistent styling throughout the document

## 🚀 How to Use

1. **Fill in Your Itinerary Data**:
   - Navigate through the tabs (Overview, Itinerary, Hotels, Payment, Inclusions)
   - Enter all relevant information for your tour

2. **Generate PDF**:
   - Click the "Generate PDF" button at the bottom of the page
   - A preview modal will open showing how your PDF will look
   - Review the content and click "Generate PDF" to download

3. **Customize Branding**:
   - Replace `public/logo.png` with your company logo
   - Logo should be square format (recommended: 256x256px or larger)

## 🎨 PDF Template Structure

### Header Section
- Company logo and branding
- Tour code and generation date
- Professional gradient styling

### Main Content Areas
1. **Title Section**: Trip name, duration, travelers, and tour type
2. **Trip Overview**: Departure/arrival details and highlights
3. **Daily Itinerary**: Day-by-day activities with time slots
4. **Hotel Information**: Complete accommodation details
5. **Inclusions/Exclusions**: Clear categorized lists
6. **Payment Schedule**: Detailed payment plan with installments

### Footer Section
- Company contact information
- Document metadata
- Legal disclaimers

## 🔧 Technical Implementation

### Dependencies
- `jspdf`: PDF generation library
- `html2canvas`: HTML to canvas conversion for high-quality rendering
- React components for preview functionality

### Key Files
- `src/components/PDFTemplate.tsx`: Main PDF template component
- `src/utils/pdfGenerator.ts`: PDF generation utility functions
- `src/components/PDFPreviewModal.tsx`: Preview modal component

### PDF Generation Flow
1. Data is exported from Zustand store
2. HTML template is generated with the data
3. HTML is rendered to canvas using html2canvas
4. Canvas is converted to PDF using jsPDF
5. PDF is automatically downloaded with formatted filename

## 📱 Responsive Design

The PDF template is optimized for:
- **A4 Paper Size**: Standard business document format
- **Print-Friendly Colors**: Professional color scheme
- **Clear Typography**: Easy-to-read fonts and spacing
- **Logical Layout**: Information hierarchy for easy scanning

## 🎯 Customization Options

### Styling
- Modify colors in `PDFTemplate.tsx` to match your brand
- Adjust fonts and spacing as needed
- Add custom sections or remove unwanted elements

### Content
- Add custom fields to the data store
- Include additional sections like terms & conditions
- Modify the layout for different business needs

### Branding
- Update company information in the footer
- Customize the header layout
- Add watermarks or background elements

## 🔍 Data Validation

The PDF generator handles:
- **Empty Fields**: Gracefully skips missing information
- **Date Formatting**: Consistent date display throughout
- **Currency Formatting**: Proper monetary value display
- **Image Fallbacks**: Handles missing logo gracefully

## 📧 Support & Contact

For customizations or support:
- Email: info@vigovia.com
- Phone: +1 (555) 123-4567

## 🚀 Future Enhancements

Potential improvements:
- Multiple template designs
- Custom branding themes
- Email integration for direct sending
- Cloud storage integration
- Multi-language support

---

**Note**: The PDF generation feature creates exact replicas of your itinerary data in a professional format suitable for client presentations and official documentation.
