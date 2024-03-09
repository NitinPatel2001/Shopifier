import React, { useState } from 'react'
import { db, storage } from '../../../App';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const AddProduct = () => {

  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [About, setAbout] = useState('');
  const [Category, setCategory] = useState('Men');
  const [Image, setImage] = useState('');
  const [Description, setDescription] = useState('');
  const [Percent, setPercent] = useState(0);
  const [Upload, setUpload] = useState(false);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  const HandleSubmit = async () => {

    if (Name === '' || Price === '' || About === '' || Category === '' || Image === '' || Description === '') {
      alert("Please Fill All The Details");
      return;
    }
    setUpload(true);

    const docu = collection(db, 'AllProducts');
    const data = await addDoc(docu, {
      name: Name,
      price: Price,
      about: About,
      category: Category,
      description: Description,
      checked: false,
    })

    const ID = data.id;

    const storageRef = ref(storage, `/files/${ID}`);
    const uploadTask = uploadBytesResumable(storageRef, Image[0]);


    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => {
        alert('Image Upload Failed')
        setUpload(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          const getref = doc(db, 'AllProducts', ID);
          setDoc(getref, {imageURL: url}, { merge: true })
          setUpload(false);
          alert("Uploaded")
          setName('');
          setPrice('');
          setCategory("Men");
          setAbout('');
          setDescription('');
          setImage('');
          setPercent(0)
        });
      }
    );
  }

  return (
    <div className='overflow-scroll h-screen'>

      <form className='px-10 py-10 my-5 mx-5 rounded-lg bg-gray-900 '>

        <div className="border-b border-gray-900/10 pb-12 flex flex-col gap-2">
          <div className='flex flex-row justify-between'>
            <div>
              <h2 className="font-semibold leading-7 text-white text-xl py-2">Add A Product</h2>
              <p className="mt-1 text-md leading-6 text-white text-justify">Please Fill the Details of the Product</p>
            </div>
            <div>
              <button type='button' onClick={HandleSubmit} className='lg:flex hidden px-4 py-2 bg-white rounded-lg font-bold'>Add Product</button>
            </div>
          </div>
          <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-8">
            <div className="">
              <label htmlFor="NameofProduct" className="block text-md font-medium leading-6 text-white -tracking-tight">
                Name Of Product
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="NameofProduct"
                  id="NameofProduct"
                  autoComplete="given-name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="Price" className="block text-md font-medium leading-6 text-white -tracking-tight">
                Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="Price"
                  id="Price"
                  autoComplete="price"
                  value={Price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="About Product" className="block text-md font-medium leading-6 text-white -tracking-tight">
                About Product
              </label>
              <div className="mt-2">
                <input
                  id="About Product"
                  name="About Product"
                  type="text"
                  autoComplete="About Product"
                  value={About}
                  onChange={(e) => setAbout(e.target.value)}
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="Category" className="block text-md font-medium leading-6 text-white -tracking-tight">
                Category
              </label>
              <div className="mt-2">
                <select
                  id="Category"
                  name="Category"
                  autoComplete="Category-name"
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Men</option>
                  <option>Women</option>
                  <option>Kids</option>
                  <option>Footwear</option>
                </select>
              </div>
            </div>

            <div className="">
              <label htmlFor="street-address" className="block text-md font-medium leading-6 text-white -tracking-tight">
                Insert Photo
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  name="street-address"
                  id="street-address"

                  onChange={(e) => setImage(e.target.files)}
                  autoComplete="street-address"
                  className='text-white'
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="Description" className="block text-md font-medium leading-6 text-white -tracking-tight">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  type="text"
                  name="Description"
                  id="Description"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoComplete="Description"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {Upload ? (<Box className='lg:col-span-2 flex flex-col gap-4'>
              <div className='block text-xl font-medium leading-6 text-white -tracking-tight'>Uploading.....</div>
              <BorderLinearProgress variant="determinate" value={Percent} />
            </Box>):''}

            <button type='button' onClick={HandleSubmit} className='flex lg:hidden px-4 py-2 rounded-lg font-bold' style={{background: "#e5eaf5"}}>Add Product</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProduct