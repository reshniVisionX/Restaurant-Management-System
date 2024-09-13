import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/payment.css'; 

const Payment = () => {
  const { total } = useParams();
  const navigate = useNavigate();
  const [showtick,setShowtick] = useState(false);

  const handlePay = () => {
    setShowtick(true); 
  };

 const handleHome=()=>{
  navigate('/');
 }

  return (
    <div className='payment-container'>
      <div className='payment-box'>
        <h3 className='payment-total'>Total Amount:<span className='amount'> Rs. {total}</span></h3>
        <div className='payment-methods'>
          <label>
            <input type="radio" name="paymentMethod" value="credit_card" />
            Credit Card
          </label>
          <label>
            <input type="radio" name="paymentMethod" value="paypal" />
            UPI
          </label><br/><br/>
          <input type="password" className='pin' name="password" placeholder='Enter pin..'></input>
        </div><br/>
        <button className='pay-button' onClick={handlePay}>Pay Now</button>
        <br/>
        {showtick &&
      <div className='tick'>
           <h2>Payment✅ successful</h2>
           <button type='button'  className='pay-button' onClick={()=>handleHome()}>Go to Home</button>
      </div>
      }
      </div>
    
     
    </div>
  );
}

export default Payment;
