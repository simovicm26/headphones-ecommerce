import React, { createContext, useContext, useState, useEffect } from "react";

import { toast } from "react-hot-toast";

export const CartContext = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantites] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  function addToCart(product, quantity) {
    const checkProductInCart = cartItems.some(
      (item) => item._id === product._id
    );
    setTotalQuantites((prevQty) => prevQty + quantity);
    setTotalPrice((prevPrice) => prevPrice + quantity * product.price);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + quantity };
        } else {
          return item;
        }
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems((prevItems) => [...prevItems, product]);
    }
    toast.success(`${qty} ${product.name} added to cart!`);
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    // index = cartItems.findIndex((product) => product._id === id);

    if (value === "inc") {
      const newCartItems = cartItems.map((item) => {
        if (item._id === id) return { ...item, quantity: item.quantity + 1 };
        return item;
      });
      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantites((prevTotalQuantites) => prevTotalQuantites + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity === 1) {
        const newCartItems = cartItems.filter((item) => item._id !== id);
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantites((prevTotalQuantites) => prevTotalQuantites - 1);
      }
      if (foundProduct.quantity > 1) {
        const newCartItems = cartItems.map((item) => {
          if (item._id === id) return { ...item, quantity: item.quantity - 1 };
          return item;
        });
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantites((prevTotalQuantites) => prevTotalQuantites - 1);
      }
    }
  };

  function emptyCartItems() {
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantites(0);
  }

  function clearItemFromCart(id) {
    const newCartItems = cartItems.filter((item) => item._id !== id);
    console.log(newCartItems);
    const quantites = newCartItems
      .map((item) => item.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const prices = newCartItems
      .map((item) => item.quantity * item.price)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    setCartItems(newCartItems);
    setTotalQuantites(quantites);
    setTotalPrice(prices);
  }

  function increaseQty() {
    setQty((prevQty) => prevQty + 1);
  }

  function restartQty() {
    setQty(1);
  }

  function decreaseQty() {
    if (qty - 1 <= 0) return;
    setQty((prevQty) => prevQty - 1);
  }

  function toggleCart() {
    setShowCart((prevShow) => !prevShow);
  }

  return (
    <CartContext.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        addToCart,
        toggleCart,
        toggleCartItemQuantity,
        clearItemFromCart,
        restartQty,
        emptyCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(CartContext);
};
