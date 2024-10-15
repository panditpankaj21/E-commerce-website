import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

interface BookCardProps {
    id: string
    title: string
    image: string
    price: number
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
    const dispatch = useDispatch();

    return (
        <div className="border p-4 rounded flex flex-col h-full">
            <Link to={`/product/${id}`} className="flex-grow">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-32 object-cover mb-2"
                />
                <h2 className="font-bold">{title}</h2>
                <p>${price}</p>
            </Link>
            <button 
                className="mt-2 px-2 py-1 bg-black hover:bg-gray-900 text-white rounded"
                onClick={() => dispatch(addToCart({
                    id: parseInt(id), 
                    title, 
                    price, 
                    image,
                    quantity: 1,
                }))}
            >
                Add to Cart
            </button>
        </div>
    );
}

export default BookCard;
