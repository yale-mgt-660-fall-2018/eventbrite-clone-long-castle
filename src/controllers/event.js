const eventsModels = require('../models/events,js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function register(ctx) {
    const errors = [];
    if (ctx.method === 'POST') {
        try {
            const theEvent = await eventsModels.insert(
                ctx.db,
                ctx.request.body.event_name,
                ctx.request.body.event_start_time,
                ctx.reqeust.body.image,
                ctx.request.body.event_location,
            );
            ctx.redirect('/events/' + theEvent.id);
        } catch (e) {
            errors.push("there was an error saving");
        }
    }
    const template = 'register.njk';
    return ctx.render(template, { errors: errors });
}

module.exports = {
    register,
};