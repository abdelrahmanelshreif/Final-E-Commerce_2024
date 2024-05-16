import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/fluffy.png";
import { NavLink } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import { wishlistContext } from "../../context/WishlistContext";

export default function Navbar() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  let { counter, setCounter, getCart } = useContext(cartContext);

  useEffect(() => {
    (async () => {
      let data = await getCart();
      setCounter(data.numOfCartItems);
    })();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2">
        <div className="container-fluid mx-5">
          <NavLink className="navbar-brand" to="/home">
            <img src={Logo} alt="Logo" className="navbar-logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/allorders">
                  Orders
                </NavLink>
              </li>
              {role === "admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/crud">
                    Master
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link position-relative d-flex"
                  to="/cart"
                >
                  Cart
                  <div>
                    <i className="fa-solid fa-cart-shopping ms-1" />
                    {counter ? (
                      <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
                        {counter}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  className="nav-link position-relative d-flex"
                  to="/wishlist"
                >
                  Wishlist
                  <div>
                    <i className="fa-solid fa-heart" />
                  </div>
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  onClick={() => localStorage.clear()}
                  className="nav-link position-relative d-flex"
                  to="/signin"
                >
                  SignOut
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
