import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import React from 'react';
import CustomPDFTemplate from '../components/CustomPDFTemplate';
import type { 
  TourOverviewData, 
  DayItinerary, 
  Hotel, 
  PaymentPlanData, 
  InclusionsExclusionsData 
} from '../store/itineraryStore';

export interface ItineraryData {
  tourOverview: TourOverviewData;
  dailyItinerary: DayItinerary[];
  hotels: Hotel[];
  paymentPlan: PaymentPlanData;
  inclusionsExclusions: InclusionsExclusionsData;
}

export const generateEnhancedPDF = async (data: ItineraryData): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-10000px';
      tempContainer.style.top = '0';
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.zIndex = '9999';
      
      document.body.appendChild(tempContainer);

      // Create React root and render the template
      const root = createRoot(tempContainer);
      
      const handlePDFGeneration = async () => {
        try {
          // Wait a bit for fonts and styles to load
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Find the PDF template element
          const pdfElement = tempContainer.querySelector('#custom-pdf-template') as HTMLElement;
          
          if (!pdfElement) {
            throw new Error('PDF template element not found');
          }

          // Configure html2canvas options for better quality
          const canvas = await html2canvas(pdfElement, {
            scale: 2, // Higher resolution for better quality
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: 800,
            height: pdfElement.scrollHeight,
            scrollX: 0,
            scrollY: 0,
            onclone: (clonedDoc) => {
              // Ensure all styles are applied in the cloned document
              const clonedElement = clonedDoc.querySelector('#custom-pdf-template') as HTMLElement;
              if (clonedElement) {
                clonedElement.style.transform = 'scale(1)';
                clonedElement.style.transformOrigin = 'top left';
              }
            }
          });

          // Clean up React root and container
          root.unmount();
          document.body.removeChild(tempContainer);

          // Create PDF with the canvas
          await createPDFFromCanvas(canvas, data);
          
          resolve(undefined);
        } catch (error) {
          // Clean up on error
          try {
            root.unmount();
            if (document.body.contains(tempContainer)) {
              document.body.removeChild(tempContainer);
            }
          } catch (cleanupError) {
            console.warn('Error during cleanup:', cleanupError);
          }
          reject(error);
        }
      };

      // Render the component
      root.render(
        React.createElement(CustomPDFTemplate, {
          tourOverview: data.tourOverview,
          dailyItinerary: data.dailyItinerary,
          hotels: data.hotels,
          paymentPlan: data.paymentPlan,
          inclusionsExclusions: data.inclusionsExclusions
        })
      );

      // Wait for render to complete, then generate PDF
      setTimeout(handlePDFGeneration, 500);

    } catch (error) {
      console.error('Error in generateEnhancedPDF:', error);
      reject(new Error('Failed to generate PDF. Please try again.'));
    }
  });
};

const createPDFFromCanvas = async (canvas: HTMLCanvasElement, data: ItineraryData): Promise<void> => {
  try {
    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Create PDF in A4 format
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10; // 10mm margin
    const contentWidth = pageWidth - (2 * margin);
    
    // Calculate image dimensions
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Calculate number of pages needed
    const contentHeight = pageHeight - (2 * margin);
    const totalPages = Math.ceil(imgHeight / contentHeight);
    
    // Add pages and content
    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }
      
      const yPosition = margin - (page * contentHeight);
      
      pdf.addImage(
        imgData,
        'PNG',
        margin,
        yPosition,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
    }

    // Generate filename
    const filename = generateFilename(data.tourOverview);
    
    // Save the PDF
    pdf.save(filename);
    
  } catch (error) {
    console.error('Error creating PDF from canvas:', error);
    throw new Error('Failed to create PDF from rendered content.');
  }
};

const generateFilename = (tourOverview: TourOverviewData): string => {
  const title = tourOverview.tripTitle || 'Travel_Itinerary';
  const date = new Date().toISOString().split('T')[0];
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
  return `${sanitizedTitle}_${date}.pdf`;
};

// Alternative function for simpler usage
export const generatePDFFromStore = async (
  tourOverview: TourOverviewData,
  dailyItinerary: DayItinerary[],
  hotels: Hotel[],
  paymentPlan: PaymentPlanData,
  inclusionsExclusions: InclusionsExclusionsData
): Promise<void> => {
  const data: ItineraryData = {
    tourOverview,
    dailyItinerary,
    hotels,
    paymentPlan,
    inclusionsExclusions
  };
  
  return generateEnhancedPDF(data);
};

// Export both the enhanced generator and the original one for backward compatibility
export { generatePDF } from './pdfGenerator';
