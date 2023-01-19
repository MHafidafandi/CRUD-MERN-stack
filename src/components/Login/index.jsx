import { useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
