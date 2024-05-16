import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import './allorder.css'

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          'https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/order',
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          }
        );
        setOrders(response.data.orders); // Assuming the response structure as shown in your example
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="main-container">
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <div className="order-address">
            <p><strong>Address:</strong> {order.address.details}, {order.address.city}</p>
            <p><strong>Phone:</strong> {order.address.phone}</p>
          </div>
          <div className="order-content">
            {order.products.map(({ _id, product, count, price }) => (
              <div key={_id} className="product-card">
                <img src={product.imageCover} className='product-image' alt={product.title} />
                <div className="product-details">
                  <p className='fw-bold'>Name: {product.title}</p>
                  <p className='text-main fw-semibold'>Price: {price} EGP</p>
                  <p className='fw-bold'>{product.category ? product.category.name : 'No Category'}</p>
                  <p><strong>Count:</strong> {count}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            Total Order Price: {order.totalOrderPrice} EGP
          </div>
        </div>
      ))}
    </div>
  );
}
