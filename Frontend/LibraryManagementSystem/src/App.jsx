import { useState } from 'react'
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import HomePage from './pages/user/homePage';
import Navbar from './components/common/NavBar';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserProfile from './pages/user/UserProfile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/user/LandingPage';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import HistoryPage from './pages/user/HistoryPage';

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  return (
    <>
      <AuthProvider>
        <div className="container-fluid p-0">
          <BrowserRouter>
            <Navbar onToggleSidebar={toggleSidebar} />
            <div className="d-flex">
              <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
              {/* Added flex-grow-1 wrapper to fix alignment */}
              <div className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/landing" element={<LandingPage />} />
                  <Route path="/footer" element={<Footer />} />
                  <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                  <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"> <AdminDashboard /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute> <UserProfile /></ProtectedRoute>} />
                </Routes>
              </div>
            </div>
            <ToastContainer
              position="bottom-right"
              transition={Slide}
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