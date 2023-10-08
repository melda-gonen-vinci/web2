var express = require('express');
var router = express.Router();

const AFFICHE = [
  {
    id: 1,
    title: 'Deadpool' ,
    duration : 108 ,
    budget : 58000000 ,
    link : 'https://www.imdb.com/title/tt1431045/plotsummary/',
    
  },
  {
    id: 2,
    title: 'Deadpool 2',
    duration : 120,
    budget : 110000000,
    link : 'https://www.imdb.com/title/tt5463162/plotsummary/',
  },
  {
    id: 3,
    title: 'Red notice',
    duration : 118,
    budget : 200000000,
    link : 'https://www.imdb.com/title/tt7991608/',
  }
  
];

//filter duration
router.get('/', (req, res) => {
  const minimumDuration = req?.query? Number(req.query['minimum-duration'])
  :undefined;
  if(typeof minimumDuration !== 'number' || minimumDuration <=0) 
    return res.sendStatus(400); //bad request

  if(!minimumDuration) 
    return res.json(AFFICHE);
  
  const filmsMinduration = [...AFFICHE].filter((film) => film.duration >= minimumDuration);
    return res.json(filmsMinduration);
});

//read film id
router.get('/:id', (req, res) => {
  const indexOfFilmFound = AFFICHE.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404); //Resource not found 

  return res.json(AFFICHE[indexOfFilmFound]);
});

//post new film
router.post('/', (req, res) => {
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const duration = typeof req?.body?.duration !== 'number' || req.body.duration < 0
    ? undefined 
    : req.body.duration;
  const budget = typeof req?.body?.budget !== 'number' || req.body.duration < 0
    ? undefined 
    : req.body.budget;
  const link = req?.body?.link?.trim().length !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link)
    return res.sendStatus(400); //bad request

  const titleOfFilmFound = AFFICHE.find((film) => film.title.toLowerCase() === title.toLowerCase());
  if(titleOfFilmFound)
    return res.sendStatus(409); //conflict

  const lastFilmIndex = AFFICHE?.length !== 0 ? AFFICHE.length - 1 : undefined;
  const lastId = lastFilmIndex !== undefined ? AFFICHE[lastFilmIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };

  AFFICHE.push(newFilm);
  res.json(newFilm);
});



module.exports = router;
