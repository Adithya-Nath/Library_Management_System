import { useState } from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/homePage';
import Navbar from './components/NavBar';
import AdminDashboard from './components/AdminDashboard';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <div className="container mt-4">
    <BrowserRouter>
    <Navbar />
    <Routes>
       
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
    <Route path="/" element={<HomePage />} />
    <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    </BrowserRouter>
    </div>
   </>
  )
}

export default App
