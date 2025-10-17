import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const categories = ["Outdoor", "Indoor", "Wall","Ceilings"];
  const types = [
    "Chair",
    "Table",
    "Bed",
    "Sofa",
    "Wardrobe",
    "Dressing Tables",
    "Dining Tables",
    "Lampshades",
  ];

  const toggleCategory = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((cat) => cat !== value) : [...prev, value]
    );
  };

  const toggleType = (e) => {
    const value = e.target.value;
    setSelectedTypes((prev) =>
      prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
    );
  };

  const applyFilters = () => {
    let result = [...products];

    // Search filter
    if (showSearch && search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Type/SubCategory filter
    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.subCategory));
    }

    // Sorting
    switch (sortType) {
      case "low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  };

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategories, selectedTypes, search, showSearch, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Sidebar */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown_icon"
          />
        </p>

        {/* Categories */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((cat) => (
              <label className="flex gap-2" key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  className="w-3"
                  onChange={toggleCategory}
                  checked={selectedCategories.includes(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Types/SubCategories */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {types.map((type) => (
              <label className="flex gap-2" key={type}>
                <input
                  type="checkbox"
                  value={type}
                  className="w-3"
                  onChange={toggleType}
                  checked={selectedTypes.includes(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
            value={sortType}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              sizes={item.sizes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
