import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload } from 'react-icons/fi';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import PDFContent from './PDFContent';

interface PDFPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({ isOpen, onClose }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handlePrint = async () => {
        if (!contentRef.current) return;

        try {
            setIsGenerating(true);
            
            // Get the content element
            const element = contentRef.current;
            
            // Create canvas from HTML element - html2canvas-pro supports oklch colors
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            });

            // Calculate dimensions
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            // Create PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            let position = 0;

            // Add image to PDF
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Add new pages if content is longer than one page
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Download the PDF
            pdf.save('Travel-Itinerary.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-hidden"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">PDF Preview</h2>
                                    <p className="text-sm text-gray-600 mt-1">Review your travel itinerary</p>
                                </div>
                                <motion.button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FiX className="w-6 h-6 text-gray-600" />
                                </motion.button>
                            </div>

                            {/* PDF Preview Content */}
                            <div className="flex-1 p-6 bg-gray-50 overflow-hidden">
                                <div className="h-full bg-white rounded-lg shadow-inner border border-gray-200 overflow-auto flex justify-center">
                                    <div style={{ width: '794px', padding: '40px', backgroundColor: 'white' }}>
                                        <PDFContent />
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                                <div className="text-sm text-gray-600">
                                    This is a preview of your PDF. You can edit content in the form and regenerate.
                                </div>
                                <div className="flex items-center gap-3">
                                    <motion.button
                                        onClick={onClose}
                                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={isGenerating}
                                    >
                                        Close Preview
                                    </motion.button>
                                    <motion.button
                                        onClick={handlePrint}
                                        className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        whileHover={{ scale: isGenerating ? 1 : 1.05 }}
                                        whileTap={{ scale: isGenerating ? 1 : 0.95 }}
                                        disabled={isGenerating}
                                    >
                                        {isGenerating ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <FiDownload className="w-4 h-4" />
                                                Download PDF
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                            
                            {/* Hidden PDF Content for Generation */}
                            <div style={{ position: 'absolute', left: '-9999px', top: '0' }}>
                                <div ref={contentRef} data-pdf-content style={{ width: '794px', padding: '40px', backgroundColor: 'white' }}>
                                    <PDFContent />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PDFPreviewModal;