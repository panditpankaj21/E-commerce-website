import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-5 text-center mt-10">
            <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
            <p className="mb-4 text-gray-600">
                It seems you haven't added anything to your cart yet.
            </p>
            <Link to="/" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-200">
                Start Shopping
            </Link>
        </div>
    );
}

export default EmptyCart;