import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCart";


export default function ProductPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = () => {
        setIsLoading(true);
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/allProduct`)
            .then((res) => {
                setAllProducts(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            });
    };

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="flex-1 w-full p-6">
                {isLoading ? (
                    <div className="w-full h-64 flex justify-center items-center">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : allProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {allProducts.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full text-center text-gray-500 mt-8">
                        No products found
                    </div>
                )}
            </div>
        </div>
    );
}
