const eventsModels = require('../models/events.js');
const attendeesModels = require('../models/attendees.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function register(ctx) {
    const errors = [];
    const event_id = ctx.params.event_id;
    if (ctx.method === 'POST') {
        console.log("trying to POST a new attendee");
        try {
            const theAttendee = await attendeesModels.insert(
                ctx.db,
                event_id,
                ctx.request.body.email,
            );
            console.log(theAttendee);
            ctx.redirect('/events/' + event_id);
        } catch (e) {
            errors.push("there was an error saving");
        }
    }
}



/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function showAll(ctx) {
    const errors = [];
    
    const template = 'index.njk';
    
    try {
        const num = await eventsModels.count(ctx.db);
        const allEvents = await eventsModels.getAll(ctx.db);
        return ctx.render(template, { allEvents, num });
    } catch(e) {;
        errors.push("there was an error retrieving all events");
        return ctx.render(template, { errors: errors });
    }
}

module.exports = {
    register,
    showAll
};
