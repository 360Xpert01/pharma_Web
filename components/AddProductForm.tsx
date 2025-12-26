"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Plus } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { getProductCategories } from "@/store/slices/product/getProductCategoriesSlice";
import { createProduct, resetProductState } from "@/store/slices/product/createProductSlice";
import toast from "react-hot-toast";

export default function AddProductForm() {
  const dispatch = useAppDispatch();

  // Redux state
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);
  const { categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.productCategories
  );
  const {
    loading: productLoading,
    success: productSuccess,
    error: productError,
  } = useAppSelector((state) => state.createProduct);

  // Form state
  const [image, setImage] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [legacyCode, setLegacyCode] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [chemicalFormula, setChemicalFormula] = useState("");
  const [isPrescription, setIsPrescription] = useState("");
  const [skus, setSkus] = useState<string[]>(["Capsule 500mg"]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch product categories and generate prefix on mount
  useEffect(() => {
    dispatch(generatePrefix({ entity: "Product" }));
    dispatch(getProductCategories());

    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetProductState());
    };
  }, [dispatch]);

  // Handle success state
  useEffect(() => {
    if (productSuccess) {
      toast.success("Product created successfully!");
      // Reset form
      setProductName("");
      setLegacyCode("");
      setCategoryId("");
      setChemicalFormula("");
      setIsPrescription("");
      setSkus(["Capsule 500mg"]);
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Generate new prefix for next product
      dispatch(generatePrefix({ entity: "Product" }));
      dispatch(resetProductState());
    }
  }, [productSuccess, dispatch]);

  // Handle error state
  useEffect(() => {
    if (productError) {
      toast.error(productError);
    }
  }, [productError]);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addSkuField = () => setSkus([...skus, ""]);
  const updateSku = (index: number, value: string) => {
    const updated = [...skus];
    updated[index] = value;
    setSkus(updated);
  };
  const removeSku = (index: number) => setSkus(skus.filter((_, i) => i !== index));

  // Form submission handler
  const handleSubmit = () => {
    // Validation
    if (!productName.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!legacyCode.trim()) {
      toast.error("Legacy code is required");
      return;
    }
    if (!categoryId) {
      toast.error("Product category is required");
      return;
    }
    if (!generatedPrefix) {
      toast.error("Product code is still generating. Please wait.");
      return;
    }

    // Transform SKUs to match API structure
    const productSkus = skus
      .filter((sku) => sku.trim())
      .map((sku) => ({
        sku: sku.trim(),
        quantity: 0,
      }));

    if (productSkus.length === 0) {
      toast.error("At least one SKU is required");
      return;
    }

    // Prepare payload
    const payload = {
      pulseCode: generatedPrefix,
      productCode: legacyCode.trim(),
      name: productName.trim(),
      productCategoryId: categoryId,
      productFormula: chemicalFormula.trim() || null,
      imageUrl: image || null,
      description: isPrescription.trim() || null,
      status: "active" as const,
      productSkus,
    };

    // Dispatch create action
    dispatch(createProduct(payload));
  };

  return (
    <div className="">
      <div className=" ">
        <div className="p-10 space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-sm text-gray-500 mt-2">Fill in the product details below</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Image Upload */}
            <div className="space-y-6">
              <div
                onClick={handleImageClick}
                className="relative w-full aspect-square max-w-sm bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer overflow-hidden group hover:border-gray-400 transition-all"
              >
                {image ? (
                  <div className="relative w-full h-full">
                    <Image src={image} alt="Product" fill className="object-cover" />
                    <button
                      onClick={removeImage}
                      className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-xl"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Upload className="w-16 h-16 mb-4" />
                    <p className="text-lg font-medium">Click to upload image</p>
                    <p className="text-sm">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Form Fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Codes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pulse Generated Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Code (Pulse Generated)
                  </label>
                  <div className="px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-900">
                    {generatedPrefix || (prefixLoading ? "Generating..." : "PLS_PROD_000001")}
                  </div>
                </div>

                {/* Legacy Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Code (Legacy) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={legacyCode}
                    onChange={(e) => setLegacyCode(e.target.value)}
                    placeholder="e.g. MED-2025-001"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Product Name & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Amoxicillin 500mg"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer"
                  >
                    <option value="">
                      {categoriesLoading ? "Loading categories..." : "Select a category"}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.productCategory}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Prescription & Formula */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prescription Required
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={isPrescription}
                      onChange={(e) => setIsPrescription(e.target.value)}
                      placeholder="Prescription Required"
                      className="w-full px-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chemical Formula
                  </label>
                  <input
                    type="text"
                    value={chemicalFormula}
                    onChange={(e) => setChemicalFormula(e.target.value)}
                    placeholder="e.g. C₁₆H₁₉N₃O₅S"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                  />
                </div>
              </div>

              {/* SKUs Section */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  SKUs ({skus.filter((s) => s.trim()).length})
                </h3>
                <div className="space-y-4">
                  {skus.map((sku, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={sku}
                        onChange={(e) => updateSku(index, e.target.value)}
                        placeholder="e.g. Capsule 500mg"
                        className="flex-1 px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      {skus.length > 1 && (
                        <button
                          onClick={() => removeSku(index)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addSkuField}
                    className="px-6 py-3 border border-dashed border-blue-400 text-blue-600 rounded-xl hover:bg-blue-50 transition flex items-center gap-2 text-sm font-medium cursor-pointer"
                  >
                    <Plus className="w-5 h-5" />
                    Add Another SKU
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
                <button className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition cursor-pointer">
                  Discard
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={productLoading}
                  className="px-10 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition flex items-center gap-3 shadow-lg cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {productLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Product
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
