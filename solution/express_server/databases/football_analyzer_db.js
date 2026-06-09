const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


/**
 * The MongoDB connection string.
 * @type {string}
 */
const mongoDB = 'mongodb://localhost:27017/football_analyzer_db';

/**
 * Set mongoose's Promise to use Node's Promise.
 */
mongoose.Promise = global.Promise;

/**
 * Establish a connection to the MongoDB database.
 * @type {Promise}
 * @property {boolean} useNewUrlParser - The underlying MongoDB driver has deprecated the current connection string parser.
 * @property {boolean} useUnifiedTopology - Use the new topology engine.
 * @property {boolean} checkServerIdentity - Do not check server identity for TLS.
 * @returns {Promise} Returns a promise that will resolve when the connection is successfully established, or reject if there is an error.
 */
connection = mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    checkServerIdentity: false,
})
    .then(() => {
        /**
         * Log a success message to the console if the connection is successful.
         */
        console.log('connection to mongodb worked!');
    })
    .catch((error) => {
        /**
         * Log an error message to the console if the connection fails.
         * @param {Object} error - The error object containing details about the error.
         */
        console.log('connection to mongodb did not work! ' + JSON.stringify(error));
    });