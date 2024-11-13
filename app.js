import "./models/index.js";
import express from "express";
import { addUser } from "./controllers/userController.js";

const app = express();
app.use(express.json());
app.post("/add", addUser);

app.listen(5000);
