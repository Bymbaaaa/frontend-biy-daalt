import React, { useState } from 'react'
import ColorList from './ColorList'

const Card = ({name, price, colors, img}) => {
    const [size, setSize] = useState(1);

    const decreaseSize = () => {
        if(size > 3) {
            setSize(size - 1);
        }
    }

    const increaseSize = () => {
        setSize(size + 1);
    }
  return (
    <div>
        <div className='card'>
            <div className='productImg'><img src={img} alt="" width={'230px'} height={'200px'}/></div>
            <div style={{display:'flex', gap: '10px'}}>
               <div className='text'>{name}</div>
               <div className='text'>${price}</div>
            </div>
            <ColorList colors={colors}/>
            <div>
                <span>Size</span>
                <div>
                    <button onClick={decreaseSize} disabled={size === 1} style={{border: 'none'}}>-</button>
                    <span>{size}</span>
                    <button onClick={increaseSize}  style={{border: 'none'}}>+</button>
                </div>
            </div>
            <button className='text' style={{border: 'none', backgroundColor: 'cyan', padding: '6px', marginTop: '10px', width: '200px', borderRadius: '20px'}}>ADD TO CARD</button>
        </div>
    </div>
  )
}

export default Card;