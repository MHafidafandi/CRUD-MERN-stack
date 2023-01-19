import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const Add = () => {
  const [data, setData] = useState({
    product_name: "",
    product_desc: "",
    product_rate: "",
    product_stok: "",
    product_price: "",
    product_img: "",
  });
  const navigate = useNavigate();

  const handlerChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handlerFile = (e) => {
    setData({ ...data, product_img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_img", data.product_img);
    formData.append("product_name", data.product_name);
    formData.append("product_desc", data.product_desc);
    formData.append("product_stok", data.product_stok);
    formData.append("product_rate", data.product_rate);
    formData.append("product_price", data.product_price);
    try {
      await axios.post("http://localhost:5000/product", formData);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.error_message);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Add Product</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handlerChange}
              name="product_name"
              placeholder="Nama Product"
              className={styles.input}
              value={data.product_name}
            />
            <input
              type="text"
              name="product_desc"
              onChange={handlerChange}
              placeholder="Deskripsi Product"
              className={styles.input}
              value={data.product_desc}
            />
            <input
              type="text"
              name="product_rate"
              onChange={handlerChange}
              placeholder="Rate Product"
              className={styles.input}
              value={data.product_rate}
            />
            <input
              type="text"
              name="product_stok"
              onChange={handlerChange}
              placeholder="Stok Product"
              className={styles.input}
              value={data.product_stok}
            />
            <input
              type="text"
              name="product_price"
              onChange={handlerChange}
              placeholder="Price Product"
              className={styles.input}
              value={data.product_price}
            />
            <label htmlFor="file">Gambar</label>
            <input
              type="file"
              id="file"
              name="product_img"
              onChange={handlerFile}
              className={styles.input}
            />
            <button className={styles.button}>Add Product</button>
          </form>
        </div>
      </div>
    </>
  );
};
