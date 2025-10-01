
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Header from './components/Header';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/SignUp';


function App() {

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Toaster postion="top-center" />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>

  )
}
export default App
