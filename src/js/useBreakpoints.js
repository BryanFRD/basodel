import { useState, useEffect } from 'react';
import { ObjectHelper } from '../helpers/ObjectHelper.helper';

/*
  TODO Il a du mal à detecter au bon moment, 922 bootstrap != 992 ici (pas la même taille en html et css ???)
  L'event se fait surement AVANT que la taille soit modifiée
*/

const useBreakpoints = () => {
  const getBreakpoints = (size) => {
    return {
      sm: (size >= 576),
      md: (size >= 768),
      lg: (size >= 992),
      xl: (size >= 1200),
      xxl: (size >= 1400)
    }
  }
  
  const [breakpoints, setBreakpoints] = useState(getBreakpoints(window.innerWidth));
  
  const resize = () => {
    const bp = getBreakpoints(window.innerWidth);
    
    console.log('called risize')
    
    if(ObjectHelper.isEqual(breakpoints, bp))
      return;
    
    console.log('resized')
      
    setBreakpoints(bp);
  }
  
  useEffect(() => {
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
    }
  }, []);
  
  return { breakpoints };
}

export default useBreakpoints;