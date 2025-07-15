const express = require('express');
const router = express.Router();
const controller = require('../controllers/prescriptionController');

router.get('/', controller.getAll);
router.get('/by-patient', controller.getByPatientAndDateRange); // ?patientId=...&startDate=...&endDate=...
router.get('/:doctorId/:patientId/:prescDate', controller.getById);
router.post('/', controller.create);
router.put('/:doctorId/:patientId', controller.update);
router.delete('/:doctorId/:patientId/:prescDate', controller.remove);

module.exports = router;
