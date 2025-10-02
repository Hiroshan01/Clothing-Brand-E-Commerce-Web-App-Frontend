import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cart, setCart] = useState(location.state?.cart || []);
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Calculate total
    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.qty;
        });
        return total;
    }

    // Remove item from cart
    function removeFromCart(index) {
        const newCart = cart.filter((item, i) => i !== index);
        setCart(newCart);
        toast.success("Item removed from cart");
    }

    // Change quantity
    function changeQty(index, qty) {
        const newQty = cart[index].qty + qty;
        if (newQty <= 0) {
            removeFromCart(index);
            return;
        } else {
            const newCart = [...cart];
            newCart[index].qty = newQty;
            setCart(newCart);
        }
    }

    // Place order
    async function placeOrder() {
        // Validation
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first");
            return;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setIsLoading(true);

        try {
            // Prepare order data according to backend structure
            const orderInformation = {
                products: cart.map(item => ({
                    productId: item.productId,
                    qty: item.qty,
                    size: item.size || "N/A" // Include size if available
                })),
                name: name.trim() || undefined, // Optional
                address: address.trim() || undefined, // Optional
                phone: phoneNo.trim() || undefined // Optional
            };
            console.log("Order Info:", orderInformation);

            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/orders/",
                orderInformation,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            toast.success("Order placed successfully! Check your email for confirmation.");

            // Clear cart and redirect to orders page or home
            setCart([]);

            // Show order details
            setTimeout(() => {
                navigate("/orders", {
                    state: {
                        newOrder: response.data.order
                    }
                });
            }, 1500);

        } catch (error) {
            console.error("Order error:", error);
            const errorMessage = error.response?.data?.message || "Failed to place order. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 px-8 py-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 text-center">
                        Checkout
                    </h1>
                </div>

                {/* Checkout Summary */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                    <div className="space-y-6">
                        <div className="text-center">
                            <p className="text-xl text-gray-600 font-medium mb-3">
                                Total Amount:
                            </p>
                            <p className="text-5xl font-bold text-red-500">
                                Rs. {getTotal().toFixed(2)}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <input
                                type="text"
                                placeholder="Full Name (Optional)"
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                            />
                            <input
                                type="text"
                                placeholder="Delivery Address (Optional)"
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                disabled={isLoading}
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number (Optional)"
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-5 rounded-xl font-semibold text-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                            onClick={placeOrder}
                            disabled={isLoading || cart.length === 0}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing Order...
                                </>
                            ) : (
                                "Place Order"
                            )}
                        </button>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-6">
                    {cart.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                            <div className="text-gray-400 text-8xl mb-6">🛒</div>
                            <h2 className="text-3xl font-semibold text-gray-600 mb-4">
                                Your cart is empty
                            </h2>
                            <p className="text-xl text-gray-500 mb-6">Add some items to checkout!</p>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105"
                                onClick={() => navigate("/")}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div
                                key={`${item.productId}-${index}`}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative border border-gray-100"
                            >
                                {/* Remove Button */}
                                <button
                                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition-all duration-200 transform hover:scale-110 z-10 disabled:opacity-50"
                                    onClick={() => removeFromCart(index)}
                                    disabled={isLoading}
                                >
                                    <FaRegTrashCan className="text-lg" />
                                </button>

                                <div className="flex items-center justify-between">
                                    {/* Product Image */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-32 h-32 object-cover rounded-xl shadow-md"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 mx-8">
                                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                                            {item.name}
                                        </h1>
                                        <p className="text-base text-gray-500 font-medium mb-2">
                                            Product ID: {item.productId}
                                        </p>
                                        {item.size && (
                                            <p className="text-base text-gray-600 mb-3">
                                                Size: <span className="font-semibold text-lg">{item.size}</span>
                                            </p>
                                        )}
                                        {item.labelledPrice > item.price ? (
                                            <div className="flex items-center space-x-3">
                                                <span className="text-lg text-gray-400 line-through">
                                                    Rs. {item.labelledPrice.toFixed(2)}
                                                </span>
                                                <span className="text-2xl font-bold text-gray-800">
                                                    Rs. {item.price.toFixed(2)}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-2xl font-bold text-gray-800">
                                                Rs. {item.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 mx-6">
                                        <button
                                            className="w-12 h-12 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-gray-600 font-semibold text-xl disabled:opacity-50"
                                            onClick={() => changeQty(index, -1)}
                                            disabled={isLoading}
                                        >
                                            -
                                        </button>
                                        <span className="mx-6 text-2xl font-semibold text-gray-700 min-w-[3rem] text-center">
                                            {item.qty}
                                        </span>
                                        <button
                                            className="w-12 h-12 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-gray-600 font-semibold text-xl disabled:opacity-50"
                                            onClick={() => changeQty(index, 1)}
                                            disabled={isLoading}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Total Price */}
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                                        <span className="text-3xl font-bold text-blue-600">
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