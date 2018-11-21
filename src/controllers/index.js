/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const template = 'index.njk';
    const waysOfBeingAwesome = ['awesome1', 'awesome2', 'awesome3'];
    return ctx.render(template, { waysOfBeingAwesome });
}

async function about(ctx) {
    const template = 'index.njk';
}

module.exports = {
    index,
    about,
};
