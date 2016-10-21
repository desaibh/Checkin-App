const CheckinDAO = require('../services/CheckinDAO');

class CheckinController {
  static getAllOfCurrentUser(req, res) {
    CheckinDAO.searchBy({ user_id: req.session.currentUser.id }).then((checkins) => {
      res.status(200).json(checkins);
    });
  }
  static create(req, res) {
    const checkinData = {
      latitude: req.latitude,
      longitude: req.longitude,
    };
    CheckinDAO.create(checkinData)
           .then((checkin) => res.status(200).json(checkin));
  }
  static delete(req, res) {
    CheckinDAO.delete(req.params.id)
           .then(() => res.status(204).end());
  }
}

module.exports = CheckinController;
