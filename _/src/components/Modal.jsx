import React from 'react';
import './index.css'

export const Modal = ({children, overLay = 'react-modal-overlay', isOpen, onClick, color='', text, size='md', state='', title, heading, centralize=false, wrapperWidth=500, margin, content=''})  =>
{
    const css = `btn btn-${color} btn-outline-primary-${color} btn-${size} ${state}`  
    const center = centralize ? `modal-dialog-centered` : ''
    const width = `modal-dialog-${size}`
    const style = `modal-dialog ${width} ${center}`
    const overlay = overLay
    
    return (
          <>
              {
                isOpen && (
                  <div className={`${overlay} z-50`} onClick={() => onClick(isOpen)}>
                    <div className="react-modal-wrapper rounded-none" onClick={(e) => e.stopPropagation()} style={{maxWidth: `${wrapperWidth}px`, margin: `${margin}`}}>
                      <div className={`react-modal-content mx-3 ${content}`}>

                         <div>
                          {children}
                         </div>
                      </div>
                    </div>
                  </div>
                )
              }
          </>     
    );
}
