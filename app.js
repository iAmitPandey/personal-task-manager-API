// // import "./models/index.js";
// // import express from "express";
// // import { addUser, getUsers, getUser } from "./controllers/userController.js";

// // const app = express();
// // app.use(express.json());
// // app.post("/add", addUser);
// // app.get("/get", getUsers);
// // app.get("/get/:id", getUser);

// // app.listen(5000);

// import express, { json } from "express";
// import { config } from "dotenv";
// import sync from "./config/db.config.js";
// import authRoutes from "./routes/auth.routes.js";
// import taskRoutes from "./routes/tasks.routes.js";
// import errorHandler from "./middleware/error.middleware.js";

// config();

// const app = express();

// app.use(json());

// // Routes
// app.use("/auth", authRoutes);
// app.use("/tasks", taskRoutes);

// // Error Handling Middleware (should be the last middleware)
// app.use(errorHandler);

// // Connect to the database and start the server
// sync()
//   .then(() => {
//     console.log("Database connected successfully");
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((error) => {
//     console.error("Database connection error:", error);
//   });

import express, { json } from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import errorHandler from "./middleware/error.middleware.js";

config(); // Load environment variables

const app = express();
app.use(json());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Error Handling Middleware (should be the last middleware)
app.use(errorHandler);

// Connect to the database and start the server
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
