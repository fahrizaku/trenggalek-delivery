"use client";
import { useState } from "react";
import { Home, Store, ShoppingBag, User, Menu, X } from "lucide-react";

export default function CustomerLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/", icon: Home, active: true },
    { name: "Toko", href: "/stores", icon: Store },
    { name: "Produk", href: "/products", icon: ShoppingBag },
    { name: "Profile", href: "/profile", icon: User },
  ];

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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex justify-around">
          {navigationItems.map((item) => (
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
          ))}
        </div>
      </nav>
    </div>
  );
}
