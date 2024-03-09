import React from 'react'

const Card = (props) => {
    const {product, key} = props
    return (
        <div key={key} className="group relative">
            <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={product.imageURL}
                    alt={product.imageURL}
                    className="h-full w-full aspect-square object-cover object-center lg:h-full lg:w-full"
                />
                <div className='w-full absolute bottom-2 hidden group-hover:flex group-hover:justify-center'>
                    <span className='px-10 py-2 bg-white text-black rounded-lg font-bold'>Add to Cart</span>
                </div>
            </div>
            <div className="mt-4 flex flex-col justify-between">
                <div className='flex flex-row justify-between'>
                    <h3 className="text-sm text-gray-900 font-bold">
                        <div>
                            <span aria-hidden="true" className="absolute inset-0 font-bold" />
                            {product.name}
                        </div>
                    </h3>
                    <p className="text-sm font-medium text-gray-900"> ₹{product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500 text-justify">{product.about}</p>
            </div>
        </div>
    )
}

export default Card