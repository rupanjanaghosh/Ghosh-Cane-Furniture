import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); 

  // Fetch product data from context
  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setSelectedImage(product.image?.[0]);
    }
  }, [productId, products]);

  if (!productData) return <div className="opacity-0"></div>;

  const handleAddToCart = () => {
    if (productData.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a variant before adding to cart.");
      return;
    }
    addToCart(productData._id, selectedSize);
    toast.success("Added to cart!");
  };

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* --------- Product Images and Info --------- */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, idx) => (
              <img
                key={idx}
                onClick={() => setSelectedImage(img)}
                src={img}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                  selectedImage === img ? "border border-gray-700" : ""
                }`}
                alt={`product-${idx}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={selectedImage} alt="product" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium font-serif font-semibold  text-2xl mt-2">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={assets.star_icon}
                alt="star"
                className="w-3 h-3"
              />
            ))}
            <img
              src={assets.star_dull_icon}
              alt="star_dull"
              className="w-3 h-3"
            />
            <p className="pl-2 text-sm text-gray-500">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* --------- Furniture Variants (Sizes) --------- */}
          {productData.sizes && productData.sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Select Variant:</p>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm mt-6 active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          {/* Product Info Notes */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>✅ 100% Original product.</p>
            <p>💰 Cash on delivery is available on this product.</p>
            <p>🔁 Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* --------- Description & Review Section --------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
          <p>
            This product is listed under category:{" "}
            <b>
              {productData.category} - {productData.subCategory}
            </b>
          </p>
          {productData.sizes?.length > 0 && (
            <p>
              Available variants:{" "}
              <b>{productData.sizes.join(", ")}</b>
            </p>
          )}
        </div>
      </div>

      {/* --------- Related Products --------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
