const eventsModels = require('../models/events.js');
const attendeesModels = require('../models/attendees.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function register(ctx) {
    const errors = [];
    if (ctx.method === 'POST') {
        console.log("trying to POST a new event");
        try {
            console.log(ctx.request.body);
            const eventDate = new Date(
                ctx.request.body.year,
                ctx.request.body.month,
                ctx.request.body.day,
                ctx.request.body.hour,
                ctx.request.body.minute
            );
            console.log("Assembled date: " + eventDate);
            console.log("Datepicker date: " + ctx.request.body.event_start_time);
            const theEvent = await eventsModels.insert(
                ctx.db,
                ctx.request.body.title,
                eventDate,
                ctx.request.body.image,
                ctx.request.body.location,
            );
            console.log(theEvent);
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
    const currentTime = new Date();
    console.log(currentTime.getTime());
    const AB = (currentTime.getTime() % 2 == 0) ? true : false; 
    console.log(AB);
    const donation = AB ? "Donate" : "Support";
    try {
        console.log("about to look for event");
        const theEvent = await eventsModels.getByID(ctx.db, event_id);
        console.log("finished looking for event");
        console.log(theEvent);
        console.log("now searching for attendees")
        const attendees = await attendeesModels.getByEventID(ctx.db, event_id);
        console.log("finished looking for attendees");
        console.log(attendees);
        
        const confirmation = ctx.params.confirmation;
        return ctx.render(template, { theEvent, donation, attendees, confirmation });
    } catch (e) {
        console.log(e);
        errors.push("there was an error finding the event");
    }
}


/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function donation(ctx) {
    console.log("entered donation controller");
    const template = 'donation.njk';
    return ctx.render(template);
}

module.exports = {
    register,
    detail,
    donation
};
