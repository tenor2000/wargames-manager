import { useAppContext } from './AppContext.jsx';
import { useState } from 'react';
import { MenuWizard } from './CreateNewWizard.jsx';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';


export function ExpandBox({title, children, className}) {
    const [expanded, setExpanded] = useState(false);
  
    className ? className = className : className = '';
  
    const toggleExpanded = () => {
      setExpanded(!expanded);
    };
  
    return (
      <div className={`${className} expandable-container`}>
        <div 
          onClick={toggleExpanded} 
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}
        >
          <h3>{title}</h3>
          <div>{expanded ? <MdExpandMore size={30}/> : <MdExpandLess size={30} />}</div>
        </div>
        {expanded && (<div className={`${className}-container`}>
          {children}
          
        </div>
          )}
      </div>
    );
  }