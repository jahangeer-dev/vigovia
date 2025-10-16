import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { tabRoutes } from '../config/routes';
import { useItineraryStore } from '../store/itineraryStore';
import { loadSampleData } from '../data/sampleData';
import { FiDownload, FiSave, FiZap } from 'react-icons/fi';
import PDFPreviewModal from '../components/PDFPreviewModal';
import GooeyTabBar from './GooeyTabBar';
import { useActiveTab } from '../hooks/useActiveTab';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const store = useItineraryStore();
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const { activeTab } = useActiveTab();

  const handleTabChange = (tabId: string) => {
    const tab = tabRoutes.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  const handleExportPDF = () => {
    setShowPDFPreview(true);
  };

  const handleSaveDraft = () => {
    console.log('Draft saved automatically');
  };

  const handleLoadSampleData = () => {
    loadSampleData(store);
    console.log('Sample data loaded successfully!');
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/50 to-transparent"></div>
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.1 }}
            className="space-y-1"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Vigovia Itinerary
            </h1>
            <p className="text-gray-500 text-lg">Your personalized travel plan</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }} 
            className="flex items-center gap-3"
          >
            <motion.button
              onClick={handleLoadSampleData}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiZap />
              <span>Load Sample</span>
            </motion.button>
            
            <motion.button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiSave />
              <span>Save Draft</span>
            </motion.button>
            
            <motion.button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload />
              <span>Export PDF</span>
            </motion.button>
          </motion.div>
        </header>

        {/* Gooey Tab Navigation */}
        <GooeyTabBar
          tabs={tabRoutes}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Content Area with Page Transitions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 1.05 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* PDF Preview Modal */}
      <PDFPreviewModal
        isOpen={showPDFPreview}
        onClose={() => setShowPDFPreview(false)}
      />
    </div>
  );
};

export default MainLayout;
