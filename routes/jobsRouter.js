import express  from "express";
const router = express.Router()
import { createJob, deleteJob, getAllJobs, showStats, updateJob } from "../controllers/jobControllers.js";
import testUser from "../middleware/testUser.js";

router.route('/').post(testUser, createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob)
 

export default router