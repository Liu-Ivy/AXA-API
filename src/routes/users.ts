import express from "express";
import { getUser, getUserByPolicyId } from "../controllers/users";
const router = express.Router();

router.get("/", getUser);
router.get("/policyId/:id", getUserByPolicyId);

export default router;
