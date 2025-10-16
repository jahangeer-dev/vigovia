import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import type { TabRoute } from '../config/routes';

interface GooeyTabBarProps {
  tabs: TabRoute[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const GooeyTabBar: React.FC<GooeyTabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [tabPositions, setTabPositions] = useState<{ [key: string]: { x: number; width: number } }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Spring animations for the gooey blob
  const springConfig = { damping: 25, stiffness: 300, mass: 0.8 };
  const x = useSpring(0, springConfig);
  const width = useSpring(0, springConfig);
  
  // Update positions when component mounts or tabs change
  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;

      const newPositions: { [key: string]: { x: number; width: number } } = {};
      const tabElements = containerRef.current.querySelectorAll('[data-tab-id]');
      
      tabElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        const tabId = element.getAttribute('data-tab-id')!;
        
        newPositions[tabId] = {
          x: rect.left - containerRect.left,
          width: rect.width,
        };
      });
      
      setTabPositions(newPositions);
    };

    const timer = setTimeout(updatePositions, 100);
    return () => clearTimeout(timer);
  }, [tabs.length]);

  // Update blob position based on active or hovered tab
  useEffect(() => {
    const targetId = hoveredTab || activeTab;
    const position = tabPositions[targetId];
    
    if (position) {
      x.set(position.x);
      width.set(position.width);
    }
  }, [activeTab, hoveredTab, tabPositions, x, width]);

  const currentActiveTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative mb-8"
    >
      {/* Gooey Background Container */}
      <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-3 overflow-hidden">
        {/* SVG Filter for Gooey Effect */}
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <filter id="gooey" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 19 -9" result="gooey" />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
            </filter>
          </defs>
        </svg>

        {/* Animated Blob Background */}
        <motion.div
          className="absolute top-3 bottom-3 rounded-xl shadow-lg"
          style={{
            x,
            width,
            background: currentActiveTab ? `linear-gradient(135deg, ${currentActiveTab.gradient.split(' ')[1]}, ${currentActiveTab.gradient.split(' ')[3]})` : 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            filter: 'url(#gooey)',
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            mass: 0.8,
          }}
        />

        {/* Tab Navigation */}
        <nav className="relative flex justify-center items-center gap-2" aria-label="Tabs">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            const isHovered = hoveredTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                data-tab-id={tab.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  damping: 20,
                  stiffness: 300 
                }}
                onClick={() => onTabChange(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative group px-6 py-4 rounded-xl font-medium transition-all duration-300 min-w-[160px] z-10 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center gap-2 relative">
                  {/* Icon with bounce animation */}
                  <motion.span 
                    className="text-2xl"
                    animate={isActive ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, -5, 5, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: isActive ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  >
                    {tab.icon}
                  </motion.span>
                  
                  {/* Tab Name */}
                  <span className="text-sm font-semibold">{tab.name}</span>
                  
                  {/* Tab Description */}
                  <span className={`text-xs transition-colors duration-300 ${
                    isActive ? 'text-white/80' : 'text-gray-400'
                  }`}>
                    {tab.description}
                  </span>

                  {/* Hover Effect - Ripple */}
                  {(isHovered || isActive) && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      initial={{ scale: 0, opacity: 0.3 }}
                      animate={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        background: `radial-gradient(circle, ${isActive ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'} 0%, transparent 70%)`,
                      }}
                    />
                  )}
                </div>

                {/* Particle Effect on Active */}
                {isActive && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/60 rounded-full"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          y: [-10, -30, -10],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Gooey Drops Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-20"
              style={{
                background: currentActiveTab ? 
                  `linear-gradient(135deg, ${currentActiveTab.gradient.split(' ')[1]}, ${currentActiveTab.gradient.split(' ')[3]})` : 
                  'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                left: `${20 + i * 30}%`,
                filter: 'url(#gooey)',
              }}
              animate={{
                y: [0, -100, 0],
                scale: [0, 1.5, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GooeyTabBar;
