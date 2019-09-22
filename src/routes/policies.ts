import express from "express";
import { getPoliciesByUserName } from "../controllers/policies";
const router = express.Router();

router.get("/", getPoliciesByUserName);

export default router;
