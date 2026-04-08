import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderItems } from "../../feature/slices/orderSlice";
import { clearCart, decrement, increment, removeItem } from "../../feature/slices/cartSlice";

const Cart = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleIncrement = (item) => {
        const { id } = item
        dispatch(increment({ id, quantity: 1 }));
    };

    const handleDecrement = (item) => {
        const { id, quantity } = item
        if (quantity <= 1) {
            dispatch(removeItem(id));
        }
        dispatch(decrement({ id, quantity: 1 }));
    };

    const placeOrder = () => {
        dispatch(orderItems(cart))
        navigate('/order-confirmation')
        dispatch(clearCart())
    }

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="my-4 mx-8">
            {cart.length > 0 ? (
                <>
                    <div className=" font-medium border-b-2 border-focus-blue inline-block py-1 "><span className="text-focus-purple font-bold text-lg"> Cart Items</span></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                        <div className="lg:col-span-2">
                            {cart?.map(item => (
                                <div className="flex justify-between shadow-lg mb-4 p-4 rounded-md" key={item.id}>
                                    <div className="flex justify-between items-center gap-2">
                                        <div>
                                            <img src={item.image} alt={item.title} className="w-12 h-12" />
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="font-bold">
                                                $ {item.price}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        {item.quantity <= 1 ?  <button onClick={() => handleDecrement(item)} className="bg-focus-purple rounded-md py-1 px-3 text-xl text-white font-bold cursor-pointer"><svg width="16" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                                            : <button onClick={() => handleDecrement(item)} className="bg-focus-purple rounded-md py-1 px-3 text-xl text-white font-bold cursor-pointer w-10">-</button>
                                        }
                                        <div className="border border-focus-purple rounded-md px-3 py-1 text-xl text-center">{item.quantity}</div>
                                        <button onClick={() => handleIncrement(item)} className="bg-focus-purple rounded-md py-1 px-3 text-xl text-white font-bold cursor-pointer">+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="shadow-lg p-4">
                                <div className="font-bold">Summary</div>
                                <div >
                                    {cart.map((item) => (
                                        <div key={item.id} className="grid grid-cols-6 gap-8 justify-between">
                                            <div className="truncate text-sm col-span-3">{item.title}</div>
                                            <div className="col-span-3 text-end">{item.quantity} X {item.price} = {item.quantity * item.price} </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end pt-2">
                                    <div>Total = </div>
                                    <div>$ {calculateTotalPrice().toFixed(2)}</div>
                                </div>
                            </div>
                            <button className="bg-focus-purple rounded-md font-medium text-white w-full px-4 py-2 mt-2 cursor-pointer" onClick={placeOrder}>Place Order</button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center"> No Products in Cart</div>
            )}
        </div>
    );
};

export default Cart;