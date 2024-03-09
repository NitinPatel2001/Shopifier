import React, { useContext } from 'react'
import Layout from '../Layout/Layout'
import myContext from '../../contextAPI/myContext'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const context = useContext(myContext);
  const { Loading } = context;
  const navigate = useNavigate();
  return (
    <Layout>
      {Loading ? '' : (
        <div className='w-full max-h-fit'>
          <div className='h-full grid grid-cols-1 lg:grid-cols-2 m-4 lg:m-10 ' style={{background: "#e5eaf5"}}>
            <div className='flex items-center justify-center flex-col gap-5 lg:gap-10 m-10'>
              <div className='text-2xl text-center'>Classic Exclusive</div>
              <div className='text-5xl font-mono text-center'>Men's Collection</div>
              <div className='text-3xl text-center'>UPTO 50% OFF</div>

              <button onClick={()=>{
                navigate('/productlist')
              }} className='mt-4 px-8 py-4 bg-black text-white rounded-lg'>
                Shop Now <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
            <div className='flex justify-center'>
              <img className='w-full lg:m-5 aspect-square' alt='Hero' src='https://expertphotography.b-cdn.net/wp-content/uploads/2022/03/Male-Poses-Walking.jpg' />
            </div>
          </div>
          {/* <div>
            <div>Trending</div>
          </div> */}
        </div>
      )}
    </Layout>
  )
}

export default Home