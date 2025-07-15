const express = require('express');
const router = express.Router();
const controller = require('../controllers/patientDoctorController');

router.get('/', controller.getAll);
router.get('/:patientId/:doctorId', controller.getById);
router.post('/', controller.create);
router.delete('/:patientId/:doctorId', controller.remove);

module.exports = router;
