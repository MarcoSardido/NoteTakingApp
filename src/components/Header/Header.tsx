import { Avatar, Dropdown } from 'flowbite-react'
import React, { useState } from 'react'

const Header = () => {
    const [hasUser, setHasUser] = useState(true)
    return (

        <nav className="p-2 md:p-4 flex justify-between items-center">
            <div className="w-1/4 flex justify-between">
                <span className=" uppercase font-mono font-bold text-[25px]">post it!</span>
                {!hasUser && <button className='p-2 bg-red-500 text-xs rounded-md uppercase font-semibold'>sign in with google</button>}
            </div>
            <div className=" w-1/3">
                <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="simple-search" className="bg-transparent border border-[#486def] text-white text-sm font-medium rounded-lg focus:ring-[#486def] focus:border-[#486def] block w-full pl-10 p-2.5" placeholder="Search" required />
                    </div>
                </form>
            </div>
            <div className=" w-1/6 flex justify-end gap-5">
                <button className=' border border-[#486def] rounded-md p-2 font-semibold hover:border-none hover:bg-[#486def] '>Create a note</button>
                {hasUser && (
                    <div className="flex items-center">
                        <button type="button" className="flex mr-3 text-base bg-gray-800 rounded-full focus:ring-2 focus:ring-[#486def]" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-10 h-10 object-cover rounded-full" src="https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?w=740&t=st=1681913250~exp=1681913850~hmac=e0440a96b33c56c59c7d8541c017a4106444f6f699abe0501c731ea6092a4ba4" alt="user photo" />
                        </button>
                        <div className="z-50 hidden my-4 text-base list-none divide-y divide-gray-400 rounded-lg shadow" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-base text-white ">MarcoSardido</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">marcosardido@gmail.com</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

            </div>

        </nav>

    )
}

export default Header