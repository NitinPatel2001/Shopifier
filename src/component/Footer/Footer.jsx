import React, { useContext } from 'react'
import Logo from '../../Assets/Logo.png'
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import myContext from '../../contextAPI/myContext';
import { Link } from 'react-router-dom';

const Footer = () => {
    const context = useContext(myContext);
    const { Loading } = context;
    return (
        <>
            {
                Loading ? '' : (
                    <div className='m-0 p-0 bg-gray-900 w-full'>
                        <div className='grid grid-cols-1 lg:grid-cols-3 px-4 py-5 gap-10 justify-center text-sm lg:px-24 lg-py-10'>
                            <div className="flex flex-row lg:flex-col lg:flex-1 text-white gap-4 px-2 justify-around items-center lg:items-start">
                                <Link to="/" className="flex flex-row justify-center basis-1/2 -m-1.5 p-1.5">
                                    <img className="h-14 aspect-square" src={Logo} alt="Logo" />
                                </Link>
                                <div className='flex flex-col justify-around'>
                                    <div className='font-thin flex flex-row items-center justify-left gap-4'><FaPhone className='h-10' /><div className='text-justify'>+91 9205287644</div></div>
                                    <div className='font-thin flex flex-row items-center justify-left gap-4'><MdEmail className='h-10' /><div className='text-justify'>np68715@gmail.com</div></div>
                                    <div className='font-thin text-center items-center justify-left lg:text-start flex flex-row gap-4'><FaRegAddressCard className='h-10' /><div className='text-justify'>F1/68, DDA FLATS, <br/>SUNDER NAGRI, DELHI - 110093</div></div>
                                </div>
                            </div>
                            <div className='flex flex-row text-white justify-around gap-10 w-full'>
                                <div className='flex flex-row'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='font-bold text-lg'>Information</div>
                                        <div className='font-thin text-md'>My Account</div>
                                        <div className='font-thin text-md'>Login</div>
                                        <div className='font-thin text-md'>My Cart</div>
                                        <div className='font-thin text-md'>My WishList</div>
                                        <div className='font-thin text-md'>Checkout</div>
                                    </div>
                                </div>
                                <div className='flex flex-row'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='font-bold text-lg'>Services</div>
                                        <div className='font-thin text-md'>About Us</div>
                                        <div className='font-thin text-md'>Careers</div>
                                        <div className='font-thin text-md'>Delivery Information</div>
                                        <div className='font-thin text-md'>Privacy Policy</div>
                                        <div className='font-thin text-md'>Term and Conditions</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col text-white gap-4 p-x-2 items-center lg:items-start order-2 lg:px-10'>
                                <div className='font-bold text-lg'>Subscribe</div>
                                <p className='text-md font-thin'>Enter your Email below to be the first to know about new collections and products launches</p>

                                <div className='flex flex-row w-full justify-between items-center px-4 py-2 border-2 gap-3 border-white border-solid rounded-lg'>
                                    <input className='w-full bg-gray-900 ring-0 border-0 inset-0 p-2' placeholder='Email' />
                                    <span aria-hidden="true" className='text-lg'>&rarr;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Footer