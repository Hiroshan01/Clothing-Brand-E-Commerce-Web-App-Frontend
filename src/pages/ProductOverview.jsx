import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { addCart } from "../utils/cart";


export default function ProductOverview() {
    const params = useParams();
    const productId = params.id;
    const [status, setStatus] = useState("loading"); // loading, success, error
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
            .then((response) => {
                setProduct(response.data);
                setStatus("success");
            })
            .catch((error) => {
                setStatus("error");
                toast.error(error.response?.data?.message || "Error fetching product details");
            });
    }, [productId]);

    return (
        <div className="w-full min-h-screen bg-gray-50 py-8">
            {status === "success" && product && (
                <div className="max-w-6xl mx-auto px-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="flex">
                            {/* Image Section */}
                            <div className="w-1/2 p-8">
                                <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-gray-500">No image available</span>
                                    )}
                                </div>
                            </div>

                            {/* Product Details Section */}
                            <div className="w-1/2 p-8 border-l border-gray-200">
                                <div className="space-y-6">

                                    {/* Product Title */}
                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-bold text-gray-900">
                                            {product.name}
                                        </h1>
                                        {product.altName && product.altName.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {product.altName.map((altName, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-base text-gray-600 bg-gray-100 px-2 py-1 rounded"
                                                    >
                                                        {altName}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">Product ID</p>
                                        <p className="text-lg font-semibold text-gray-900">{product.productId}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {product.description || 'No description available'}
                                        </p>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                                        {product.labelledPrice < product.price ? (
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-lg color-[#781D7D] line-through">
                                                        Rs. {product.price.toFixed(2)}
                                                    </span>
                                                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                                                        SALE
                                                    </span>
                                                </div>

                                                <div className="text-sm text-green-600 font-medium">
                                                    You save Rs. {(product.price - product.labelledPrice).toFixed(2)}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-3xl font-bold text-blue-600">
                                                Rs. {product.price.toFixed(2)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-4">
                                        <button
                                            className="w-full bg-[#781D7D] text-white  hover:bg-purple-700  px-6 py-4 rounded-lg font-semibold  transition-colors duration-200 border border-gray-300 hover:border-gray-400"
                                            onClick={() => {
                                                navigate("/checkout", {
                                                    state: {
                                                        cart: [
                                                            {
                                                                productId: product.productId,
                                                                name: product.ProductName,
                                                                image: product.images[0],
                                                                price: product.price,
                                                                labellPrice: product.labellPrice,
                                                                qty: 1
                                                            }
                                                        ]
                                                    }
                                                })
                                            }}
                                        >
                                            Buy Now
                                        </button>

                                        <button
                                            className="w-full bg-[#781D7D] text-white  hover:bg-purple-700  px-6 py-4 rounded-lg font-semibold  transition-colors duration-200 border border-gray-300 hover:border-gray-400"
                                            onClick={() => {
                                                addCart(product, 1)
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                    {/* Additional Info */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {status === "loading" && (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            )}
        </div>
    );
}
