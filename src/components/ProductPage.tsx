import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

interface Product {
    id: number
    title: string
    description: string
    price: number
    rating: number
    images: string[]
}

const SkeletonLoader = () => {
    return (
        <div className="p-5 w-[60%] animate-pulse">
            <div className="mb-5">
                <div className="h-10 w-24 bg-gray-300 rounded"></div>
            </div>

            <div className="h-48 w-full bg-gray-300 rounded mb-8"></div>

            <div className="h-8 w-[70%] bg-gray-300 rounded mb-4"></div>
            <div className="h-6 w-[40%] bg-gray-300 rounded mb-4"></div>

            <div className="flex">
                <div className="h-6 w-20 bg-gray-300 rounded"></div>
                <div className="h-6 w-20 bg-gray-300 rounded ml-10"></div>
            </div>
        </div>
    );
}

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (id) {
            axios.get<Product>(`https://dummyjson.com/products/${id}`)
                .then(res => setProduct(res.data))
                .catch(err => console.error(`Error while fetching specific product ${err}`))
        }
    }, [id]);

    if (!product) {
        return <SkeletonLoader />;
    }

    return (
        <div className="p-5 w-[60%]">
            <button
                onClick={() => navigate(-1)}
                className="mb-5 px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition duration-200"
            >
                {`< Back`}
            </button>

            <img
                src={product.images[0]}
                alt={product.title}
                className="w-[50%] h-auto mb-8 border rounded-lg shadow-md"
            />

            <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
            <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>

            <div className="flex">
                <p className="font-semibold text-lg">Price: ${product.price}</p>
                <p className="font-semibold text-lg ml-10">Rating: {product.rating}</p>
            </div>
        </div>
    );
}

export default ProductPage;
