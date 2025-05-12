import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const {user, setUser, setshowUserLogin, navigate} = useAppContext();

    const logout = async ()=>{
        setUser(null);
        navigate('/')
    }
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to='/'>
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Product</NavLink>
                <NavLink to='/'>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt='search' className='w-4 h-4' />
                </div>

                <div className="relative cursor-pointer">
                    <img src={assets.cart_icon} alt='cart' className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
                </div>

                <button className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt='menu' />
            </button>

            {/* Mobile Menu */}
            
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
                {user && 
                <NavLink to="/products" onClick={() => setOpen(false)}>My Orders</NavLink>
                }
                <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

                {!user ? (
                    <button onClick={() =>{
                        setOpen(false);
                        setshowUserLogin(true);
                    }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary transition text-white rounded-full text-sm">
                    Login
                </button>
                ) : (
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary transition text-white rounded-full text-sm">
                    LogOut
                </button>
                )
                }
                
            </div>
            )}
            

        </nav>
  )
}

export default Navbar