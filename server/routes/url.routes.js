import { Router } from 'express';
import { Subtopic, Topic, Url } from '../models/index.js';

const urlRouter = Router();

urlRouter.get('/all', async (req, res) => {
  const allSubtopics = await Subtopic.findAll({ include: [Url] });
  res.json(allSubtopics);
});

urlRouter.post('/new', async (req, res) => {
    const {title, topicId} = req.body;

    const topic = await Topic.findOne({ where: {topicId : topicId}});

    const subtopic = await Subtopic.create({ title : title}) 
    await topic.addSubtopic(subtopic)
    subtopic.topicId = topic.topicId


    console.log(subtopic);
    res.json(subtopic)
});

urlRouter.post('/edit', async (req, res) => {
  const {urlField, urlId, change} = req.body;

  const url = await Url.findOne({ where: {urlId : urlId}})
  url[urlField] = change
  console.log(urlId);
  console.log(change);
  
  await url.save();
  console.log(url);

  res.json(url);

});

urlRouter.patch('/edit-title', async (req, res) => {
  const { subtopicId, newTitle } = req.body;

  const subtopic = await Subtopic.findOne({ where: { subtopicId: subtopicId } });
  
  if (!subtopic) {
    return res.status(404).json({ error: 'Subtopic not found' });
  }

  subtopic.title = newTitle;
  
  await subtopic.save();

  res.json(subtopic);
});

urlRouter.delete('/delete/:subtopicId', async (req, res) => {
  const { subtopicId } = req.params;

  const subtopic = await Subtopic.findOne({ where: { subtopicId: subtopicId } });
  
  if (!subtopic) {
    return res.status(404).json({ error: 'Subtopic not found' });
  }

  await subtopic.destroy();

  res.json({ message: 'Subtopic deleted successfully' });
});
// subtopicRouter.get('/:movieId', async (req, res) => {
//   const { movieId } = req.params;
//   const movie = await Movie.findByPk(movieId);
//   res.json(movie);
// });

export default urlRouter; 