const express = require('express');
const CheckinController = require('../controllers/CheckinController');

const router = express.Router();

router.get('/', CheckinController.getAll);
router.post('/', CheckinController.create);
router.patch('/:id', CheckinController.update);
router.delete('/:id', CheckinController.delete);

module.exports = router;
