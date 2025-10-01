import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BsCart4 } from "react-icons/bs";
import UserTag from "./UserTag";


function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem("token")
            setIsLoggedIn(token !== null)
        }

        checkAuthStatus()

        window.addEventListener('storage', checkAuthStatus)
        window.addEventListener('logout', checkAuthStatus)
        window.addEventListener('loginSuccess', checkAuthStatus)

        return () => {
            window.removeEventListener('storage', checkAuthStatus)
            window.removeEventListener('logout', checkAuthStatus)
            window.removeEventListener('loginSuccess', checkAuthStatus)
        }
    }, [])

    return (
        <header className="w-full h-[80px] shadow-2xl flex justify-between items-center px-4 relative bg-white">
            <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none mx-5">
                <img
                    onClick={() => navigate("/")}
                    src="/logo.png"
                    alt="logo"
                    className='w-[50px] h-[50px] md:w-[80px] md:h-[80px] object-cover cursor-pointer hover:opacity-80 transition-opacity rounded-full ml-5'
                />
            </div>

            <nav className='hidden md:flex flex-1 justify-center items-center space-x-8'>
                <Link to="/" className='text-lg font-semibold hover:text-purple-500 transition-colors text-purple-900'>
                    Home
                </Link>
                <Link to="/product" className='text-lg font-semibold hover:text-purple-500 transition-colors text-purple-900'>
                    Product
                </Link>

            </nav>

            <div className='flex items-center space-x-6'>
                <Link
                    to="/cart"
                    className='hidden md:flex text-2xl hover:text-primary transition-colors'
                >
                    <BsCart4 />
                </Link>


                {isLoggedIn ? (

                    <UserTag
                        imgLink="https://w7.pngwing.com/pngs/529/832/png-transparent-computer-icons-avatar-user-profile-avatar.png" name="User"
                        onLogout={() => setIsLoggedIn(false)}
                    />
                ) : (

                    <>
                        <Link
                            to="/login"
                            className='w-full text-center py-2 px-4 bg-[#781D7D] text-white rounded hover:bg-purple-700 transition-colors hidden md:block font-semibold'
                            onClick={() => setDrawerOpen(false)}
                        >
                            Login
                        </Link>
                        <span className="hidden md:block text-gray-400">|</span>
                        <Link
                            to="/sign-up"
                            className='w-full text-center py-2 px-4 bg-[#781D7D] text-white rounded hover:bg-purple-700 transition-colors hidden md:block font-semibold'
                            onClick={() => setDrawerOpen(false)}
                        >
                            SignUP
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
