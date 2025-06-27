// file: src/app/(customer)/checkout/components/DeliveryAddressSection.jsx
"use client";
import { useState, useEffect } from "react";
import { MapPin, Search, AlertCircle, X, Clock } from "lucide-react";

export default function DeliveryAddressSection({
  customerName,
  setCustomerName,
  selectedDusun,
  setSelectedDusun,
  dusunHistory = [], // Add this prop
  customerNameHistory = [], // Add this prop
  showNotification,
}) {
  const [dusunSearch, setDusunSearch] = useState("");
  const [showDusunDropdown, setShowDusunDropdown] = useState(false);
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const [dusunList, setDusunList] = useState([]);
  const [isLoadingDusun, setIsLoadingDusun] = useState(false);
  const [dusunError, setDusunError] = useState(null);

  // Fetch dusun data from API
  const fetchDusun = async (searchQuery = "") => {
    setIsLoadingDusun(true);
    setDusunError(null);

    try {
      const url = new URL("/api/dusun", window.location.origin);
      if (searchQuery) {
        url.searchParams.set("search", searchQuery);
      }

      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setDusunList(result.data);
      } else {
        setDusunError("Gagal memuat data dusun");
        if (showNotification) {
          showNotification("Gagal memuat data dusun", "error");
        }
      }
    } catch (error) {
      console.error("Error fetching dusun:", error);
      setDusunError("Terjadi kesalahan saat memuat data dusun");
      if (showNotification) {
        showNotification("Terjadi kesalahan saat memuat data dusun", "error");
      }
    } finally {
      setIsLoadingDusun(false);
    }
  };

  // Load initial dusun data
  useEffect(() => {
    fetchDusun();
  }, []);

  // Debounced search for dusun
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (dusunSearch && showDusunDropdown) {
        fetchDusun(dusunSearch);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [dusunSearch, showDusunDropdown]);

  // Filter dusun based on search and combine with history
  const getFilteredDusunWithHistory = () => {
    let filtered = dusunList.filter(
      (dusun) =>
        dusun.name.toLowerCase().includes(dusunSearch.toLowerCase()) ||
        dusun.fullName.toLowerCase().includes(dusunSearch.toLowerCase())
    );

    // If there's no search query and we have history, show history first
    if (!dusunSearch && dusunHistory.length > 0) {
      // Remove history items from the main list to avoid duplicates
      const historyIds = dusunHistory.map((h) => h.id);
      filtered = filtered.filter((dusun) => !historyIds.includes(dusun.id));

      // Combine: history first, then filtered results
      return [...dusunHistory, ...filtered];
    }

    return filtered;
  };

  const filteredDusun = getFilteredDusunWithHistory();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleDusunSelect = (dusun) => {
    setSelectedDusun(dusun);
    setDusunSearch(dusun.fullName);
    setShowDusunDropdown(false);
  };

  const handleDusunInputChange = (e) => {
    const value = e.target.value;
    setDusunSearch(value);
    setShowDusunDropdown(true);

    // Reset selected dusun if input is cleared
    if (value === "") {
      setSelectedDusun(null);
    }
  };

  const clearCustomerName = () => {
    setCustomerName("");
    setShowNameDropdown(false);
  };

  const handleNameSelect = (name) => {
    setCustomerName(name);
    setShowNameDropdown(false);
  };

  const handleNameInputChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleNameFocus = () => {
    if (customerNameHistory.length > 0) {
      setShowNameDropdown(true);
    }
  };

  const clearDusun = () => {
    setSelectedDusun(null);
    setDusunSearch("");
    setShowDusunDropdown(false);
  };

  // Check if a dusun is from history
  const isFromHistory = (dusun) => {
    return dusunHistory.some((h) => h.id === dusun.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <MapPin size={20} className="text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Alamat Pengiriman
        </h3>
      </div>

      <div className="space-y-4">
        {/* Nama */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap *
          </label>
          <div className="relative">
            <input
              type="text"
              value={customerName}
              onChange={handleNameInputChange}
              onFocus={handleNameFocus}
              className="w-full px-4 py-3 pr-14 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan nama lengkap"
              required
            />
            {customerName && (
              <button
                type="button"
                onClick={clearCustomerName}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 
                          bg-gray-200 text-gray-600 
                          rounded-full p-2 
                          border border-gray-300
                          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
                          active:bg-gray-300 active:scale-95 transition-all duration-150"
                title="Hapus nama"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Name History Dropdown */}
          {showNameDropdown && customerNameHistory.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-32 overflow-y-auto">
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Clock size={14} className="text-gray-500" />
                  <span className="text-xs font-medium text-gray-600">
                    Nama Terakhir
                  </span>
                </div>
              </div>
              {customerNameHistory.map((name, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleNameSelect(name)}
                  className="w-full px-4 py-3 text-left border-b border-gray-100 last:border-b-0 bg-blue-50 hover:bg-blue-100"
                >
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{name}</p>
                    <Clock size={12} className="text-blue-500 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Click outside to close name dropdown */}
          {showNameDropdown && (
            <div
              className="fixed inset-0 z-5"
              onClick={() => setShowNameDropdown(false)}
            />
          )}
        </div>

        {/* Dusun */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dusun *
          </label>
          <div className="relative">
            <input
              type="text"
              value={dusunSearch}
              onChange={handleDusunInputChange}
              onFocus={() => setShowDusunDropdown(true)}
              className="w-full pl-12 pr-14 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Cari atau pilih dusun anda"
              required
            />
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            {(dusunSearch || selectedDusun) && (
              <button
                type="button"
                onClick={clearDusun}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 
                          bg-gray-200 text-gray-600 
                          rounded-full p-2 
                          border border-gray-300
                          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
                          active:bg-gray-300 active:scale-95 transition-all duration-150"
                title="Hapus pilihan dusun"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Show delivery notes if dusun selected */}
          {selectedDusun && selectedDusun.deliveryNotes && (
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle
                  size={16}
                  className="text-amber-600 mt-0.5 flex-shrink-0"
                />
                <p className="text-sm text-amber-800">
                  <span className="font-medium">Catatan Pengiriman:</span>{" "}
                  {selectedDusun.deliveryNotes}
                </p>
              </div>
            </div>
          )}

          {/* Dusun Dropdown */}
          {showDusunDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
              {isLoadingDusun ? (
                <div className="px-4 py-3 text-center">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <span className="text-sm text-gray-500">
                    Memuat data dusun...
                  </span>
                </div>
              ) : dusunError ? (
                <div className="px-4 py-3">
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle size={16} />
                    <span className="text-sm">{dusunError}</span>
                  </div>
                  <button
                    onClick={() => fetchDusun(dusunSearch)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    Coba lagi
                  </button>
                </div>
              ) : filteredDusun.length > 0 ? (
                <>
                  {/* Show "Riwayat Terakhir" header if we have history items and no search */}
                  {!dusunSearch && dusunHistory.length > 0 && (
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="text-gray-500" />
                        <span className="text-xs font-medium text-gray-600">
                          Riwayat Terakhir
                        </span>
                      </div>
                    </div>
                  )}

                  {filteredDusun.map((dusun, index) => {
                    const isHistory = isFromHistory(dusun);
                    const isFirstNonHistory =
                      !dusunSearch &&
                      dusunHistory.length > 0 &&
                      !isHistory &&
                      index === dusunHistory.length;

                    return (
                      <div key={dusun.id}>
                        {/* Show "Semua Dusun" header for non-history items */}
                        {isFirstNonHistory && (
                          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                            <span className="text-xs font-medium text-gray-600">
                              Semua Dusun
                            </span>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDusunSelect(dusun)}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                            isHistory ? "bg-blue-50 hover:bg-blue-100" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-gray-900 truncate">
                                  {dusun.name}
                                </p>
                                {isHistory && (
                                  <Clock
                                    size={12}
                                    className="text-blue-500 flex-shrink-0"
                                  />
                                )}
                              </div>
                              <p className="text-sm text-gray-500 truncate">
                                Desa {dusun.desaKelurahan}, Kec.{" "}
                                {dusun.kecamatan}
                              </p>
                            </div>
                            <span className="text-sm font-medium text-gray-900 ml-2 flex-shrink-0">
                              {formatPrice(dusun.shippingCost)}
                            </span>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="px-4 py-3 text-gray-500 text-sm text-center">
                  {dusunSearch
                    ? "Dusun tidak ditemukan"
                    : "Tidak ada data dusun"}
                </div>
              )}
            </div>
          )}

          {/* Click outside to close dropdown */}
          {showDusunDropdown && (
            <div
              className="fixed inset-0 z-5"
              onClick={() => setShowDusunDropdown(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
