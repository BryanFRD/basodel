import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeContext } from '../../../context/ThemeContext';

const CustomToast = () => {
  const { theme } = useContext(ThemeContext);
  // const { toasts, handlers } = useToaster();
  // const { startPause, endPause } = handlers;
  
  return (
    <Toaster position='bottom-right'  containerClassName={` hot-toast`}/>
    // <div
    //   onMouseEnter={startPause}
    //   onMouseLeave={endPause}
    //   style={{
    //     position: 'absolute'
    //   }}>
    //   {toasts
    //     .filter(toast => toast.visible)
    //     .map(toast => (
    //       <div
    //       key={toast.id}
    //       style={{
    //         position: 'absolute',
    //         bottom: '0px',
    //         right: 'px',
    //         backgroundColor: '#333',
    //         color: theme.bgColor,
    //         padding: '10px 20px',
    //         borderRadius: '10px'
    //       }}
    //       {...toast.style}>
    //         {toast.message}
    //       </div>
    //     ))
    //   }
    // </div>
  );
};

export default CustomToast;