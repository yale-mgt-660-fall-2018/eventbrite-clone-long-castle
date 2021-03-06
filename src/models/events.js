/**
 * @param {Database} db - Pg-promise database object
 * @param  {String} title - Title of the new event
 * @param  {String} date - Date and time of the new event
 * @param  {String} imageURL - URL for cover image of the event
 * @param  {String} location - Location of the event
 * @returns {Promise} - Promise that resolves to new row in db.
 */
async function insert(db, title, date, imageURL, location) {
    // Notice that our JavaScript variables are CamelCase
    // and our SQL variables are snake_case. This is a
    // common convention.
    console.log("just entered eventsModels.insert function");
    console.log(title);
    console.log(date);
    console.log(imageURL);
    console.log(location);
    const stmt = `
        INSERT INTO events (title, date, image_url, location)
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, date, image_url, location, created_at
    `;
    return db.one(stmt, [title, date, imageURL, location]);
}

/**
 * @param {Database} db - Pg-promise database object
 * @returns {Promise} - Promise that resolves to and int
 */
async function count(db) {
    console.log("inside count");
    const stmt = 'select COUNT(*) FROM events';
    const result = await db.one(stmt);
    console.log(result);
    return parseInt(result.count, 10);
}

/**
 * @param  {Database} db - Pg-promise database object
 * @param  {String} searchString - String for which to search event locations
 * @returns {Promise} - Promise that resolves to one event or null
 */
async function getByLocation(db, searchString) {
    // See pgpromise documentation for this ":value" syntax
    // and why it is used.
    const stmt = `
        SELECT * FROM events WHERE
        location ILIKE '%$1:value%'
    `;
    return db.oneOrNone(stmt, [searchString]);
}

/**
 * @param  {Database} db - Pg-promise database object
 * @param  {String} searchString - String for which to search event id
 * @returns {Promise} - Promise that resolves to one event or null
 */
async function getByID(db, searchString) {
    // See pgpromise documentation for this ":value" syntax
    // and why it is used.
    console.log("just entered getByID");
    const stmt = `
        SELECT * FROM events WHERE
        id = $1
    `;
    return db.oneOrNone(stmt, [searchString]);
}


/**
 * @param  {Database} db - Pg-promise database object
 * @returns {Promise} - Promise that resolves to many events or null
 */
async function getAll(db) {
    console.log("inside getAll");
    const stmt = `
        SELECT * FROM events
    `;
    const result = await db.any(stmt, [true]);
    console.log(result);
    return result;
}


module.exports = {
    insert,
    count,
    getByLocation,
    getByID,
    getAll
};
