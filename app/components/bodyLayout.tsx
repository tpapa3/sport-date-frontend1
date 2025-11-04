'use client'
import { useEffect, ReactNode } from 'react';

interface BodyLayoutProps {
  children:ReactNode;
  overflow:string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

const BodyLayout: React.FC<BodyLayoutProps> = ({ children, overflow,setLoading }) => {
  useEffect(() => {
    
    // Set the overflow on mount
    document.body.style.overflow = overflow;
    if(setLoading != undefined) setLoading(false);
    // Cleanup overflow style when unmounting
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return <>{children}</>;
};

export default BodyLayout;