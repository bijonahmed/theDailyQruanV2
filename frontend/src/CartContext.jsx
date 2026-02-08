import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (service) => {
 
    setCart((prevCart) => {
      if (prevCart.some((item) => item.id === service.id)) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: "Item already in cart!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          background: "#fff",
          customClass: {
            popup: "shadow-sm",
          },
        });
        return prevCart;
      }

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Added to cart!",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#fff",
        customClass: {
          popup: "shadow-sm",
        },
      });

      return [
        ...prevCart,
        {
          id: service.id,
          name: service.title,
          price: service.price,
          slug: service.slug,
        },
      ];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
