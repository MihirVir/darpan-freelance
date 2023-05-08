const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const hotelRoutes = require("./routes/hotel");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: `http://127.0.0.1:5500`,
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "images")));
app.use("/images", express.static("images"));
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/hotel", hotelRoutes);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`connected to mongo`))
  .catch((err) => console.log(`error connecting to mongo ${err}`));
app.listen(process.env.PORT || 9000, () => {
  console.log(`server running on ${process.env.PORT || 9000}`);
});
