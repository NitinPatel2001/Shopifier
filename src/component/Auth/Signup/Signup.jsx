import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, db } from '../../../App';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Signup = () => {

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Checkbox, setCheckbox] = useState('')
  const [ , setLoading] = useState(false);

  const handleChange = async () => {
    if (FirstName === '' || LastName === '' || Email === '' || Password === '' || Checkbox === false) {
      alert("Field Required");
      return;
    }
    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, Email, Password);
      const user = {
        FirstName: FirstName,
        LastName: LastName,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now()
      }

      const Docref = collection(db, 'Users');
      await addDoc(Docref, user);
      alert("Account Created");
      setEmail('');
      setFirstName('');
      setPassword('');
      setLastName('');
      setLoading(false);
    }
    catch (err) {
      if (err === "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
        alert("Email Already In Use, Please Login or Signup With Another Email");
      }
      else if(err === "FirebaseError: Firebase: Error (auth/invalid-email).") {
        alert("Please Enter a Valid Email");
      }
      else if(err === "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).") {
        alert("Password Should be atleast 6 Character");
      }
      else {
        alert("Contact Admin")
      }
      // alert("Account Does not Created, Please contact the administrator");
    }
  }

  return (
    <div className='h-screen grid grid-cols-1 lg:grid-cols-2'>
      <div className='hidden bg-cover bg-no-repeat lg:flex lg:justify-center lg:h-full lg:items-center'>
        <img className='h-screen w-screen' alt='Login_Image' src='https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg' />
      </div>
      <div className='flex justify-center h-full items-center'>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create New Account
            </h1>
            <h4 className='text-left text-sm font-bold leading-9 tracking-tight text-gray-400'>
              Please Enter Details
            </h4>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="firstname"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="lastname"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
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
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  checked = {Checkbox}
                  onChange={(e) => setCheckbox(e.target.checked)}
                />
                <h4 className='text-left text-sm leading-2 tracking-tight text-black'>I agree to the <span className='font-bold text-black'>term and condition</span></h4>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleChange}
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Signup
                </button>
              </div>
            </form>
            <div className='font-bold py-4'>Already a User ? <Link className='text-sky-600' to='/login'>Sign In</Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup