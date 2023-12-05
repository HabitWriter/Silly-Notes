import { Router } from "express";

import subtopicRouter from "./subtopic.routes.js";

const router = Router();

router.use('', subtopicRouter);


export default router;
