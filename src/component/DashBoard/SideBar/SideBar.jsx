import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import myContext from '../../../contextAPI/myContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

const SideBar = () => {
    const context = useContext(myContext);
    const { triggerOpenSide } = context;
    return (
        <div className='fixed h-[calc(100vh-32px)] w-full border-2 m-4 rounded-lg bg-white'>
            <div className='p-5 m-5 flex flex-col gap-10 '>
                <div className='flex flex-col '>
                    <button
                        type="button"
                        className="inline-flex lg:hidden -m-2.5 rounded-md p-2.5 text-gray-700"
                        onClick={() => {
                            triggerOpenSide(false);
                        }}
                    >
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className='font-bold text-xl md:text-xl lg:text-xl font-mono'>Shopifier DashBoard</div>
                <div className='flex flex-col gap-5 font-mono'>
                    {/* <Link to='' className='hover:bg-black py-2 text-3xl lg:text-xl px-4 hover:text-white rounded-lg'>Home</Link> */}
                    <Link to='AddProduct' onClick={() => triggerOpenSide(false)} className='hover:bg-black text-xl lg:text-xl py-2 px-4 hover:text-white rounded-lg'>Add Product</Link>
                    <Link to='AllProduct' onClick={() => triggerOpenSide(false)} className='hover:bg-black text-xl lg:text-xl py-2 px-4 hover:text-white rounded-lg'>All Product</Link>
                    <Link to='/' onClick={() => triggerOpenSide(false)} className='hover:bg-black text-xl lg:text-xl py-2 px-4 hover:text-white rounded-lg'>Back To Home</Link>
                    {/* <Link to='AllUsers' className='hover:bg-black py-2 px-4 hover:text-white rounded-lg'>All Users</Link> */}
                </div>
            </div>
        </div>
    )
}

export default SideBar