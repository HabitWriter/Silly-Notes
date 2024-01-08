import { Router } from 'express';
import { Subtopic, Topic } from '../models/index.js';

const topicRouter = Router();

topicRouter.get('/all', async (req, res) => {
  const allTopics = await Topic.findAll();
  res.json(allTopics);
});

// topicRouter.post('/new', async (req, res) => {
//     const {title, topicTitle} = req.body;

//     const topic = await Topic.findOne({ where: {title : topicTitle}});

//     const subtopic = await Subtopic.create({ title : title}) 
//     await topic.addSubtopic(subtopic)


//     res.json(subtopic)
// });

// subtopicRouter.get('/:movieId', async (req, res) => {
//   const { movieId } = req.params;
//   const movie = await Movie.findByPk(movieId);
//   res.json(movie);
// });

export default topicRouter; 