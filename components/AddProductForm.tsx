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
  const [skus, setSkus] = useState<string[]>(["500mg", "750mg", "1000mg"]);
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
            <p className="text-sm text-gray-500 mt-2">Unlock the potential of your candidates</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12 pr-12">
            {/* Left: Image Upload */}
            <div className="space-y-4">
              <div
                onClick={handleImageClick}
                className="relative w-full aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer overflow-hidden group hover:border-gray-400 transition-all"
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

              {/* Small Thumbnail */}
              <div
                onClick={handleImageClick}
                className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-all flex items-center justify-center"
              >
                {image ? (
                  <Image
                    src={image}
                    alt="Thumbnail"
                    width={96}
                    height={96}
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
            </div>

            {/* Right: Form Fields */}
            <div className="space-y-6">
              {/* FIRST ROW: Pulse Code + Product code (2 columns) */}
              <div className="grid grid-cols-2 gap-4">
                {/* Pulse Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pules Code<span className="text-red-500">*</span>
                  </label>
                  <div className="px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-gray-600 text-sm">
                    {generatedPrefix || "PLS_PRD_001247"}
                  </div>
                </div>

                {/* Product code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product code<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={legacyCode}
                    onChange={(e) => setLegacyCode(e.target.value)}
                    placeholder="001247"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>

              {/* SECOND ROW: Category + Name + Formula (3 columns) */}
              <div className="grid grid-cols-3 gap-4">
                {/* Product Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Category<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer text-sm"
                  >
                    <option value="">
                      {categoriesLoading ? "Loading..." : "e.g. Doctor, Heart..."}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.productCategory}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Panadol"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>

                {/* Product Formula */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Formula<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={chemicalFormula}
                    onChange={(e) => setChemicalFormula(e.target.value)}
                    placeholder="e.g. divalproex sodium"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>

              {/* THIRD ROW: Product Description (full width) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={isPrescription}
                  onChange={(e) => setIsPrescription(e.target.value)}
                  placeholder="e.g. Panadol"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>

              {/* SKU SECTION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Product SKU's<span className="text-red-500">*</span>
                </label>

                {/* Input + Button side by side */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    id="sku-input"
                    placeholder="e.g. Capsule 500Mg"
                    className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        setSkus([...skus, e.currentTarget.value.trim()]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById("sku-input") as HTMLInputElement;
                      if (input && input.value.trim()) {
                        setSkus([...skus, input.value.trim()]);
                        input.value = "";
                      }
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-600 transition flex items-center gap-2 text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Add Brand SKUs
                  </button>
                </div>

                {/* SKU Chips Display */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {skus
                    .filter((s) => s.trim())
                    .map((sku, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium flex items-center gap-2 hover:bg-blue-600 transition"
                      >
                        {sku}
                        <button onClick={() => removeSku(index)} className="cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="flex justify-end gap-4 pt-6">
                <button className="px-8 py-3 border border-blue-500 text-blue-500 font-medium rounded-full hover:bg-blue-50 transition cursor-pointer">
                  Discard
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={productLoading}
                  className="px-10 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition flex items-center gap-3 shadow-lg cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
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
