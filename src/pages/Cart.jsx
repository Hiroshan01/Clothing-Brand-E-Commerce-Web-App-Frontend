import { useState } from "react";
import { addCart, getCart, getTotal, removeFromCart } from "../utils/cart";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState(getCart());
    //console.log("Cart", cart)

    return (
        <div className="w-full min-h-screen bg-gray-50 px-8 py-6">
            <div className="max-w-4xl mx-auto">

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">
                        Shopping Cart
                    </h1>
                </div>

                {/* Total Summary */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xl text-gray-600 font-medium">
                                Total Amount:
                            </p>
                            <p className="text-3xl font-bold text-red-500">
                                Rs. {getTotal().toFixed(2)}
                            </p>
                        </div>
                        <Link
                            to="/checkout"
                            state={{ cart: cart, }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-4">
                    {cart.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="text-gray-400 text-6xl mb-4">🛒</div>
                            <h2 className="text-xl font-semibold text-gray-600 mb-2">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-500">Add some items to get started!</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.productId}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative border border-gray-100"
                            >
                                {/* Remove Button */}
                                <button
                                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200"
                                    onClick={() => {
                                        removeFromCart(item.productId);
                                        setCart(getCart());
                                    }}
                                >
                                    <FaRegTrashCan className="text-sm" />
                                </button>

                                <div className="flex items-center justify-between">
                                    {/* Product Image */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-28 h-28 object-cover rounded-xl shadow-md"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 mx-6">
                                        <h1 className="text-xl font-semibold text-gray-800 mb-1">
                                            {item.name}
                                        </h1>
                                        <p className="text-sm text-gray-500 font-medium mb-2">
                                            ID: {item.productId}
                                        </p>
                                        {item.labelledPrice > item.price ? (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-gray-400 line-through">
                                                    Rs. {item.labelledPrice.toFixed(2)}
                                                </span>
                                                <span className="text-xl font-bold text-gray-800">
                                                    Rs. {item.price.toFixed(2)}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xl font-bold text-gray-800">
                                                Rs. {item.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center bg-gray-100 rounded-xl px-2 py-1">
                                        <button
                                            className="w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-gray-600 font-semibold"
                                            onClick={() => {
                                                addCart(item, -1);
                                                setCart(getCart());
                                            }}
                                        >
                                            -
                                        </button>
                                        <span className="mx-4 text-xl font-semibold text-gray-700 min-w-[2rem] text-center">
                                            {item.qty}
                                        </span>
                                        <button
                                            className="w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-gray-600 font-semibold"
                                            onClick={() => {
                                                addCart(item, 1);
                                                setCart(getCart());
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="text-right ml-6">
                                        <span className="text-2xl font-bold text-blue-600">
                                            Rs. {(item.price * item.qty).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}