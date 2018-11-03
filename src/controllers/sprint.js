/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function sprint(ctx) {
    const template = 'sprint.njk';
    return ctx.render(template, { });
}

module.exports = {
    sprint,
};
