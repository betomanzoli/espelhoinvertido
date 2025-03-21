import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current device is mobile
 * @returns boolean indicating if the device is mobile
 */
const useMobileDetect = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile/i;
      
      const isMobileByWidth = window.innerWidth < 768;
      
      setIsMobile(mobileRegex.test(userAgent) || isMobileByWidth);
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  return isMobile;
};

export const useIsMobile = useMobileDetect;

export default useMobileDetect;
