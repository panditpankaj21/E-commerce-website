import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { incrementQuantity, decrementQuantity, removeItem } from '../redux/cartSlice'; 
import EmptyCart from '../components/EmptyCart';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  // Function to calculate the total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if(cart.length===0){
    return <EmptyCart/>
  }

  return (
    <div className="flex flex-col md:flex-row p-5 gap-8">
      {/* Left side - Cart items */}
      <div className="w-full md:w-3/4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-lg">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-around items-center py-2 mb-5 border rounded shadow">

              <div className="flex items-center gap-4">
                {/* Product image */}
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => dispatch(decrementQuantity(item.id))}
                  className="px-4 py-2 border text-gray-800 rounded-full hover:bg-gray-200"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(incrementQuantity(item.id))}
                  className="px-4 py-2 border text-gray-800 rounded-full hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              
              <div>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-red-600 hover:text-red-800 underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right side - Order summary */}
      <div className="w-full h-full md:w-1/4 p-6 border-l-2 shadow-md bg-gray-50 rounded-lg">
        <h1 className="text-xl font-bold mb-4">Order Summary</h1>
        <div className="flex justify-between mb-2">
          <span>Total Items:</span>
          <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total Price:</span>
          <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-black hover:bg-gray-900 text-white rounded w-full"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
