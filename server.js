const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 5001;
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://llwassim.github.io/bankingapp-frontend",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Required for handling cookies, authentication, or sessions
  allowedHeaders: ["Content-Type", "Authorization"], // Specify the headers your server expects
};

app.use(cors(corsOptions));
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

const usersRouter = require("./routes/users");

app.use("/api/users", usersRouter);
app.options("/api/users/signup", cors(corsOptions)); // Handle pre-flight for this specific route

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
