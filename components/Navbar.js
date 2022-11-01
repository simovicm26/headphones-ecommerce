import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../context/state-context";
import Cart from "./Cart";

function Navbar() {
  const { showCart, totalQuantities, toggleCart } = useStateContext();

  return (
    <div className="navbar-container">
      <Link href="/">
        <p className="logo">
          Techy <br /> Headphones
        </p>
      </Link>
      <button type="button" className="cart-icon" onClick={toggleCart}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
}

export default Navbar;
