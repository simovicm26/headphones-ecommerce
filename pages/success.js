import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/state-context";

function Success() {
  const { emptyCartItems } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    emptyCartItems();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions please email{" "}
          <a className="email" href="mailto:simovicm26@gmail.com">
            simovicm26@gmail.com
          </a>
          <Link href="/">
            <button type="button" className="btn">
              Continue Shopping
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Success;
