const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const router = require("./modules/users/server");
const PORT = 3000;

const app = express();
app.use(fileUpload());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("<h1>Server is up and running</h1>");
  console.log(`Server is running on port ${PORT}`);
});

app.listen(PORT);
