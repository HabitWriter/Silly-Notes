import { Router } from 'express';
import { Subtopic, Topic } from '../models/index.js';

const topicRouter = Router();

topicRouter.get('/all', async (req, res) => {
  const allTopics = await Topic.findAll();
  res.json(allTopics);
});

topicRouter.post('/new', async (req, res) => {
    const {title} = req.body;

    const topic = await Topic.create({title : title}) 
    
    res.json(topic)
});

export default topicRouter; 