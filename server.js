const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

// connecting to databse
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profiles"));
app.use("/api/post", require("./routes/api/posts"));
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("appi is running!");
});

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));