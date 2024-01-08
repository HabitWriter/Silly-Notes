import { Router } from "express";
import topicRouter from "./topic.routes.js"
import subtopicRouter from "./subtopic.routes.js";

const router = Router();

router.use('', subtopicRouter);

router.use("/api/topic", topicRouter)


export default router;
