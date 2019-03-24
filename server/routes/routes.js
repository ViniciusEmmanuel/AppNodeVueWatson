const expres = require('express');
const router = expres.Router();
const watson = require('../api/watson');


//Rotas do watason
router.post('/translate', watson.postTranslate);
router.post('/personality', watson.postPersonality);

module.exports = router;