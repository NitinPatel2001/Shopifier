import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../../App';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  localStorage.clear('user')
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleChange = async () => {

    if(Email === '' || Password === '') {
      alert('Please Fill All the Details');
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, Email, Password);
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/')
    }
    catch (err){
      if(err === "FirebaseError: Firebase: Error (auth/invalid-credential).") {
        alert("Invalid Credentials")
      }
      else if(err === "FirebaseError: Firebase: Error (auth/invalid-email).") {
        alert("Invalid Email")
      }
      else
        alert(err)
    }


  }

  return (
    <div className='h-screen grid grid-cols-1 lg:grid-cols-2'>
        <div className='hidden bg-cover bg-no-repeat lg:flex lg:justify-center lg:h-full lg:items-center'>
          <img className='h-screen w-screen' alt='Login_Image' src='https://c.ndtvimg.com/gws/ms/7-tips-for-shopping-on-e-commerce/assets/2.jpeg?1692602258' />
        </div>
        <div className='flex justify-center h-full items-center'>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Welcome 👋🏻
            </h1>
            <h4 className='text-left text-sm font-bold leading-9 tracking-tight text-gray-400'>Please Login Here</h4>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleChange}
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <div className='py-4 font-bold'>New User ? <Link className='px-1 text-sky-600' to='/signup'>Create an Account</Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login