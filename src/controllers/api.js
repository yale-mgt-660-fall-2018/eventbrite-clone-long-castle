const eventsModels = require('../models/events.js');
const attendeesModels = require('../models/attendees.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function events(ctx) {
    console.log("entered API events controller");
    const events = [];
    const errors = [];
    const template = "";
    try {
        events = await eventsModels.getAll(ctx.db);
        console.log("got events!")
        ctx.status = 200;
        ctx.body = events;
    } catch (e) {
        errors.push("failed to find all events");
    }
}

module.exports = {
    events
};
