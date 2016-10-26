class Checkin {
  constructor({ id, note, latitude, longitude, streetaddress, user_id }) {
    this.id = id;
    this.note = note;
    this.latitude = latitude;
    this.longitude = longitude;
    this.streetaddress = streetaddress;
    this.user_id = user_id;
  }
}

module.exports = Checkin;
