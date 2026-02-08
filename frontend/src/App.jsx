// src/App.js
import React from "react";
import { Link } from "react-router-dom";
import AppRouter from "./rotuer";
import Guest from "../components/GuestNavbar";
import Auth from "../components/AuthNavbar";
import AuthUser from "./components/AuthUser";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./CartContext";

function App() {
  const { getToken } = AuthUser();

  return (
    <div>
      <HelmetProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
