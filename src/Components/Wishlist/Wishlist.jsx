import React, { useContext, useEffect, useState } from 'react';
import { wishlistContext } from '../../context/WishlistContext';
import Loading from '../Loading/Loading';
import { cartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

export default function Wishlist() {
  const { getWishlist, deleteFromWishlist } = useContext(wishlistContext);
  const [wishlistData, setWishlistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(cartContext);

  async function addProductToCart(productId) {
    try {
      await addToCart(productId);
      toast.success('Product added successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getWishlist();
        setWishlistData(response.wishlist);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function deleteProduct(productId) {
    try {
      await deleteFromWishlist(productId);
      toast.error('Product has been deleted from wishlist');
      // After successful deletion, update the wishlist data
      const updatedWishlist = await getWishlist();
      setWishlistData(updatedWishlist.wishlist);
    } catch (error) {
      console.error('Error deleting product from wishlist:', error);
      toast.error('Failed to delete product from wishlist');
    }
  }

  if (loading) return <Loading />;

  return (
    <>
      <div className="container bg-main-light my-5 p-5">
        <div className="mb-4">
          <h2 className="fw-bold">My Wishlist</h2>
        </div>
        {wishlistData && wishlistData.products.length > 0 ? (
          wishlistData.products.map(item => (
            <div key={item._id} className="row">
              <div className="col-md-2">
                <img src={item.product.imageCover} className="w-100" alt="" />
              </div>
              <div className="col-md-10">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="wid">
                    <p className="fw-bold">{item.product.title}</p>
                    <p className="text-main fw-semibold">{item.price} EGP</p>
                    <button onClick={() => deleteProduct(item._id)} className="btn bg-main text-white">
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                  </div>
                  <div>
                    <button onClick={() => addProductToCart(item._id)} className="btn bg-main text-white">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
            </div>
          ))
        ) : (
          <p>No items in your wishlist</p>
        )}
      </div>
    </>
  );
}
