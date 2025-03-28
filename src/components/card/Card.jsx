import React, { useState } from 'react';
import ColorList from './ColorList';
import { useCart } from '../cart/cartOperations';
import { Link } from 'react-router-dom';

const Card = ({ id, name, price, colors, img }) => {
    const [size, setSize] = useState(1);
    const { addToCart } = useCart();

    const decreaseSize = () => {
        if (size > 1) {
            setSize(size - 1);
        }
    };

    const increaseSize = () => {
        setSize(size + 1);
    };

    const handleAddToCart = () => {
        const product = {
            id,
            name,
            price,
            img,
            size,
            quantity: 1,
        };
        addToCart(product);
    };

    return (
        <div className="bg-white rounded-[15px] shadow-[2px_2px_5px_rgba(0,0,0,0.2)] w-[270px] h-[410px] p-10 text-start cursor-pointer">
            <Link to={`/product/${id}`}>
                <div className="relative -translate-x-[20px] -translate-y-[20px]">
                    <img src={img} alt="" className="w-[230px] h-[200px]" />
                </div>
            </Link>
            <div className="flex gap-2.5">
                <div className="font-sans">{name}</div>
                <div className="font-sans">${price}</div>
            </div>
            <ColorList colors={colors} />
            <div>
                <span>Size</span>
                <div>
                    <button onClick={decreaseSize} disabled={size === 1} className="border-none">-</button>
                    <span>{size}</span>
                    <button onClick={increaseSize} className="border-none">+</button>
                </div>
            </div>
            <button
                onClick={handleAddToCart}
                className="font-sans border-none bg-cyan-500 p-1.5 mt-2.5 w-[200px] rounded-[20px]"
            >
                ADD TO CART
            </button>
        </div>
    );
};

export default Card;