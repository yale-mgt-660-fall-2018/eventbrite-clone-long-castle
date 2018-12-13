const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const eventControllers = require('../controllers/event.js');
const attendeeControllers = require('../controllers/attendee.js');
const APIControllers = require('../controllers/api.js');

const router = new Router();
router.get('/', indexControllers.index);
router.get('/about', indexControllers.about);
router.get('/finalreport', indexControllers.finalreport);
router.get('/events/new', eventControllers.register);
router.post('/events/new', eventControllers.register);
router.get('/events/:id', eventControllers.detail);
router.get('/donate', eventControllers.donation);
router.get('/support', eventControllers.donation);
router.post('/events/:event_id/register', attendeeControllers.register);
router.get('/events/:id/confirm/:confirmation', eventControllers.detail);
router.get('/api/events', APIControllers.events);

module.exports = router;