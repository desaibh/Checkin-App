const CheckinDAO = require('../services/CheckinDAO');

class CheckinController {
  static getAll(req, res) {
    CheckinDAO.searchBy({ user_id: req.session.currentUser.id }).then((checkins) => {
      res.status(200).json(checkins);
    });
  }
  static create(req, res) {
    const checkinData = {
      note: req.body.body[0],
      latitude: req.body.body[1],
      longitude: req.body.body[2],
      streetaddress: req.body.body[3],
      user_id: req.session.currentUser.id,
    };
    CheckinDAO.create(checkinData)
           .then((checkin) => res.status(200).json(checkin));
  }
  static update(req, res) {
    const checkinData = {
      note: req.body.note,
      id: req.params.id,
    };
    CheckinDAO.update(checkinData);
  }
  static delete(req, res) {
    CheckinDAO.delete(req.params.id)
           .then(() => res.status(204).send("hello").end());
  }
}

module.exports = CheckinController;
