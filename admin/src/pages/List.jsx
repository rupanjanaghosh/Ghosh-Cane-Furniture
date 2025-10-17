import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);

  // 🧠 Fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/list`);
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching product list");
    }
  };

  // 🗑️ Remove a product
  const handleRemoveProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Product removed successfully");
        fetchProducts();
      } else {
        toast.error(data.message || "Failed to remove product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error removing product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <p className="mb-2 text-lg font-medium">All Products</p>

      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product Rows */}
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-3 border text-sm"
            >
              <img
                className="w-12 h-12 object-cover rounded"
                src={item.image?.[0]}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <button
                onClick={() => handleRemoveProduct(item._id)}
                className="text-red-500 text-right md:text-center hover:underline"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-2">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
