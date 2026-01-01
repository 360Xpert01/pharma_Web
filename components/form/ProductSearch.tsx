"use client";

import React, { useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";

interface Product {
  id: string;
  code: string;
  name: string;
  category?: string;
  skus?: string[];
}

interface ProductSearchProps {
  allProducts: any[]; // From Redux
  selectedProducts: Product[];
  onProductsChange: (products: Product[]) => void;
  loading?: boolean;
  className?: string;
}

export default function ProductSearch({
  allProducts,
  selectedProducts,
  onProductsChange,
  loading = false,
  className = "",
}: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Filter products by search query (exclude already selected)
  const filteredProducts = allProducts.filter(
    (p) =>
      !selectedProducts.find((sp) => sp.id === p.id) &&
      ((p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.code || "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddProduct = (product: any) => {
    const newProduct: Product = {
      id: product.id,
      code: product.code,
      name: product.name,
      category: product.category,
      skus: product.skus,
    };

    if (!selectedProducts.find((p) => p.id === newProduct.id)) {
      onProductsChange([...selectedProducts, newProduct]);
    }
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleRemoveProduct = (productId: string) => {
    onProductsChange(selectedProducts.filter((p) => p.id !== productId));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <h2 className="text-2xl font-bold text-(--gray-9)">Select Products</h2>

      <div className="relative">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => {
                // Delay to allow click on dropdown items
                setTimeout(() => setShowSearchResults(false), 200);
              }}
              placeholder={loading ? "Loading products..." : "Search Product Name"}
              disabled={loading}
              className="w-full px-4 py-3 pl-12 border border-(--gray-3) rounded-xl focus:ring-2 focus:ring-(--primary) outline-none disabled:bg-(--gray-1) disabled:cursor-not-allowed"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--gray-4)" />
          </div>
          <Button variant="primary" size="lg" icon={Plus} rounded="full">
            Add Products
          </Button>
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && searchQuery && !loading && (
          <div className="absolute z-10 w-full mt-2 bg-(--light) border border-(--gray-2) rounded-xl shadow-soft max-h-96 overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleAddProduct(product)}
                  className="p-4 hover:bg-(--muted) cursor-pointer border-b border-(--gray-1) last:border-0 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-(--gray-9)">{product.name}</p>
                      <p className="text-sm text-(--gray-5)">{product.productCode}</p>
                    </div>
                    {product.productCategory && (
                      <span className="px-2 py-1 bg-(--muted) text-(--primary) text-xs font-medium rounded-full">
                        {product.productCategory}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-(--gray-5)">No products found</div>
            )}
          </div>
        )}
      </div>

      {/* Selected Products Grid */}
      {selectedProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-(--gray-1) p-4 rounded-xl">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-(--light) border border-(--gray-1) rounded-xl p-4 flex items-center justify-between shadow-soft hover:shadow-soft transition group"
            >
              <div className="flex items-center gap-6">
                <p className="text-sm text-(--gray-4) font-medium">{product.code}</p>
                <p className="text-sm font-bold text-(--gray-9)">{product.name}</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleRemoveProduct(product.id)}
                className="bg-red-50 text-(--destructive) hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
