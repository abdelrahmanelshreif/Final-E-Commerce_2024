import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../context/CartContext';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getCart, deletFromCart, setCounter, updateCart, deleteCart } = useContext(cartContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const responseData = await getCart();
        if (responseData.status === 'success') {
          setData(responseData.cart);
        } else {
          setData(null);
          toast.error('Failed to fetch cart data');
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
        toast.error('Failed to fetch cart data');
      }
      setLoading(false);
    })();
  }, []);

  async function deleteProduct(productId) {
    try {
      const responseData = await deletFromCart(productId);
      if (responseData.status === 'success') {
        toast.error('Product has been deleted');
        setCounter(responseData.numOfCartItems);
        setData(responseData.cart);
      } else {
        toast.error('Failed to delete product from cart');
      }
    } catch (error) {
      console.error('Error deleting product from cart:', error);
      toast.error('Failed to delete product from cart');
    }
  }

  async function updateProductQuantity(productId, count) {
    try {
      const responseData = await updateCart(productId, count);
      if (responseData.status === 'success') {
        toast.success('Product quantity updated successfully');
        setCounter(responseData.numOfCartItems);
        setData(responseData.cart);
      } else {
        toast.error('Failed to update product quantity');
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
      toast.error('Failed to update product quantity');
    }
  }

  if (loading) return <Loading />;
  if (!data || data.products.length === 0) return <h2 className='text-center my-5 text-main'>No items in the cart.</h2>;

  return (
    <>
      <div className="container bg-main-light my-5 p-5">
        <div className='mb-4 d-flex justify-content-between'>
          <h2 className='fw-bold'>Cart Shop</h2>
        </div>

        {data.products.map(item => (
          item.product && (
            <div key={item._id} className="row">
              <div className="col-md-2">
                {item.product.imageCover && <img src={item.product.imageCover} className='w-100' alt="" />}
              </div>
              <div className="col-md-10">
                <div className='d-flex justify-content-between'>
                  <div className='wid'>
                    <p className='fw-bold'>{item.product.title}</p>
                    <p className='text-main fw-semibold'>{item.price} EGP</p>
                    <button onClick={() => deleteProduct(item.product._id)} className='btn bg-main text-white'><i className="fa-solid fa-trash"></i> Remove</button>
                  </div>
                  <div className=''>
                    <button onClick={() => updateProductQuantity(item._id, item.count + 1)} className='brdr'>+</button>
                    <span className='px-3'>{item.count}</span>
                    <button disabled={item.count <= 1} onClick={() => updateProductQuantity(item._id, item.count - 1)} className='brdr'>-</button>
                  </div>
                </div>
              </div>
              <hr className='my-4' />
            </div>
          )
        ))}

        <div className='d-flex justify-content-center'>
          <Link to={`/address/${data._id}`} className='btn bg-main text-white w-25 fw-bold py-2 mt-3'>Check Out</Link>
        </div>

      </div>
    </>
  );
}
