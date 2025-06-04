"use client";
import { useState } from "react";
import {
  Home,
  Grid3X3,
  ShoppingCart,
  User,
  Menu,
  X,
  Settings,
} from "lucide-react";

export default function CustomerLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/", icon: Home, active: true },
    { name: "Layanan", href: "#", icon: Settings, isServices: true },
    { name: "Keranjang", href: "/cart", icon: ShoppingCart },
    { name: "Kategori", href: "/categories", icon: Grid3X3 },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const serviceItems = [
    { name: "Supermarket", href: "/supermarket", emoji: "🛒" },
    { name: "Apotek", href: "/apotek", emoji: "💊" },
    { name: "Makanan", href: "/makanan", emoji: "🍜" },
  ];

  const handleNavClick = (item) => {
    if (item.isServices) {
      setIsServicesOpen(!isServicesOpen);
    } else {
      setIsServicesOpen(false);
    }
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
                  TrenggalekDelivery
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
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
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
            if (item.isServices) {
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                    isServicesOpen
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
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                  item.active
                    ? "text-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs font-medium">{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
