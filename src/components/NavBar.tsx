import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';


interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}
  
const getTotalQuantity = (cart: CartItem[]): number => {
    let total = 0
    cart.forEach(item => {
        total += item.quantity
    })
    return total
}

export const NavBar = () => {
    const cartObject = useSelector((state: RootState) => state.cart);
    const totalItemsInCart = getTotalQuantity(cartObject.cart)

  return (
    <div className="px-4 py-2 border-2 flex justify-between items-center">
        <button className='font-bold text-green-600'>
            Keep Shopping :)
        </button>
        <div>
            <Link to={`/`}>
                <button 
                    className="px-4 py-2 border text-black rounded mr-5 hover:bg-gray-200"
                >
                    Products
                </button>
            </Link>
            <Link to={`/cart`}>
                <button 
                    className="px-4 py-2 border text-black rounded hover:bg-gray-200"
                >
                    {`Cart ${ totalItemsInCart ? `(${totalItemsInCart})` : ""}`}
                </button>
            </Link>
        </div>
    </div>
  )
}
