import React from 'react'
import { useSelector } from 'react-redux';

export default function OrderConfirmation() {
  const { order } = useSelector((state) => state.order);
  
  const calculateTotalPrice = () => {
    return order?.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className='my-2 mx-8'>
      <div className=" font-medium border-b-2 border-focus-blue inline-block py-1 "><span className="text-focus-purple font-bold text-lg"> Orders</span></div>

      <div className='shadow-md p-4 mt-2'>
        <div className='flex justify-between'>
          <div>Order Id #123</div>
          <div> Total Price: $ {calculateTotalPrice().toFixed(2)}</div>
        </div>
        <div className='font-bold py-2'>Items</div>
        <div >
          {order.map((item) => (
            <div key={item.id} className="flex justify-between gap-8 shadow-md mb-4 p-4">
              <div className='flex gap-4'>
                <img src={item.image} alt={item.title} className='w-12 h-12' />
                <div>
                  <div>{item.title}</div>
                  <div className='font-semibold'> $ {item.price}</div>
                </div>
              </div>
              <div>{item.quantity} X {item.price} = {item.quantity * item.price} </div>
            </div>
          ))}
          <div></div>
        </div>
      </div>
    </div>
  )
}
