
import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current device is mobile
 * @returns boolean indicating if the device is mobile
 */
const useMobileDetect = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      
      // Additional check for screen width
      const isMobileByWidth = window.innerWidth < 768;
      
      setIsMobile(mobileRegex.test(userAgent) || isMobileByWidth);
    };
    
    // Check on mount
    checkIfMobile();
    
    // Check on resize
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  return isMobile;
};

export default useMobileDetect;
