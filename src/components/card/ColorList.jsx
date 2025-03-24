import React, {useState} from 'react';

const ColorList = ({colors}) => {
    const [activeColor, setActiveColor] = useState(null);
    const handleColorClick = (color) => {
        setActiveColor(color)
    };
    return (
        <div>
            <span className='text'>Color</span>
            <div style={{display:'flex', gap:'3px'}}>
                {colors.map(color => (
                    <span
                      key={color}
                      onClick={() => handleColorClick(color)}
                      style={{ 
                        color: color, 
                        cursor: 'pointer',
                        borderRadius:'80px'}}
                      className={activeColor === color ? 'active': ''}
                    >
                        <div style={{backgroundColor:color, width:'20px', height:"20px", borderRadius:'90px',}}>
                        </div>
                    </span>
                ))}
            </div>

        </div>
    );
};

export default ColorList;