import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useItineraryStore } from '../store/itineraryStore';
import CustomPDFTemplate from './CustomPDFTemplate';
import { generateEnhancedPDF, type ItineraryData } from '../utils/enhancedPdfGenerator';

const PDFPreviewModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { exportData } = useItineraryStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true);
      const data = exportData();
      await generateEnhancedPDF(data as any);
      console.log('PDF generated successfully!');
      onClose();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const data = exportData() as ItineraryData;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-6xl max-h-[90vh] w-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">PDF Preview</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="transform scale-75 origin-top">
                <CustomPDFTemplate
                  tourOverview={data.tourOverview}
                  dailyItinerary={data.dailyItinerary}
                  hotels={data.hotels}
                  paymentPlan={data.paymentPlan}
                  inclusionsExclusions={data.inclusionsExclusions}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Preview shows how your itinerary will appear in the PDF document
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGeneratePDF}
                  disabled={isGenerating}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <span>📄</span>
                      Generate PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFPreviewModal;
