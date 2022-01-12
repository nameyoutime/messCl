let mongoose = require('mongoose');
let config = require('./config')

class Database {

    /**
     * @returns {Database}
     */
    static get instance() {
        if (this._cache == null) {
            this._cache = new Database();
        }
        return this._cache;
    }
    async connect() {
        return new Promise((resolve, reject) => {
            mongoose.connect(config.CONNECTIONSTRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            const connection = mongoose.connection;
            connection.on("error", (err) => {
                reject(err);
            });
            connection.once("open", () => {
                resolve(connection);
            });
        });
    }
}
module.exports = Database