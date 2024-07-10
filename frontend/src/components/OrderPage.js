import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/myOrder.css';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const OrderPage = () => {
  const { tb_no } = useParams();
  console.log("orderpage", tb_no);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState({ tno: tb_no, status: false, orders: [] });
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${BASE_URL}/userData`, { withCredentials: true,
      headers:{
         Authorization: `Bearer ${token}`
      }
     })
      .then(res => {
        const userData = res.data;
        if (userData.email && userData.name) {
          setUser(userData);
        } else {
          console.log("Not yet logged in", res);
          navigate('/login');
        }
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        navigate('/login');
      });
  }, [navigate]);


  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/dishes`, {
          credentials: 'include',
          headers:{
             Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Error fetching dishes');
        }
        const data = await response.json();
        console.log(data);
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  const Increment = async(item_id) => {
    const dish = dishes.find(d => d.item_id === item_id);
    if (dish) {
      setOrders(prevOrders => {
        const existingOrder = prevOrders.orders.find(order => order.dish === dish.name);
        let updatedOrders;
        if (existingOrder) {
          updatedOrders = prevOrders.orders.map(order =>
            order.dish === dish.name ? { ...order, quantity: order.quantity + 1, price: order.price + dish.rate } : order
          );
        } else {
          updatedOrders = [...prevOrders.orders, { dish: dish.name, quantity: 1, price: dish.rate }];
        }
        return { ...prevOrders, orders: updatedOrders };
      });
      setTotal(prevTotal => prevTotal + dish.rate);
      try {
        const response = await fetch(`${BASE_URL}/tables/update/${parseInt(tb_no, 10)}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ orders }), 
          credentials: 'include',
        });
      
        if (response.ok) {
          console.log("Table updated");
        } else {
          console.error('Failed to update table');
        }
      } catch (error) {
        console.error('Error updating table:', error);
      }
      
    try {
      console.log("Decrement id : ",item_id);
      const response = await fetch(`${BASE_URL}/api/dishes/orderOne/${item_id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers:{
             Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error decrementing dish quantity');
      }

      
      setDishes(prevDishes => prevDishes.map(d => 
        d.item_id === item_id ? { ...d, quantity: d.quantity - 1 } : d
      ));
    } catch (error) {
      console.error('Error decrementing dish quantity:', error);
    }
  }
};

  const generateBill = async () => {
    try {
      const response = await fetch(`${BASE_URL}/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        }, credentials: 'include',
        body: JSON.stringify({
          name: user.name, 
          email_id: user.email,
          date: new Date(),
          time: new Date().toLocaleTimeString(),
          tableNo:tb_no,
          orders: orders.orders,
          total: total
        })
      });

      if (!response.ok) {
        throw new Error('Error generating bill');
      }else{
        console.log(response);
        alert("You payment successfull ...Thankyou .. we welcome u again");
      }

      await fetch(`${BASE_URL}/tables/clear/${tb_no}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        }, credentials: 'include',
        body: JSON.stringify({ status: true, orders: [], total: 0 })
      });

      navigate('/'); 
    } catch (error) {
      console.error('Error generating bill:', error);
    }
  };

  const categories = [
    'Appetizers',
    'Main Courses',
    'Snacks',
    'Desserts',
    'Beverages',
    'Grilled Items'
  ];

  const groupedDishes = dishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {});

  return (
    <div className='orderpg'>
      <h1 className='dishes-list'>View All Dishes</h1>
      <div className='v-dish_list'>
        {categories.map(category => (
          <div key={category} className={`myorder-category myorder-${category.toLowerCase().replace(/\s+/g, '-')}`}>
            {groupedDishes[category] && groupedDishes[category].map((dish, index) => (
              <div className='myorder-dish' key={dish.item_id}>
              
                <img src={`/images/${dish.image}`} alt={dish.name} className='myorder-dish-img' />
                <div className='myorder-desc'>
                  <h3 className='myorder-dish-name'>{dish.name}</h3>
                  <h3 className='myorder-dish-rate'> ₹ {dish.rate}</h3>
                  <h3 className='myorder-dish-rating'>
                    <img src="https://icon2.cleanpng.com/20180422/kew/kisspng-star-golden-stars-5add5465f24541.9545710215244545019924.jpg" alt="star" className='myorder-rating-pic' />
                    {dish.rating}
                  </h3>
                </div>
                <div className='myorder-shop'>
                  <h3 className='myorder-dish-count'> {dish.quantity}
                    <span className='myorder-shop-btn'>
                      <button type='button' onClick={() => Increment(dish.item_id)}> + </button>
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className='order-summary'>
        <h2>Order Summary</h2>
        <table className='orders-table'>
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.dish}</td>
                <td>{order.quantity}</td>
                <td>₹ {order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='generate-bill'>
        <div className='my-meals'>
          <h3>Total : ₹ {total}</h3>
        </div>
        <button type="button" className='pay-btn' onClick={generateBill}>
          Proceed to Payment
        </button>
      </div>
    </div>
   
  );
};

export default OrderPage;
