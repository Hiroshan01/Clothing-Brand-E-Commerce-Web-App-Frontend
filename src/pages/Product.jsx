import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCart";

export default function ProductPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Search debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    // Initial products load
    useEffect(() => {
        fetchAllProducts();
    }, []);

    // Search functionality
    useEffect(() => {
        if (debouncedQuery.trim()) {
            fetchSearchResults();
        } else {
            setSearchResults([]);
            setIsSearching(false);
        }
    }, [debouncedQuery]);

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

    const fetchSearchResults = () => {
        setIsSearching(true);
        const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/products/search/${encodeURIComponent(debouncedQuery)}`;

        axios
            .get(endpoint)
            .then((res) => {
                setSearchResults(res.data || []);
                setIsSearching(false);
            })
            .catch((error) => {
                console.error("Error fetching search results:", error);
                setSearchResults([]);
                setIsSearching(false);
            });
    };

    // Search query 
    const displayProducts = query.trim() ? searchResults : allProducts;
    const loading = query.trim() ? isSearching : isLoading;

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="flex-1 w-full p-6 flex flex-col">
                {/* Search Input */}
                <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Results Display */}
                {loading ? (
                    <div className="w-full h-64 flex justify-center items-center">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : displayProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {displayProducts.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full text-center text-gray-500 mt-8">
                        {query.trim() ?
                            `"${query}" For Products Not Found` :
                            "Products Not Found"
                        }
                    </div>
                )}
            </div>
        </div>
    );
}
