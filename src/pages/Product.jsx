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

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        size: '',
        minPrice: '',
        maxPrice: ''
    });

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
    const fetchFilteredProducts = () => {
        setIsFiltering(true);

        // Query params
        const params = new URLSearchParams();

        if (filters.category) params.append('category', filters.category);
        if (filters.size) params.append('size', filters.size);
        if (filters.minPrice) params.append('price[gte]', filters.minPrice);
        if (filters.maxPrice) params.append('price[lte]', filters.maxPrice);

        const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/products/products_search?${params.toString()}`;

        axios
            .get(endpoint)
            .then((res) => {
                setFilteredProducts(res.data.products || []);
                setIsFiltering(false);
            })
            .catch((error) => {
                console.error("Error fetching filtered products:", error);
                setFilteredProducts([]);
                setIsFiltering(false);
            });
    };

    useEffect(() => {
        const hasFilters = filters.category || filters.size || filters.minPrice || filters.maxPrice;

        if (hasFilters) {
            fetchFilteredProducts();
        } else {
            setFilteredProducts([]);
        }
    }, [filters]);


    // UPDATED: Display logic
    const hasFilters = filters.category || filters.size || filters.minPrice || filters.maxPrice;
    const displayProducts = query.trim()
        ? searchResults
        : hasFilters
            ? filteredProducts
            : allProducts;

    const loading = query.trim() ? isSearching : hasFilters ? isFiltering : isLoading;

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="flex-1 w-full p-6 flex gap-6">

                {/*LEFT SIDEBAR - Filters */}
                <div className="w-64 flex-shrink-0 bg-white p-4 rounded-lg shadow-md h-fit sticky top-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>

                    {/* Category Filter */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">All Categories</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kids">Kids</option>
                        </select>
                    </div>

                    {/* Size Filter */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Size
                        </label>
                        <select
                            value={filters.size}
                            onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">All Sizes</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price Range
                        </label>
                        <div className="space-y-2">
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={filters.minPrice}
                                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    {/* Clear Filters Button */}
                    <button
                        onClick={() => setFilters({ category: '', size: '', minPrice: '', maxPrice: '' })}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>

                {/*RIGHT SIDE - Products */}
                <div className="flex-1 flex flex-col">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
    );
}
