//file: src/app/(customer)/layout.js
"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Grid3X3,
  ShoppingCart,
  User,
  Menu,
  X,
  Store,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CustomerLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  // Use cart context to get total items
  const { getTotalItems, isLoaded } = useCart();

  // Check if current page needs minimal layout
  const isCheckoutPage = pathname.startsWith("/checkout");
  const isCartPage = pathname.startsWith("/cart");
  const needsMinimalLayout = isCheckoutPage || isCartPage;

  // If minimal layout is needed (checkout or cart page)
  if (needsMinimalLayout) {
    // Determine page title and back URL
    let pageTitle = "Checkout";
    let backUrl = "/cart";

    if (isCartPage) {
      pageTitle = "Keranjang";
      backUrl = "/home"; // Default back to home, but this will be handled by browser history
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Simple Header untuk Checkout/Cart */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="px-4 py-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xs">TD</span>
                </div>
                <h1 className="text-lg font-bold text-gray-900">{pageTitle}</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>
      </div>
    );
  }

  // Regular customer layout for other pages
  const navigationItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Layanan", href: "#", icon: Store, isServices: true },
    { name: "Keranjang", href: "/cart", icon: ShoppingCart, hasCart: true },
    { name: "Kategori", href: "/categories", icon: Grid3X3 },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const serviceItems = [
    { name: "Supermarket", href: "/products/supermarket", emoji: "🛒" },
    { name: "Apotek", href: "/products/apotek", emoji: "💊" },
    { name: "Makanan", href: "/products/makanan", emoji: "🍜" },
  ];

  // Function to check if navigation item is active
  const isNavItemActive = (item) => {
    if (item.isServices) {
      // Check if current path starts with any service path
      return serviceItems.some((service) => pathname.startsWith(service.href));
    }

    if (item.href === "/") {
      // For home, only match exact path
      return pathname === "/";
    }

    // For other items, check if current path starts with the item's href
    return pathname.startsWith(item.href);
  };

  const handleNavClick = (item) => {
    if (item.isServices) {
      setIsServicesOpen(!isServicesOpen);
    } else {
      setIsServicesOpen(false);
    }
  };

  // Badge component for cart
  const CartBadge = ({ count, className = "" }) => {
    if (!isLoaded || count === 0) return null;

    return (
      <span
        className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium ${className}`}
        style={{ fontSize: "10px" }}
      >
        {count > 99 ? "9+" : count}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TD</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Trenggalek Delivery
                </h1>
                <p className="text-xs text-gray-500">
                  Antar cepat, harga tepat
                </p>
              </div>
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="bg-white border-t border-gray-100 px-4 py-2">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    isNavItemActive(item)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <item.icon size={20} />
                      {item.hasCart && <CartBadge count={getTotalItems()} />}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.hasCart && getTotalItems() > 0 && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {getTotalItems()} item
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pb-20">{children}</main>

      {/* Services Popup */}
      {isServicesOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/25 z-30"
            onClick={() => setIsServicesOpen(false)}
          />

          {/* Services Menu */}
          <div className="fixed bottom-20 left-4 right-4 bg-white rounded-2xl shadow-xl z-40 p-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Pilih Layanan
              </h3>
              <p className="text-sm text-gray-500">
                Apa yang ingin Anda pesan hari ini?
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {serviceItems.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
                  onClick={() => setIsServicesOpen(false)}
                >
                  <div className="text-3xl mb-2">{service.emoji}</div>
                  <span className="text-sm font-medium text-center">
                    {service.name}
                  </span>
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsServicesOpen(false)}
              className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              Tutup
            </button>
          </div>
        </>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex justify-around">
          {navigationItems.map((item) => {
            const isActive = isNavItemActive(item);

            if (item.isServices) {
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                    isActive || isServicesOpen
                      ? "text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="text-xs font-medium">{item.name}</span>
                </button>
              );
            }

            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors relative ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div className="relative">
                  <item.icon size={20} />
                  {item.hasCart && <CartBadge count={getTotalItems()} />}
                </div>
                <span className="text-xs font-medium">{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
