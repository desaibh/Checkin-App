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
  static update({ note, id }) {
    return db.none(sql.update, [note, id])
              .then((data) => {
                  console.log(data); // printing successful transaction output;
              })
              .catch((error) => {
                  console.log(error); // printing the error;
              });
  }
  static delete({ id }) {
    return db.none(sql.delete, [id])
              .then((data) => {
                  console.log(data); // printing successful transaction output;
              })
              .catch((error) => {
                  console.log(error); // printing the error;
              });;
  }
  static searchBy(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.map(sql.find, [key, value], (row) => new Checkin(row));
  }
}

module.exports = CheckinDAO;
