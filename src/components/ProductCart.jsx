import { Link } from "react-router-dom";


export default function ProductCard({ product }) {
    return (
        <Link to={"/overview/" + product.productId} className="w-[300px] h-[400px] shadow-md rounded-lg m-4 p-4 flex flex-col justify-between">
            <img
                src={product.images[0]}
                alt={product.ProductName}
                className="w-full h-[200px] object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.ProductName}</h3>
            <p className="text-gray-600 mb-2">{product.description.slice(0, 100)}...</p>
            <div className="flex justify-between items-center">

                <p className="text-lg font-bold text-blue-600">Rs. {product.price}</p>

                <span
                    className={`text-sm px-2 py-1 rounded-full ${product.isAvailable ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                        }`}
                >
                    {product.isAvailable ? "In Stock" : "Out of Stock"}
                </span>
            </div>
        </Link>
    );
}
