import { Fragment, useEffect, useState, useContext, useCallback } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { motion } from "framer-motion"
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FaMale, FaFemale, FaChild } from "react-icons/fa";
import { LiaShoePrintsSolid } from "react-icons/lia";
import { db } from '../../App';
import { collection, getDocs, query, where } from 'firebase/firestore';
import myContext from '../../contextAPI/myContext';
import { Link } from 'react-router-dom';

const Category = [
  { name: 'Men', description: 'Cool Mens Collections', href: '/productlist', state: { category: 'Men' }, icon: FaMale },
  { name: 'Women', description: 'Fashionable Women Collections', href: '/productlist', state: { category: 'Women' }, icon: FaFemale },
  { name: 'Kids', description: 'Kids Collections', href: '/productlist', state: { category: 'Kids' }, icon: FaChild },
  { name: 'Footwear', description: 'Durable Footwear Collection', href: '/productlist', state: { category: 'Footwear' }, icon: LiaShoePrintsSolid },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [UserData, setUserData] = useState([]);
  const context = useContext(myContext);
  const { Loading, triggerLoading } = context;

  const fetchdata = useCallback(async () => {
    const citiesRef = collection(db, 'Users');
    const q = query(citiesRef, where('email', '==', JSON.parse(localStorage.user).user.email))
    const docref = await getDocs(q);
    let product = []
    docref.forEach((doc) => {
      product.push({
        id: doc.id,
        data: doc.data(),
      })
    })
    setUserData(product)
  }, [])

  useEffect(() => {
    triggerLoading(true);
    if (localStorage.user) {
      fetchdata()
    }
    triggerLoading(false);
  }, [fetchdata, triggerLoading])

  return (
    <>
      {Loading ? (<p className='flex h-screen flex-row justify-center items-center'>
        <div>Loading...</div>
      </p>) : (
        <header className="bg-gray-900">
          <nav className="mx-auto flex max-w-full items-center justify-between gap-5 p-4 px-4 lg:px-10 sm-px-10" aria-label="Global">
            <div className="flex lg:flex-1">
              <Link to="/">
                <span className='text-2xl font-semibold font-sans' style={{ color: "#edf7f6" }}>SHOPIFIER</span>
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <Popover.Group className="hidden lg:flex lg:gap-x-6 lg:item-center lg:justify-between">

              <Link to='/' className="text-md font-semibold leading-6 text-gray-900" style={{ color: "#edf7f6" }}>
                Home
              </Link>
              <Popover className="relative">
                <Popover.Button style={{ color: "#edf7f6" }} className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-900 focus:ring-transparent focus:border-transparent outline-none">
                  Shop
                  <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition transform duration-1000"
                  enterFrom="opacity-0 scale-0"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-50"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {Category.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                          </div>
                          <div className="flex-auto">
                            <Link to={item.href} state={item.state} className="block font-semibold text-gray-900">
                              {item.name}
                              <span className="absolute inset-0" />
                            </Link>
                            <p className="mt-1 text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>

              <Link style={{ color: "#edf7f6" }} className="text-md font-semibold leading-6 text-gray-900">
                Our Story
              </Link>

              <Link style={{ color: "#edf7f6" }} className="text-md font-semibold leading-6 text-gray-900">
                Blog
              </Link>

              <Link style={{ color: "#edf7f6" }} className="text-md font-semibold leading-6 text-gray-900">
                Contact Us
              </Link>

              {localStorage.user && JSON.parse(localStorage.user).user.email === process.env.REACT_APP_ADMIN_EMAIL ? (
                <Link style={{ color: "#edf7f6" }} to="/dashboard/AllProduct" className="text-md font-semibold leading-6 text-gray-900">
                  Admin
                </Link>
              ) : ('')}

            </Popover.Group>
            {localStorage.user ? (
              <div className='hidden text-md lg:flex lg:flex-1 lg:gap-x-4 lg:justify-end lg:items-center'>
                {UserData.length > 0 ? (
                  <p style={{ color: "#ffa8B6" }} className='font-bold text-black tracking-wide uppercase'>
                    {UserData.length === 0 ? '' : UserData[0].data.FirstName}
                  </p>
                ) : (
                  <p></p>
                )}
                <Link to="/Login" className="text-md font-semibold leading-6 text-gray-600 lg:px-6 lg:py-2 lg:bg-white lg:rounded-lg">
                  Logout
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link to="/Login" className="text-lg font-semibold leading-6 text-gray-900 lg:px-8 lg:py-2 lg:bg-white lg:rounded-lg">
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </nav >
          <Transition
            as={Fragment}
            show={mobileMenuOpen}
            appear
          >
            <Dialog as="div" className="relative lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="ease-in-out transition duration-1000"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in-out transition duration-1000"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="-m-1.5 p-1.5">
                      <span className='text-2xl font-extrabold font-sans text-gray-900'>SHOPIFIER</span>
                    </Link>
                    <button
                      type="button"
                      className="-m-2.5 rounded-md p-2.5 bg-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">

                      <div className="space-y-2 py-6">
                        <Link
                          to="/"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Home
                        </Link>
                        <Disclosure as="div" className="-mx-3">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Product
                                <ChevronDownIcon
                                  className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="mt-2 space-y-2">
                                {[...Category].map((item) => (
                                  <Disclosure.Button
                                    key={item.name}
                                    as="div"
                                    className="block"
                                  >
                                    <Link to={item.href} state={item.state} onClick={()=>setMobileMenuOpen(false)} className='block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50'>{item.name}</Link>
                                  </Disclosure.Button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        {localStorage.user && JSON.parse(localStorage.user).user.email === process.env.REACT_APP_ADMIN_EMAIL ? (
                          <Link to="/DashBoard/AllProduct" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            Admin
                          </Link>
                        ) : ('')}
                        <Link
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          About Us
                        </Link>
                        <Link
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Blog
                        </Link>
                        <Link
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Contact Us
                        </Link>
                      </div>
                      {localStorage.user ? (
                        <div className='py-6 flex flex-col gap-3'>
                          {UserData.length > 0 ? (
                            <p className='font-bold text-black tracking-wide'>
                              {UserData.length === 0 ? '' : UserData[0].data.FirstName + " " + UserData[0].data.LastName}
                            </p>
                          ) : (
                            <p></p>
                          )}
                          <Link to="/Login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            Logout
                          </Link>
                        </div>
                      ) : (
                        <div className="py-6">
                          <Link
                            to="/login"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Log in
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </Dialog>
          </Transition>
        </header >
      )
      }
    </>
  )
}
