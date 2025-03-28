import React from "react";
import { useCart } from "./cartOperations";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="w-[1000px] my-10 mx-auto p-6 bg-[#eef7e7] rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">CART ITEMS</h2>

      <div className="flex flex-col gap-4">
        {cart.length === 0 ? (
          <p className="text-center text-lg text-gray-500 py-10">
            Your cart is empty.
          </p>
        ) : (
          cart.map((item, index) => (
            <div
              key={item.id}
              className="flex gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <span className="text-lg font-bold text-gray-700 w-[30px] text-center">
                {index + 1}
              </span>

              <img
                src={item.img}
                alt={item.name}
                className="w-[60px] h-[60px] rounded-md object-cover"
              />

              <div className="flex-grow pl-4">
                <h4 className="m-0 text-lg font-medium">{item.name}</h4>
                <p className="m-0 text-base text-gray-600">${item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="border border-gray-300 p-1 text-xl cursor-pointer rounded-md hover:bg-gray-100"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  className="border border-gray-300 p-1 text-xl cursor-pointer rounded-md hover:bg-gray-100"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
              </div>

              <button
                className="py-1 px-3 border border-red-500 text-red-500 text-sm rounded-md cursor-pointer hover:bg-red-500 hover:text-white"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg text-center shadow-md">
        <h3 className="mb-4 text-xl font-semibold">ORDER SUMMARY</h3>
        <p className="text-xl font-bold text-gray-800">
          Total:{" "}
          <span className="text-green-600">
            ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
          </span>
        </p>
        <button className="w-full mt-4 py-3 px-6 text-lg bg-black text-white border-none rounded-md cursor-pointer hover:bg-gray-800">
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  );
};

export default CartPage;