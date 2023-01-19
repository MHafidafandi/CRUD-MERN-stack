import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

export const ProductItems = ({ data }) => {
  const [error, setError] = useState("");

  const handleClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      window.location.reload();
    } catch (error) {
      setError(error.response.data.error_message);
    }
  };
  return (
    <>
      <div className="product_items">
        {data.map((items) => (
          <div className="box" key={items._id}>
            <div className="img">
              <img src={items.url_img} alt="" />
              <div className="overlay">
                <button className="button">
                  <Link to={"/update/" + items._id}>
                    <FiShoppingBag />
                  </Link>
                </button>
                <button className="button">
                  <AiOutlineHeart />
                </button>
                <button
                  className="button"
                  onClick={() => handleClick(items._id)}
                >
                  <AiOutlineClose />
                </button>
              </div>
            </div>
            <div className="details">
              <h3>{items.product_name}</h3>

              <p>{items.product_desc}</p>
              <h4>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(items.product_price)}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
