import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db, storage } from '../../../App';
import { DeleteOutline } from '@mui/icons-material';
import { deleteObject, ref } from 'firebase/storage';

const AllProduct = () => {

  const [Data, setData] = useState([]);

  const fetchData = async () => {
    const col = collection(db, 'AllProducts');
    onSnapshot(col, (doc) => {
      let content = [];
      doc.forEach((k) => {
        const obj = k.data();
        obj.id = k.id;
        content.push(obj);
      })
      setData((prev) => [...content]);
    })
  }


  async function HandleDelete(ID){
    await deleteDoc(doc(db, "AllProducts", ID));
    const desertRef = ref(storage, `files/${ID}`);
    deleteObject(desertRef).then(() => {
      alert("Deleted Successfully");
    }).catch((error) => {
      alert("Error In Deletion")
    });
  }

  async function HandleCheck(e, ID){
    await setDoc(doc(db, 'AllProducts', ID), {
      checked: e.target.checked
    }, {
      merge: true,
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='h-[calc(100vh-32px)] border-2 m-4 rounded-lg bg-gray-900 overflow-scroll'>
      <div className='p-5 m-5 flex flex-col gap-10 '>
        <table class="table-auto font-serif text-white">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product ID</th>
              <th>Delete Product</th>
              <th>Trending Item</th>
            </tr>
          </thead>
          <br/>
          <tbody >
            {Data.length > 0 ? (
              Data.map((doc) => (
                <tr className=''>
                  <td className='text-center p-4 border-spacing-2 border border-white'>{doc.name}</td>
                  <td className='text-center p-4 border-spacing-2 border border-white'>{doc.price}</td>
                  <td className='text-center p-4 border-spacing-2 border border-white'>{doc.id}</td>
                  <td className='text-center p-4 border-spacing-2 border border-white'><button onClick={() => {
                    HandleDelete(doc.id)
                  }}><DeleteOutline/></button></td>
                  <td className='text-center p-4 border-spacing-2 border border-white'>
                    <input type='checkbox' checked={doc.checked} onChange={(e) => {
                      HandleCheck(e, doc.id)
                    }}/>
                  </td>
                </tr>
              ))
            ) : ''}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllProduct