const expres = require('express');
const router = expres.Router();
const watson = require('../api/watson');

//Get 
router.get('/', (req,res)=>{
  res.status(200).send('Ok')
});

//Rotas do watason
router.post('/translate', watson.postTranslate);
router.post('/personality', watson.postPersonality);

module.exports = router;