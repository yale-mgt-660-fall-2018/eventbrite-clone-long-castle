const eventsModels = require('../models/events.js');

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
                ctx.request.body.picture,
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

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function detail(ctx) {
    const errors = [];
    const template = 'detail.njk';
    const event_id = ctx.params.id;
    try {
        console.log("about to look for event");
        const theEvent = await eventsModels.getByID(ctx.db, event_id);
        console.log("finished looking for event");
        console.log(theEvent);
        return ctx.render(template, { theEvent });
    } catch (e) {
        console.log(e);
        errors.push("there was an error finding the event");
    }
}

module.exports = {
    register,
    detail
};
