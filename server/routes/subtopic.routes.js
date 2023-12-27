import { Router } from 'express';
import { Subtopic } from '../models/index.js';

const subtopicRouter = Router();

subtopicRouter.get('/all', async (req, res) => {
  const allSubtopics = await Subtopic.findAll();
  res.json(allSubtopics);
});

// subtopicRouter.get('/:movieId', async (req, res) => {
//   const { movieId } = req.params;
//   const movie = await Movie.findByPk(movieId);
//   res.json(movie);
// });

export default subtopicRouter;