/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const template = 'index.njk';
    const allEvents = [
     {
       id: 1,
       title: "Awesome 1",
       datetime: new Date(Math.random())
     }, 
     {
       id: 2,
       title: "Awesome 2",
       datetime: new Date(Math.random())
      },     {
       id: 3,
       title: "Awesome 3",
       datetime: new Date(Math.random())
     }, 
     {
       id: 4,
       title: "Awesome 4",
       datetime: new Date(Math.random())
      },     {
       id: 5,
       title: "Awesome 5",
       datetime: new Date(Math.random())
     }, 
     {
       id: 6,
       title: "Awesome 6",
       datetime: new Date(Math.random())
      },     {
       id: 7,
       title: "Awesome 7",
       datetime: new Date(Math.random())
     }, 
    ];
    return ctx.render(template, { allEvents });
}

async function about(ctx) {
    const template = 'about.njk';
    return ctx.render(template);
}

async function register(ctx) {
    const template = 'register.njk';
    return ctx.render(template);
}

module.exports = {
    index,
    about,
    register,
};
