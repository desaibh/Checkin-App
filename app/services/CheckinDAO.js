const db = require('../config/db');
const sql = require('../config/sqlProvider').checkins;
const Checkin = require('../models/Checkin');

class CheckinDAO {
  static create({ note, latitude, longitude, streetaddress, user_id }) {
    return db.one(sql.create, [note, latitude, longitude, streetaddress, user_id])
             .then((data) => {
               new Checkin(data);
             });
  }
  static delete(id) {
    return db.none(sql.delete, [id]);
  }
  static searchBy(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.map(sql.find, [key, value], (row) => new Checkin(row));
  }
}

module.exports = CheckinDAO;
