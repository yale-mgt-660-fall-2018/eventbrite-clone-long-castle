/**
 * @param {Database} db - Pg-promise database object
 * @param  {String} event_id - Event being registered for
 * @param  {String} email - Email id of the attendee
 * @returns {Promise} - Promise that resolves to new row in db.
 */
async function insert(db, event_id, email) {
    console.log("just entered attendee insert function");
    const stmt = `
        INSERT INTO registrations (event_id, email)
        VALUES ($1, $2)
        RETURNING id, event_id, email
    `;
    return db.one(stmt, [event_id, email]);
}

/**
 * @param {Database} db - Pg-promise database object
 * @returns {Promise} - Promise that resolves to and int
 */
async function count(db) {
    console.log("inside attendee count");
    const stmt = 'select COUNT(*) FROM registrations';
    const result = await db.one(stmt);
    console.log(result);
    return parseInt(result.count, 10);
}


/**
 * @param  {Database} db - Pg-promise database object
 * @param  {String} searchString - String for which to search event id
 * @returns {Promise} - Promise that resolves to one event or null
 */
async function getByEventID(db, searchString) {
    console.log("just entered getByEventID");
    const stmt = `
        SELECT * FROM registrations WHERE
        event_id = $1
    `;
    return db.any(stmt, [searchString]);
}


/**
 * @param  {Database} db - Pg-promise database object
 * @returns {Promise} - Promise that resolves to many events or null
 */
async function getAll(db) {
    console.log("inside getAll");
    const stmt = `
        SELECT * FROM registrations
    `;
    const result = await db.any(stmt, [true]);
    console.log(result);
    return result;
}


module.exports = {
    insert,
    count,
    getAll,
    getByEventID
};
