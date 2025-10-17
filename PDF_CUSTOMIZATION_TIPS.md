# 📄 PDF Customization Tips with react-to-print

## 🎨 Print-Specific Styles

You can add special CSS that only applies when printing/generating PDFs:

### Option 1: Add to your component CSS
```css
/* In PDFContent.tsx or a separate CSS file */
@media print {
  /* Hide elements you don't want in PDF */
  .no-print {
    display: none !important;
  }
  
  /* Force page breaks */
  .page-break {
    page-break-before: always;
  }
  
  /* Avoid breaking inside elements */
  .keep-together {
    page-break-inside: avoid;
  }
  
  /* Set page margins */
  @page {
    margin: 1cm;
    size: A4;
  }
  
  /* Optimize colors for print */
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

### Option 2: Add Tailwind print utilities
```tsx
// Example in PDFContent.tsx
<div className="print:hidden">This won't appear in PDF</div>
<div className="print:text-black">This will be black in PDF</div>
<div className="print:break-before-page">New page starts here</div>
```

## 📏 Page Break Control

```tsx
// Force a new page before this element
<div className="break-before-page">
  {/* Content starts on new page */}
</div>

// Prevent page break inside
<div className="break-inside-avoid">
  {/* Keep this together on one page */}
</div>

// Force page break after
<div className="break-after-page">
  {/* Content */}
</div>
```

## 🎯 Advanced react-to-print Options

Update `PDFPreviewModal.tsx` to customize:

```tsx
const handlePrint = useReactToPrint({
  contentRef: contentRef,
  documentTitle: 'Travel-Itinerary',
  
  // Optional: Custom page style
  pageStyle: `
    @page {
      size: A4;
      margin: 20mm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
      }
    }
  `,
  
  // Optional: Callback when print starts
  onBeforeGetContent: () => {
    console.log('Preparing PDF...');
    return Promise.resolve();
  },
  
  // Optional: Callback after print
  onAfterPrint: () => {
    console.log('PDF generated!');
  },
  
  // Optional: Remove iframe after print
  removeAfterPrint: true,
});
```

## 🖼️ Handling Images

Make sure images load before PDF generation:

```tsx
const handlePrint = useReactToPrint({
  contentRef: contentRef,
  documentTitle: 'Travel-Itinerary',
  
  // Wait for images to load
  onBeforeGetContent: async () => {
    const images = document.querySelectorAll('img');
    const promises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve);
      });
    });
    await Promise.all(promises);
  },
});
```

## 🎨 Custom Fonts in PDF

Fonts from Google Fonts or local fonts work automatically! Just make sure they're loaded:

```tsx
// In your index.html or component
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
```

## 📱 Responsive PDF Layout

```css
@media print {
  /* Make layout single column for print */
  .grid-cols-2 {
    grid-template-columns: 1fr !important;
  }
  
  /* Adjust font sizes */
  .text-4xl {
    font-size: 2rem !important;
  }
  
  /* Remove unnecessary spacing */
  .gap-8 {
    gap: 1rem !important;
  }
}
```

## 🔧 Troubleshooting Common Issues

### Issue: Colors look different in PDF
**Solution:**
```css
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
```

### Issue: Content cut off at page boundaries
**Solution:**
```tsx
<div className="break-inside-avoid">
  {/* Your content */}
</div>
```

### Issue: Background colors not showing
**Solution:**
```css
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

### Issue: Images not appearing
**Solution:** Use `onBeforeGetContent` to wait for images (see example above)

## 🎯 Example: Custom PDF Component

```tsx
// PDFContent.tsx with print optimizations
const PDFContent: React.FC = () => {
  return (
    <div className="print:p-0">
      {/* Header - prevent breaking */}
      <header className="break-inside-avoid bg-gradient-to-r from-blue-500 to-purple-600 p-8">
        <h1 className="text-4xl text-white">Travel Itinerary</h1>
      </header>

      {/* Each day starts on new page */}
      {dailyItinerary.map((day, index) => (
        <div 
          key={day.id} 
          className={index > 0 ? 'break-before-page' : ''}
        >
          <h2>Day {day.dayNumber}</h2>
          {/* day content */}
        </div>
      ))}

      {/* Footer on last page */}
      <footer className="break-inside-avoid mt-8 border-t pt-4">
        <p>Generated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
};
```

## 🚀 Pro Tips

1. **Test in different browsers** - Chrome, Firefox, and Safari may render PDFs slightly differently
2. **Use exact units** - `px` and `rem` work better than `%` for print
3. **Optimize images** - Compress images before using them
4. **Keep it simple** - Complex animations and transforms may not render well
5. **Test page breaks** - Always check multi-page documents

## 📊 Comparison: Before vs After

| Feature | @react-pdf/renderer | react-to-print |
|---------|-------------------|----------------|
| CSS Gradients | ❌ No | ✅ Yes |
| Custom Fonts | ⚠️ Limited | ✅ Full support |
| Tailwind Classes | ❌ No | ✅ Yes |
| oklch Colors | ❌ No | ✅ Yes |
| Box Shadows | ❌ No | ✅ Yes |
| Complex Layouts | ⚠️ Manual | ✅ Automatic |
| Learning Curve | 😰 High | 😊 Low |
| Bundle Size | 📦 Large | 📦 Small |

---

**Happy PDF Generation! 🎉**
