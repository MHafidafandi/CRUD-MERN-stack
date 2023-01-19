const express = require("express");
const app = express();
const port = 5000;
require("./utils/db");
const cors = require("cors");
const { getlocal, signup, signin } = require("./routers/users");
const {
  getProduct,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./routers/products");
const FileUpload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(FileUpload());
app.use(express.static("public"));

app.post("/api/users", signup);
app.post("/api/auth", signin);

app.get("/product", getProduct);
app.get("/product/:id", getProductById);
app.post("/product", addProduct);
app.put("/product/:id", updateProduct);
app.delete("/product/:id", deleteProduct);

app.listen(port, (err, result) => {
  console.log(`Server running at http://localhost:${port}`);
});
