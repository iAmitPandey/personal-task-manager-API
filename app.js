import express, { json } from "express";
import { config } from "./config/config.js";
import { connectDB } from "./connections/db.connect.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();
app.use(json());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(errorHandler);

connectDB().then(() => {
  const PORT = config.port || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
