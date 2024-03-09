import React, { useCallback, useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import Card from '../../Utilities/Card/Card';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { db } from '../../App';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import myContext from '../../contextAPI/myContext';
import { useLocation } from 'react-router-dom';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const people = [
    {
        id: 1,
        name: 'Low to High',
    },
    {
        id: 2,
        name: 'High to Low',
    },
]

const ProductList = () => {

    const { state } = useLocation();

    const [Product, setProduct] = useState([]);
    const { Loading, triggerLoading } = useContext(myContext)
    const [Pagination, setPagination] = useState(1);
    const [, setRefresh] = useState(false);
    const [BarBreak, setBarBreak] = useState(1);
    const [, setcategory] = useState([]);
    const [selected, setSelected] = useState(people[0])

    const fetchData = useCallback(async () => {
        triggerLoading(true);
        setProduct([])
        const col = collection(db, 'AllProducts');
        let q;
        if (state == null) {
            q = col
        }
        else {
            setcategory(state.category)
            q = query(col, where('category', '==', state.category));
        }
        onSnapshot(q, (d) => {
            let data = []
            d.forEach((k) => {
                k.data().id = k.id;
                data.push(k.data());
            })
            setProduct(() => [...data]);
        })
        triggerLoading(() => false);
    }, [state, triggerLoading])


    const SortData =  (e) => {
        let Data = Product;
        setSelected(e);
        Data.sort(function (a, b) {
            if (e.name === "Low to High") {
                return a.price - b.price;
            }
            else {
                return b.price - a.price
            }
        })
        setProduct(() => [...Data]);
    }

    useEffect(() => {
        fetchData();
    }, [fetchData])

    useEffect(() => {
        setRefresh(false);
    }, [Product])


    const GetPaginationContent = val => {
        let content = [];
        for (let i = 10 * (val - 1); i < Math.min(10 * val, Product.length); i++) {
            content.push(<Card key={Product[i].id} product={Product[i]} />);
        }
        return content;
    };

    const GetPaginationBar = () => {
        let n = Product.length;
        let total = Math.ceil(n / 10);
        let bar = []
        for (let i = BarBreak; i <= Math.min(total, BarBreak + 4); i++) {
            bar.push(<div
                key={i}
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                    setPagination(e.target.textContent);
                }}
            >
                {i}
            </div>)
        }
        return bar;
    };

    const IncreaseBar = () => {
        let n = Product.length;
        let total = Math.ceil(n / 10);
        if (BarBreak < total - 4) {
            setBarBreak((Prev) => Prev + 1)
        }
    }

    const DecreaseBar = () => {
        console.log(Product)
        if (BarBreak > 1) {
            setBarBreak((Prev) => Prev - 1)
        }
    }

    return (
        <Layout>
            {Loading ? (<p>Loading</p>) : (
                <div className='flex flex-row flex-wrap lg:px-20 py-10 w-screen'  style={{background: "#fbe3e8"}}>
                    <div className='hidden md:w-3/12 lg:flex lg:flex-col'>
                        <div>
                            <Accordion sx={{ boxShadow: 'none' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    sx={{ fontSize: 'medium', fontWeight: 'bold' }}
                                >
                                    Product Categories
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='flex flex-col' style={{ accentColor: 'black' }}>
                                        <div className='flex flex-row gap-5'>
                                            <input id='men' type='checkbox' />
                                            <label htmlFor='men' >Men</label>
                                        </div>
                                        <div className='flex flex-row gap-5'>
                                            <input id='women' type='checkbox' />
                                            <label htmlFor='women'>Women</label>
                                        </div>
                                        <div className='flex flex-row gap-5'>
                                            <input id='kids' type='checkbox' />
                                            <label htmlFor='kids'>Kids</label>
                                        </div>
                                        <div className='flex flex-row gap-5'>
                                            <input id='Footwear' type='checkbox' />
                                            <label htmlFor='Footwear'>Footwear</label>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: 'none' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    sx={{ fontSize: 'medium', fontWeight: 'bold' }}
                                >
                                    Filter By Price
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='flex flex-col' style={{ accentColor: 'black' }}>
                                        <div className='flex flex-row gap-5'>
                                            <input id='₹100 - ₹1000' type='checkbox' />
                                            <label htmlFor='₹100 - ₹1000' >₹100 - ₹1000</label>
                                        </div>
                                        <div className='flex flex-row gap-5'>
                                            <input id='₹1001 - ₹5000' type='checkbox' />
                                            <label htmlFor='₹1001 - ₹5000' >₹1001 - ₹5000</label>
                                        </div>
                                        <div className='flex flex-row gap-5'>
                                            <input id='₹5001 - ₹10000' type='checkbox' />
                                            <label htmlFor='₹5001 - ₹10000' >₹5001 - ₹10000</label>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                    <div className='w-full lg:w-9/12 px-5'>
                        <div className='flex flex-col'>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <Listbox value={selected} onChange={(e) => {
                                        SortData(e);
                                    }}>
                                        {({ open }) => (
                                            <>
                                                <div className="relative mt-2">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                        <span className="flex items-center">
                                                            <span className="ml-3 block truncate">{selected.name}</span>
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {people.map((person) => (
                                                                <Listbox.Option
                                                                    key={person.id}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                        )
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <div className="flex items-center">

                                                                                <span
                                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                                >
                                                                                    {person.name}
                                                                                </span>
                                                                            </div>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                            </div>
                            <div className='flex flex-col gap-10'>
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                                    {Product.length > 0 ? GetPaginationContent(Pagination) : ''}
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" style={{background: "#fbe3e8"}}>
                                    <div className="flex flex-1 justify-between sm:hidden">
                                        <button
                                            onClick={DecreaseBar}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={IncreaseBar}
                                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                        <div>
                                            <p className='text-md font-bold text-gray-700'>showing {Math.min((Pagination - 1) * 10 + 1, Product.length)} - {Math.min((Pagination) * 10, Product.length)}  of {Product.length} results</p>
                                        </div>
                                        <div>
                                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                <div
                                                    onClick={DecreaseBar}
                                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                >
                                                    <span className="sr-only">Previous</span>
                                                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                                </div>
                                                {GetPaginationBar()}
                                                <button
                                                    onClick={IncreaseBar}
                                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                >
                                                    <span className="sr-only">Next</span>
                                                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}

export default ProductList