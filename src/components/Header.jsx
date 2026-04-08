import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { MaterialSymbolsShoppingCart } from '../icons/cart'
import Popover from '../utils/popover';

export default function Header() {
  const userDetails = sessionStorage.getItem("userName")
  const { cart } = useSelector((state) => state.cart);
  const cartQtyItems = cart.map((i) => i.quantity)
  const cartQty = cartQtyItems.reduce((acc, sum) => acc + sum, 0)
  const navigate = useNavigate()
  const location = useLocation()
  const handleLogout = () => {
    sessionStorage.removeItem("userName");
    navigate('/auth')
  }

  return (
    <div className='flex justify-between items-center shadow-md px-4 md:px-8 py-2 h-14 z-10'>
      {/* <div className='font-bold text-orange-600 text-2xl cursor-pointer' onClick={() => navigate('/')}>E-Cart</div> */}
      <span className="col-span-3 flex items-center">
        {/* <svg height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="fill-current text-sky-900"><path d="M112 0C85.5 0 64 21.5 64 48l0 48L16 96c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 208 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 160l-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l16 0 176 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 224l-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 144 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 288l0 128c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L112 0zM544 237.3l0 18.7-128 0 0-96 50.7 0L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" /></svg> */}
        <span className="font-bold text-2xl text-focus-blue">Nex</span><span className="font-bold text-2xl text-focus-purple">Cart</span>
      </span>
      <div className='flex gap-2 items-center justify-center'>
        {location.pathname.slice(1) && (
          <div onClick={() => navigate('/')} className='cursor-pointer'>
            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2796 3.71579C12.097 3.66261 11.903 3.66261 11.7203 3.71579C11.6678 3.7311 11.5754 3.7694 11.3789 3.91817C11.1723 4.07463 10.9193 4.29855 10.5251 4.64896L5.28544 9.3064C4.64309 9.87739 4.46099 10.0496 4.33439 10.24C4.21261 10.4232 4.12189 10.6252 4.06588 10.8379C4.00765 11.0591 3.99995 11.3095 3.99995 12.169V17.17C3.99995 18.041 4.00076 18.6331 4.03874 19.0905C4.07573 19.536 4.14275 19.7634 4.22513 19.9219C4.41488 20.2872 4.71272 20.5851 5.07801 20.7748C5.23658 20.8572 5.46397 20.9242 5.90941 20.9612C6.36681 20.9992 6.95893 21 7.82995 21H7.99995V18C7.99995 15.7909 9.79081 14 12 14C14.2091 14 16 15.7909 16 18V21H16.17C17.041 21 17.6331 20.9992 18.0905 20.9612C18.5359 20.9242 18.7633 20.8572 18.9219 20.7748C19.2872 20.5851 19.585 20.2872 19.7748 19.9219C19.8572 19.7634 19.9242 19.536 19.9612 19.0905C19.9991 18.6331 20 18.041 20 17.17V12.169C20 11.3095 19.9923 11.0591 19.934 10.8379C19.878 10.6252 19.7873 10.4232 19.6655 10.24C19.5389 10.0496 19.3568 9.87739 18.7145 9.3064L13.4748 4.64896C13.0806 4.29855 12.8276 4.07463 12.621 3.91817C12.4245 3.7694 12.3321 3.7311 12.2796 3.71579ZM11.1611 1.79556C11.709 1.63602 12.2909 1.63602 12.8388 1.79556C13.2189 1.90627 13.5341 2.10095 13.8282 2.32363C14.1052 2.53335 14.4172 2.81064 14.7764 3.12995L20.0432 7.81159C20.0716 7.83679 20.0995 7.86165 20.1272 7.88619C20.6489 8.34941 21.0429 8.69935 21.3311 9.13277C21.5746 9.49916 21.7561 9.90321 21.8681 10.3287C22.0006 10.832 22.0004 11.359 22 12.0566C22 12.0936 22 12.131 22 12.169V17.212C22 18.0305 22 18.7061 21.9543 19.2561C21.9069 19.8274 21.805 20.3523 21.5496 20.8439C21.1701 21.5745 20.5744 22.1701 19.8439 22.5496C19.3522 22.805 18.8274 22.9069 18.256 22.9543C17.706 23 17.0305 23 16.2119 23H15.805C15.7972 23 15.7894 23 15.7814 23C15.6603 23 15.5157 23.0001 15.3883 22.9895C15.2406 22.9773 15.0292 22.9458 14.8085 22.8311C14.5345 22.6888 14.3111 22.4654 14.1688 22.1915C14.0542 21.9707 14.0227 21.7593 14.0104 21.6116C13.9998 21.4843 13.9999 21.3396 13.9999 21.2185L14 18C14 16.8954 13.1045 16 12 16C10.8954 16 9.99995 16.8954 9.99995 18L9.99996 21.2185C10 21.3396 10.0001 21.4843 9.98949 21.6116C9.97722 21.7593 9.94572 21.9707 9.83107 22.1915C9.68876 22.4654 9.46538 22.6888 9.19142 22.8311C8.9707 22.9458 8.75929 22.9773 8.6116 22.9895C8.48423 23.0001 8.33959 23 8.21847 23C8.21053 23 8.20268 23 8.19495 23H7.78798C6.96944 23 6.29389 23 5.74388 22.9543C5.17253 22.9069 4.64769 22.805 4.15605 22.5496C3.42548 22.1701 2.8298 21.5745 2.4503 20.8439C2.19492 20.3523 2.09305 19.8274 2.0456 19.2561C1.99993 18.7061 1.99994 18.0305 1.99995 17.212L1.99995 12.169C1.99995 12.131 1.99993 12.0936 1.99992 12.0566C1.99955 11.359 1.99928 10.832 2.1318 10.3287C2.24383 9.90321 2.42528 9.49916 2.66884 9.13277C2.95696 8.69935 3.35105 8.34941 3.87272 7.8862C3.90036 7.86165 3.92835 7.83679 3.95671 7.81159L9.22354 3.12996C9.58274 2.81064 9.89467 2.53335 10.1717 2.32363C10.4658 2.10095 10.781 1.90627 11.1611 1.79556Z" fill="#7B2CBF"></path> </g></svg>
          </div>
        )}
        <div>
          <Popover
            trigger={<svg width="28px" height="28px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#7B2CBF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>user-profile-circle</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <g> <path d="M24,10a8,8,0,1,0,8,8A8,8,0,0,0,24,10Zm0,12a4,4,0,1,1,4-4A4,4,0,0,1,24,22Z"></path> <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM11.8,37.2A26.4,26.4,0,0,1,24,34a26.4,26.4,0,0,1,12.2,3.2,17.9,17.9,0,0,1-24.4,0Zm27.1-3.1h0A30.7,30.7,0,0,0,24,30,30.7,30.7,0,0,0,9.1,34.1h0A17.7,17.7,0,0,1,6,24a18,18,0,0,1,36,0,17.7,17.7,0,0,1-3.1,10.1Z"></path> </g> </g> </g> </g></svg>}
            position="bottom-right"
          >
            <div>
              {/* <p className="text-sm font-medium">You have 3 new notifications</p> */}
              <div className="mt-2 space-y-1 text-sm text-gray-700">
                {userDetails ? (
                  <div>
                    <p>Hello, {userDetails} </p>
                    <button className='px-4 py-2 bg-focus-purple rounded-lg text-white cursor-pointer' onClick={handleLogout}>Logout</button>
                  </div>
                ) : (
                  <button className='px-4 py-2 bg-focus-purple rounded-lg text-white cursor-pointer' onClick={()=> navigate('/auth')}>Login</button>
                )
                }
              </div>
            </div>
          </Popover>
        </div>
        <div className='relative cursor-pointer pt-1' onClick={() => navigate('/cart')}>
          <div >
            <MaterialSymbolsShoppingCart />
          </div>
          <div className='absolute -top-3 right-0 font-bold text-focus-purple text-md'>{cartQty}</div>
        </div>
      </div>
    </div>
  )
}
