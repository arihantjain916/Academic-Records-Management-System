const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
var cors = require("cors");
const connectDB = require("./components/db/conn");
const port = process.env.PORT || 3000;

dotenv.config();
app.use(
  express.urlencoded({
    extended: true,
  })
);
// var whitelist = ["*"];
var corsOptions = {
  origin: "*",
  // function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(null, false);
  //   }
  // }
  methods: ["GET", "PATCH", "POST", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "device-remember-token",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
  ],
};
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Routes
const userRoute = require("./Routes/userRoutes");
const studentRoute = require("./Routes/studentRoutes");
const classRoute = require("./Routes/classRoute");
const markRoute = require("./Routes/marksRoute");
const authorRoute = require("./Routes/graphqlRoutes/authorRoute");
const bookRoute = require("./Routes/graphqlRoutes/bookRoute");
const rentRoute = require("./Routes/graphqlRoutes/rentRoute");

// Routes
app.get("/api/v1", (req, res) => {
  res.send("Welcome to ERP-PORTAL API");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/student", studentRoute);
app.use("/api/v1/class", classRoute);
app.use("/api/v1/marks", markRoute);
app.use("/api/v1/author", authorRoute);
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/rent", rentRoute);

// Start the server
const startServer = async (port) => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

startServer(port);
