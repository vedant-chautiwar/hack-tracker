import express from "express";
import {
  createHackathon,
  deleteHackathon,
  getHackathonById,
  getHackathons,
  updateHackathon
} from "../controllers/hackathonController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getHackathons).post(createHackathon);
router
  .route("/:id")
  .get(getHackathonById)
  .put(updateHackathon)
  .delete(deleteHackathon);

export default router;
