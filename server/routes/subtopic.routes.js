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
    subtopic.topicId = topic.topicId


    console.log(subtopic);
    res.json(subtopic)
});

subtopicRouter.post('/edit', async (req, res) => {
  const {subtopicId, changedField, change} = req.body;

  const subtopic = await Subtopic.findOne({ where: {subtopicId : subtopicId}})
  subtopic[changedField] = change
  console.log(changedField);
  console.log(change);
  
  await subtopic.save();
  console.log(subtopic);

  res.json(subtopic);

});

// subtopicRouter.get('/:movieId', async (req, res) => {
//   const { movieId } = req.params;
//   const movie = await Movie.findByPk(movieId);
//   res.json(movie);
// });

export default subtopicRouter; 