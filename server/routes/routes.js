const expres = require('express');
const router = expres.Router();
const watson = require('../api/watson');


//Rotas do watason
router.post('/api/translate', watson.postTranslate);
router.post('/api/personality', watson.postPersonality);

module.exports = router;