import axios from 'axios'
import React, { useState, useEffect } from 'react'

function UserTag(props) {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(true)
    const [userImg, setUserImg] = useState(props.imgLink)

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setLoading(false)
                return
            }

            const apiUrl = import.meta.env.VITE_API_URL
            //console.log(apiUrl)

            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                //console.log("Profile loaded:", response.data)

                if (response.data && response.data.user) {
                    const { firstName, lastName, img } = response.data.user
                    setName(`${firstName} ${lastName}`)
                    if (img) {
                        setUserImg(img)
                    }
                }
            } catch (error) {
                console.error("Profile Error:", error.message)

                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.removeItem("token")
                    window.dispatchEvent(new Event('logout'))
                }

                setName("User")
            } finally {
                setLoading(false)
            }
        }

        fetchUserProfile()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.dispatchEvent(new Event('logout'))

        if (props.onLogout) {
            props.onLogout()
        }

        window.location.href = '/login'
    }

    if (loading) {
        return (
            <div className='flex items-center mr-6'>
                <div className='animate-pulse flex items-center'>
                    <div className='rounded-full bg-gray-300 w-[50px] h-[50px]'></div>
                    <div className='ml-3 bg-gray-300 h-4 w-24 rounded'></div>
                </div>
            </div>
        )
    }

    return (
        <div className='flex items-center cursor-pointer mr-6'>
            <img
                className='rounded-full w-[50px] h-[50px] object-cover border-2 border-purple-300'
                src={userImg}
                alt='User Avatar'
            />
            <span className='text-purple-900 ml-3 font-semibold'>
                {name}
            </span>
            <button
                className='ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-semibold text-sm'
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}

export default UserTag