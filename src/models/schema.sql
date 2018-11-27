
DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE IF NOT EXISTS events (
    -- Integer primary key for events
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    -- 'date' is a reserved word in some SQL dialects.
    -- Here I quoted it to make sure it is interpreted
    -- as a column name.
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    -- The 'image_url' must be a URL ending in png, gif.
    image_url TEXT NOT NULL
        CHECK ( image_url ~ '^https?://.*\.(png|gif)$' ),
    "location" TEXT NOT NULL,
    -- Record the time at which this event was created
    created_at TIMESTAMP WITH TIME ZONE
        NOT NULL
        DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS registrations (
    event_id INT PRIMARY KEY REFERENCES events(id),
    email TEXT NOT NULL 
        CHECK ( email - 'yale.edu$' AND email = lower(email)),
    PRIMARY KEY (event_id, email),

);

CREATE TABLE IF NOT EXISTS registrations (
    event_id INT PRIMARY KEY REFERENCES events(id),
    email TEXT NOT NULL 
        CHECK ( email - 'yale.edu$' AND email = lower(email)),
    PRIMARY KEY (event_id, email),

);

SELECT * FROM registrations WHERE event_id = 5;
select * from registrations JOIN events on registrations.event_id = events.id;
