
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Header from './components/Header';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/SignUp';
import ProductPage from './pages/Product';
import ProductOverview from './pages/ProductOverview';
import Cart from './pages/Cart';
import CheckoutPage from './pages/ChekOut';
import Footer from './components/Footer';


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
          <Route path="/product" element={<ProductPage />} />
          <Route path="/overview/:id" element={<ProductOverview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>

  )
}
export default App
