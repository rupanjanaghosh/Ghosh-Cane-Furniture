import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, sizes }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div>
      <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition ease-in-out"
            src={image && image[0] ? image[0] : ""}
            alt={name}
          />
        </div>

        <p className="pt-3 pb-1 text-sm font-serif font-medium">{name}</p>

        <p className="text-sm font-semibold mt-1">
          {currency}
          {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
