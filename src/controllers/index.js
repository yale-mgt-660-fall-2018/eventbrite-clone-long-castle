const eventsModels = require('../models/events.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const errors = [];
    var allEvents = [
        {
            id      : 1,
            title   : "Awesome 1",
            datetime: new Date(Math.random())
        }
    ];
    
    const template = 'index.njk';
    
    try {
        allEvents = await eventsModels.getAll(ctx.db);
        return ctx.render(template, { allEvents });
    } catch(e) {
        errors.push("there was an error retrieving all events");
        return ctx.render(template, { errors: errors });
    }
    
    const testEvents = [
        {
            id      : 1,
            title   : "Awesome 1",
            datetime: new Date(Math.random())
        }, 
        {
            id      : 2,
            title   : "Awesome 2",
            datetime: new Date(Math.random())
        },     
        {
            id      : 3,
            title   : "Awesome 3",
            datetime: new Date(Math.random())
        }, 
        {
            id      : 4,
            title   : "Awesome 4",
            datetime: new Date(Math.random())
        },     
        {
            id      : 5,
            title   : "Awesome 5",
            datetime: new Date(Math.random())
        }, 
        {
            id      : 6,
            title   : "Awesome 6",
            datetime: new Date(Math.random())
        },     
        {
            id      : 7,
            title   : "Awesome 7",
            datetime: new Date(Math.random())
        }, 
    ];
    
    return ctx.render(template, { allEvents });
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
