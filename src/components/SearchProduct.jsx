import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchProductPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.trim()) {
            fetchSearchResults();
        } else {
            setAllProducts([]);
            setIsLoading(false);
        }
    }, [debouncedQuery]);

    const fetchSearchResults = () => {
        setIsLoading(true);

        const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/product/search/${encodeURIComponent(debouncedQuery)}`;

        axios
            .get(endpoint)
            .then((res) => {
                setAllProducts(res.data || []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setAllProducts([]);
                setIsLoading(false);
            });
    };

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="flex-1 w-full p-6 flex flex-col">
                <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {isLoading ? (
                    <div className="w-full h-64 flex justify-center items-center">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="w-full text-center text-gray-500 mt-8">
                        {query.trim() ?
                            (allProducts.length > 0 ?
                                `Found ${allProducts.length} products for "${query}"` :
                                `No products found for "${query}"`) :
                            "Enter a search term to find products"
                        }
                    </div>
                )}
            </div>
        </div>
    );
}
