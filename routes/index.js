import express from "express";
const router = express.Router();
import {
  registerController,
  loginController,
  refreshController,
  noteController,
} from "../controllers";
import auth from "../middlewares/auth";

// user authentication
router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);

// notes CRUD
router.post("/notes", auth, noteController.create);
router.get("/notes", auth, noteController.read);
router.put("/notes/:id", auth, noteController.update);
router.delete("/notes/:id", auth, noteController.delete);

export default router;
