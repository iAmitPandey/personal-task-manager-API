import express from "express";
import {
  create,
  findAll,
  update,
  deleteTutorial,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.put("/:id", update);
router.delete("/:id", deleteTutorial);

export default router;
