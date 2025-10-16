import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { tabRoutes } from '../config/routes';

export const useActiveTab = () => {
  const location = useLocation();
  const [activeTab, setActiveTabState] = useState<string>('overview');

  useEffect(() => {
    const currentTab = tabRoutes.find(tab => 
      tab.path === location.pathname || 
      (tab.path === '/' && location.pathname === '/')
    );
    
    if (currentTab) {
      setActiveTabState(currentTab.id);
    }
  }, [location.pathname]);

  return {
    activeTab,
    currentTabData: tabRoutes.find(tab => tab.id === activeTab),
    allTabs: tabRoutes,
  };
};
