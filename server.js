const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 5001;
const cors = require("cors");
const path = require("path");
require("dotenv").config();
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://llwassim.github.io/bankingapp-frontend",
    "https://llwassim.github.io",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
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
app.options("/api/users/login", cors(corsOptions));


const isLocalDevelopment = process.env.NODE_ENV === "development";

// Check if the application is running in a local development environment
if (!isLocalDevelopment) {
  // Serve the React build files when deployed on the EC2 instance
  app.use(express.static(path.join(__dirname, "../bankingapp/build")));

  const serverDirectory = path.join(
    __dirname,
    "../bankingapp/build",
    "index.html"
  );
  // Serve the index.html for all routes
  app.get("*", (req, res) => {
    res.sendFile(serverDirectory);
  });

  console.log(
    "This is where we are going locally for routing: " + serverDirectory
  );
}

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
