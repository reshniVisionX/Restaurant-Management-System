import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/payment.css'; 

const Payment = () => {
  const { total } = useParams();
  const navigate = useNavigate();

  const handlePay = () => {
    navigate('/'); 
  };

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
      </div>
    </div>
  );
}

export default Payment;
