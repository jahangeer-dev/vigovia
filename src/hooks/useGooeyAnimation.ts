import { useState, useCallback } from 'react';

interface UseGooeyAnimationProps {
  activeId: string;
  hoveredId: string | null;
}

export const useGooeyAnimation = ({ activeId, hoveredId }: UseGooeyAnimationProps) => {
  const [positions, setPositions] = useState<{ [key: string]: { x: number; width: number } }>({});
  const [isReady, setIsReady] = useState(false);

  const updatePositions = useCallback((containerRef: React.RefObject<HTMLElement | null>) => {
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
    
    setPositions(newPositions);
    setIsReady(true);
  }, []);

  const getCurrentPosition = useCallback(() => {
    const targetId = hoveredId || activeId;
    return positions[targetId];
  }, [activeId, hoveredId, positions]);

  return {
    positions,
    isReady,
    updatePositions,
    getCurrentPosition,
  };
};
