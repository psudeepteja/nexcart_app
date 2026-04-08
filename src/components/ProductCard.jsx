import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, decrement, increment, removeItem } from '../feature/slices/cartSlice';
import { useSnackbar, closeSnackbar } from 'notistack';
import { SkeletonProductCard } from '../utils/Skeleton/SkeletonProductCard';

const ProductCard = ({ product, categoryId }) => {
  const { title, image, price, id } = product
  const { isLoading } = useSelector((state) => state.product)
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  const cartItems = { ...product, quantity: 1 }
  const exstingCartItem = cart.find(i => i.id === id)

  const handleCart = useCallback(() => {
    if (!exstingCartItem) {
      dispatch(addToCart([cartItems]))
      enqueueSnackbar('Item added to the cart', {
        variant: 'default',
        style: { backgroundColor: "#7B2CBF" },
        action: (key) => (
          <div className='flex gap-2 items-center justify-center'>
            <button className='font-bold' onClick={() => navigate(`/cart`)}>
              View cart
            </button>
            <button className='font-bold text-lg pb-1' onClick={() => closeSnackbar(key)}>
              x
            </button>
          </div>
        )
      });
    }
  }, [enqueueSnackbar, closeSnackbar]);

  const handleIncrement = (id) => {
    dispatch(increment({ id, quantity: 1 }));
  };

  const handleDecrement = (id) => {
    dispatch(decrement({ id, quantity: 1 }));
    if (exstingCartItem.quantity <= 1) {
      dispatch(removeItem(id))
    }
  };

  return (
    <>
      {isLoading === "pending" ?
        <SkeletonProductCard />
        :
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 p-4 cursor-pointer">
          <div onClick={() => {
            navigate(`/products/category/${categoryId}/${product.id}`,
              { state: product })
          }} className='flex flex-col items-center'>
            <img className="w-20 h-20 md:w-40 md:h-40" src={image} alt={title} />
            <div className=" pt-4">
              <div className="font-bold mb-2 truncate max-w-30 md:max-w-60">{title}</div>
            </div>
            <p className="text-gray-700 text-base font-semibold">
              $ {price}
            </p>
          </div>

          {exstingCartItem ? (
            <div className='grid grid-cols-3 gap-4 mt-2 justify-center w-full items-center'>
              {exstingCartItem.quantity > 1 ? (
                <button onClick={() => handleDecrement(exstingCartItem.id)} className="bg-focus-purple rounded-md py-1 px-2 text-xl text-white font-bold cursor-pointer">-</button>
              ) : (
                <button onClick={() => handleDecrement(exstingCartItem.id)} className="bg-focus-purple rounded-md py-2 px-2 text-xl text-white font-bold flex justify-center cursor-pointer">
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
              )}
              <div className="border border-focus-purple rounded-md px-4 py-1 text-xl text-center">{exstingCartItem.quantity}</div>
              <button onClick={() => handleIncrement(exstingCartItem.id)} className="bg-focus-purple rounded-md py-1 px-2 text-xl text-white font-bold cursor-pointer">+</button>
            </div>
          ) : (
            <button className='w-full py-2 rounded mt-2 bg-focus-purple font-bold text-white cursor-pointer' onClick={handleCart}>Add to Cart</button>
          )}
        </div>
      }
    </>
  );
};

export default ProductCard;
