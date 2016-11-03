const db = require('../config/db');
const sql = require('../config/sqlProvider').checkins;
const Checkin = require('../models/Checkin');

class CheckinDAO {
  static create({ note, latitude, longitude, streetaddress, user_id }) {
    return db.one(sql.create, [note, latitude, longitude, streetaddress, user_id])
             .then((data) => {
               console.log(data);
               new Checkin(data);
             });
  }
  // static getAll({ checkins })
  static update({ id, note, latitude, longitude, streetaddress, user_id }) {
    return db.one(sql.update, [id, note]);
  }
  static delete(id) {
    return db.one(sql.delete, [id]);
  }
  static searchBy(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.map(sql.find, [key, value], (row) => new Checkin(row));
  }
}

module.exports = CheckinDAO;
