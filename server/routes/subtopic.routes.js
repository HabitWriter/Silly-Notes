import { Router } from 'express';
import { Subtopic } from '../models/index.js';

const subtopicRouter = Router();

// subtopicRouter.get('/all', async (req, res) => {
//   const allMovies = await Movie.findAll();
//   res.json(allMovies);
// });

// subtopicRouter.get('/:movieId', async (req, res) => {
//   const { movieId } = req.params;
//   const movie = await Movie.findByPk(movieId);
//   res.json(movie);
// });

export default subtopicRouter;