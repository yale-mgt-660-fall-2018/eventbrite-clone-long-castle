const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const sprintControllers = require('../controllers/sprint.js');

const router = new Router();
router.get('/', indexControllers.index);
router.get('/sprint', sprintControllers.sprint);

module.exports = router;
