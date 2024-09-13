import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Register from './Register';
import Login from './login';
import Footer from './components/Footer';
import Home from './components/Home'
import Admin from './components/Admin';
import Orders from './components/Orders';
import Create from './AdminFunctions/CreatePackage';
import Update from './AdminFunctions/UpdatePackage';
import View from './AdminFunctions/ViewPackage';
import Delete from './AdminFunctions/DeletePackage';
import Booking from './AdminFunctions/Bookings';
import UpdateOne from './AdminFunctions/UpdateOne';
import Contact from './components/Contact';
import History from './components/History';
import OrderPage from './components/OrderPage';
import Feedback from './AdminFunctions/Feedback';
import Histories from './AdminFunctions/Histories';
import Payment from './components/PaymentPage';
import NotFound from './components/404page';
import ProtectedRoutes from './utils/ProtectedRoute';
import AdminRoutes from './utils/AdminRoute'

function App() {

  return (
   <BrowserRouter>
   <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}>  </Route>
        <Route path='/register' element={<Register/>}>  </Route>
        <Route path='/login' element={<Login/>}>  </Route>
      
        <Route element={<AdminRoutes/>}>
        <Route path='/admin' element={<Admin/>}>  </Route>
        <Route path='/createpack' element={<Create/>}>  </Route>
        <Route path='/updatepack' element={<Update/>}>  </Route>
        <Route path='/deletepack' element={<Delete/>}>  </Route>
        <Route path='/viewpack' element={<View/>}>  </Route>
        <Route path='/booking' element={<Booking/>}>  </Route>
        </Route>
        
        <Route element={<ProtectedRoutes/>}>
        <Route path='/order' element={<Orders />}>  </Route>
        <Route path='/contact' element={<Contact/>}>  </Route>
        <Route path='/history' element={<History/>}></Route>
        <Route path={`/payment/:total`} element={<Payment/>}>  </Route>
        <Route path='/histories' element={<Histories/>}>  </Route>
        <Route path={`/updateOne/:item_id`} element={<UpdateOne />} />
        <Route path={`/myorder/:tb_no`} element={<OrderPage />} />
        <Route path='/feedback' element={<Feedback/>}>  </Route>
        
        </Route>

        <Route path="*" element={<NotFound />} /> 
      </Routes>
      <Footer/>
   </BrowserRouter>
  );
}

export default App;
