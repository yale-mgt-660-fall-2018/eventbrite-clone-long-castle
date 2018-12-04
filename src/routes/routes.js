const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const eventControllers = require('../controllers/event.js');

const router = new Router();
router.get('/', indexControllers.index);
router.get('/about', indexControllers.about);
router.get('/events/new', eventControllers.register);
router.post('/events/new', eventControllers.register);

module.exports = router;