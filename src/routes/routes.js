const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');

const router = new Router();
router.get('/', indexControllers.index);
router.get('/about', indexControllers.about);
router.get('/events/new', indexControllers.register);


module.exports = router;