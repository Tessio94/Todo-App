const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = {
  // origin: "http://localhost:5173",
  origin: "https://app1.tessio94.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

const todoRouter = require("./router/todoRoutes");
const loginRouter = require("./router/loginRoutes");

app.use("/api", todoRouter);
app.use("/auth", loginRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
