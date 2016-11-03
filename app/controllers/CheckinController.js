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
    console.log(checkinData, "data");
    CheckinDAO.create(checkinData)
           .then((checkin) => res.status(200).json(checkin));
  }
  static update(req, res) {
    const checkinData = {
      id: req.params.id,
      note: req.body.note,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      streetaddress: req.body.streetaddress,
      user_id: req.body.user_id,
    };
    CheckinDAO.update(checkinData)
    console.log("CHEDKINDAO checkinDATA ", checkinData)
           .then((data) => {
             console.log("CHEDKINDAO DATA ", data)
             res.status(200).json(data)
           });
  }
  static delete(req, res) {
    onsole.log('req res' , req, res)
    CheckinDAO.delete(req.params.id)
          console.log('req', req.params.id)
           .then(() => res.status(204).send("hello").end());
  }
}

module.exports = CheckinController;
