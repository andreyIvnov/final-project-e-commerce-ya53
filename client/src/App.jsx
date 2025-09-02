import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'

function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
    </>
  )
}

export default App
