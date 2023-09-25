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

// Read all the films from the affiche
router.get('/', (req, res, next) => {
  console.log('GET /films');
  res.json(AFFICHE);
});

module.exports = router;
