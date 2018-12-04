const eventsModels = require('../models/events.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function register(ctx) {
    console.log("I am here");
    const errors = [];
    if (ctx.method === 'POST') {
        console.log("I am here!!");
        try {
            const theEvent = await eventsModels.insert(
                ctx.db,
                ctx.request.body.event_name,
                ctx.request.body.event_start_time,
                ctx.request.body.picture,
                ctx.request.body.event_location,
            );
            console.log(theEvent);
            ctx.redirect('/events/' + theEvent.id);
        } catch (e) {
            console.log(e);
            errors.push("there was an error saving");
        }
    }
    const template = 'register.njk';
    return ctx.render(template, { errors: errors });
}

module.exports = {
    register,
};
