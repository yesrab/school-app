import express from "express";
import ViteExpress from "vite-express";
import "dotenv/config";
import "express-async-errors";
// import cors from "cors";
import statusMonitor from "express-status-monitor-plus";
import connect from "./db/connect.js";

ViteExpress.config({ mode: process.env.NODE_ENV });

//env variables
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB || "";
//env variables

const app = express();

// app.use(cors());

//express body json parsing middleware
app.use(express.json());

//express url parsing middleware
app.use(express.urlencoded({ extended: false }));

app.use(
  statusMonitor({
    path: "/api/status",
  })
);

app.get("/hello", (req, res) => {
  res.status(200).json({
    message: "Hello from the server",
    status: "success",
    currentTime: new Date().toISOString(),
    path: req.path,
    url: req.originalUrl,
  });
});

//teachers Route
import teachersRoutes from "./routes/teachers.js";
app.use("/api/v1/teachers", teachersRoutes);
//teachers Route

//student Route
import studentRoutes from "./routes/students.js";
app.use("/api/v1/students", studentRoutes);
//student Route

//classes Route
import classRoutes from "./routes/class.js";
app.use("/api/v1/class", classRoutes);
//classes Route

//analytics Route
import analyticsRoutes from "./routes/analytics.js";
app.use("/api/v1/analytics", analyticsRoutes);
//analytics Route

//error handler middleware
import globalErrorHandler from "./middleware/globalErrorHandler.js";
app.use(globalErrorHandler);
//error handler middleware

const startServer = async () => {
  try {
    await connect(DB_URI);
    ViteExpress.listen(app, PORT, () => {
      console.clear();
      console.log(`Server Started at port ${PORT}`);
      console.log("");
      console.log("\x1b[36m%s\x1b[0m", `http://localhost:${PORT}/`);
      console.log("^ click here");
      console.log("");
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();

