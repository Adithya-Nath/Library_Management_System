import { useState } from 'react'
import { ToastContainer ,Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/homePage';
import Navbar from './components/NavBar';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
 

  return (
    <>
    <AuthProvider>
   <div className="container-fluid p-0">
    <BrowserRouter>
    <Navbar />
    <Routes>
    
     <Route path="/" element={<Login />} />
     <Route path="/register" element={<Register />} />
    <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"> <AdminDashboard /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute> <UserProfile /></ProtectedRoute>} />.
    </Routes>
    <ToastContainer 
        position="bottom-right"   // 2. Move to bottom
        transition={Slide}        // 3. Set transition to Slide
        autoClose={3000}
        style={{ zIndex: 99999 }}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
    </div>
    </AuthProvider>
   </>
  )
}

export default App
