import { Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './Components/Main'
import Login from './Components/Login'
import Register from './Components/Register'
import AdminModeInfo from './Components/AdminModeInfo'
import CustomModeInfo from './Components/CustomModeInfo'

import Categories from './Components/Categories/Categories'
import Products from './Components/Products/Products'
import Customers from './Components/Customers/Customers'
import Statistics from './Components/Statistics/Statistics'


function App() {

  return (
    <>
      <div>
        <Routes>

          <Route path='/' element={<Main />}>

            <Route path='adminmode' element={<AdminModeInfo />} >
              <Route path='categories' element={<Categories />} />
              <Route path='products' element={<Products />} />
              <Route path='customers' element={<Customers />} />
              <Route path='statistics' element={<Statistics />} />
            </Route>

            <Route path='custommode' element={<CustomModeInfo />} />

          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </div>
    </>
  )
}

export default App
