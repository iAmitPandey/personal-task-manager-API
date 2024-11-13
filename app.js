import express, { json } from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import errorHandler from "./middleware/error.middleware.js";

config();

const app = express();
app.use(json());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(errorHandler);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
