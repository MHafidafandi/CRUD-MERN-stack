import React, { useState } from "react";
import { Heading } from "../../common/Heading";
import { ProductItems } from "./ProductItems";
import axios from "axios";
import { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Product = () => {
  const [data, setData] = useState([]);

  const [error, setError] = useState("");
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    try {
      const { data: res } = await axios.get("http://localhost:5000/product");
      setData(res.products);
    } catch (error) {
      setError(error.response.data.error_message);
    }
  };

  return (
    <>
      <section className="product">
        <div className="container">
          <Heading
            title="All Product"
            desc="Check the hottest Product of all time"
          />
          <button className="button">
            <Link to="/add">
              <AiOutlinePlusCircle />
              Add Product
            </Link>
          </button>
          <br />
          <ProductItems data={data} />
        </div>
      </section>
    </>
  );
};
