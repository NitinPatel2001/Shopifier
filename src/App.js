import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Auth/Login/Login';
import Signup from './component/Auth/Signup/Signup';
import Home from './component/Home/Home';
import ProductList from './component/ProductList/ProductList';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import MyState from './contextAPI/myState';
import DashLayout from './component/DashBoard/DashLayout/DashLayout';
import DashHome from './component/DashBoard/DashHome/DashHome';
import AllProduct from './component/DashBoard/AllProduct/AllProduct';
import AddProduct from './component/DashBoard/AddProduct/AddProduct';

console.log(process.env)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSEGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage }



function App() {
  return (
    <MyState>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/productlist' element={<ProductList />} />
            <Route path='/dashboard' element={<DashLayout />} >
                <Route path='Home' element={<DashHome/>}/>
                <Route path='AllProduct' element={<AllProduct/>}/>
                <Route path='AddProduct' element={<AddProduct/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </MyState>
  );
}

export default App;
