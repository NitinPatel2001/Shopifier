import React, { useContext, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import myContext from '../../../contextAPI/myContext'

const DashLayout = () => {
  const context = useContext(myContext);
  const { OpenSide, triggerOpenSide }= context;
  return (
    <div className='w-full'>
      <div className='flex flex-col lg:flex-row md:gap-2'>
        <div className='flex w-full justify-end lg:hidden px-5 py-5'>
          {OpenSide ? (
            <button
              type="button"
              className="hidden lg:inline-flex -m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => {
                triggerOpenSide(false);
              }}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => {
                triggerOpenSide(true);
              }}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className={`${OpenSide ? "translate-x-0" : "-translate-x-full" } transition-transform duration-300 absolute lg:relative lg:translate-x-0  w-[calc(100vw-32px)] md:w-1/2 lg:w-3/12 h-screen`}>
          <SideBar />
        </div>
        <div className='h-[calc(100vh-60px)] md:h-auto w-full lg:w-9/12 overflow-y-scroll scroll-smooth'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}



export default DashLayout