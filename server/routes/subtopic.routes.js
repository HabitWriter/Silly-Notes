import { Router } from 'express';
import { Subtopic, Topic } from '../models/index.js';

const subtopicRouter = Router();

subtopicRouter.get('/all', async (req, res) => {
  const allSubtopics = await Subtopic.findAll();
  res.json(allSubtopics);
});

subtopicRouter.post('/new', async (req, res) => {
    const {title, topicId} = req.body;

    const topic = await Topic.findOne({ where: {topicId : topicId}});

    const subtopic = await Subtopic.create({ title : title}) 
    await topic.addSubtopic(subtopic)


    res.json(subtopic)
});

// subtopicRouter.get('/:movieId', async (req, res) => {
//   const { movieId } = req.params;
//   const movie = await Movie.findByPk(movieId);
//   res.json(movie);
// });

export default subtopicRouter; 