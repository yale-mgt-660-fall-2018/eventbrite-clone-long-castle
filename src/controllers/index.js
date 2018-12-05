const eventsModels = require('../models/events.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const errors = [];
    
    const template = 'index.njk';
    
    try {
        const num = await eventsModels.count(ctx.db);
        const allEvents = await eventsModels.getAll(ctx.db);
        return ctx.render(template, { allEvents, num });
    } catch(e) {
        console.log(e);
        errors.push("there was an error retrieving all events");
        return ctx.render(template, { errors: errors });
    }
}

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function about(ctx) {
    const template = 'about.njk';
    return ctx.render(template);
}

module.exports = {
    index,
    about,
};
