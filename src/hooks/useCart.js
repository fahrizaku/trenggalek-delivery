// file: src/hooks/useCart.js
"use client";
import { useState, useEffect } from "react";

const CART_STORAGE_KEY = "trenggalek_delivery_cart";

// Utility functions untuk localStorage
const getCartFromStorage = () => {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return {};
  }
};

const saveCartToStorage = (cart) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const useCart = () => {
  const [cart, setCart] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(storedCart);
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever cart changes (except initial load)
  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage(cart);
    }
  }, [cart, isLoaded]);

  const addToCart = (productId, quantity = 1) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity,
    }));
  };

  const removeFromCart = (productId, quantity = 1) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId]) {
        if (newCart[productId] <= quantity) {
          delete newCart[productId];
        } else {
          newCart[productId] -= quantity;
        }
      }
      return newCart;
    });
  };

  const removeItemCompletely = (productId) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItemCompletely(productId);
    } else {
      setCart((prev) => ({
        ...prev,
        [productId]: quantity,
      }));
    }
  };

  const getCartQuantity = (productId) => {
    return cart[productId] || 0;
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getCartItems = () => {
    return Object.entries(cart).map(([productId, quantity]) => ({
      productId: parseInt(productId),
      quantity,
    }));
  };

  const getTotalValue = (products) => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p.id === parseInt(productId));
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const isInCart = (productId) => {
    return Boolean(cart[productId] && cart[productId] > 0);
  };

  return {
    cart,
    isLoaded,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    clearCart,
    updateQuantity,
    getCartQuantity,
    getTotalItems,
    getCartItems,
    getTotalValue,
    isInCart,
  };
};
