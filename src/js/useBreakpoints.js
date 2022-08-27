import { useState, useEffect } from 'react';
import { ObjectHelper } from '../helpers/ObjectHelper.helper';

/*
  TODO Il a du mal à detecter au bon moment, 922 bootstrap != 992 ici (pas la même taille en html et css ???)
  L'event se fait surement AVANT que la taille soit modifiée
  Il y a un problème dans la detection des breakpoints, revoir afin d'éviter de changer le state si rien ne change
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
    
    if(ObjectHelper.isEqual(breakpoints, bp))
      return;
      
    setBreakpoints(bp);
  }
  
  useEffect(() => {
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return { breakpoints };
}

export default useBreakpoints;