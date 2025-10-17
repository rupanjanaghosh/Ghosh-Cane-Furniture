import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const SIZE_OPTIONS = [
  "Standard",
  "2-Seater",
  "3-Seater",
  "4-Seater",
  "6-Seater",
  "Queen",
  "King",
];

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Outdoor");
  const [subCategory, setSubCategory] = useState("Chair");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (index, file) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImages([null, null, null, null]);
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full items-start gap-3"
      >
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2">
            {images.map((img, idx) => (
              <label key={idx} htmlFor={`image${idx + 1}`}>
                <img
                  className="w-20"
                  src={
                    img
                      ? URL.createObjectURL(img)
                      : assets.upload_area
                  }
                  alt="upload_area"
                />
                <input
                  onChange={(e) => handleImageChange(idx, e.target.files[0])}
                  type="file"
                  id={`image${idx + 1}`}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-[500px] px-3 py-2"
            placeholder="Write content here"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-3 py-2"
            >
              <option value="Outdoor">Outdoor</option>
              <option value="Indoor">Indoor</option>
              <option value="Wall">Wall</option>
              <option value="Ceilings">Ceilings</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Sub category</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className="w-full px-3 py-2"
            >
              <option value="Chair">Chair</option>
              <option value="Table">Table</option>
              <option value="Bed">Bed</option>
              <option value="Sofa">Sofa</option>
              <option value="Wardrobe">Wardrobe</option>
              <option value="Lampshade">Lampshade</option>
              <option value="Dressing Tables">Dressing Table</option>
              <option value="Dining Tables">Dining Table</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product Price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              placeholder="2500"
              required
            />
          </div>
        </div>

        <div>
          <p className="mb-2">Product Sizes / Variants</p>
          <div className="flex flex-wrap gap-3">
            {SIZE_OPTIONS.map((size) => (
              <div key={size} onClick={() => handleSizeToggle(size)}>
                <p
                  className={`${
                    sizes.includes(size) ? "bg-green-200" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
                >
                  {size}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to bestseller
          </label>
        </div>

        <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;