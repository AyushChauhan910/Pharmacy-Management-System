const express = require('express');
const router = express.Router();
const controller = require('../controllers/prescriptionController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', controller.getAll);
router.get('/by-patient', controller.getByPatientAndDateRange); // ?patientId=...&startDate=...&endDate=...
router.get('/:doctorId/:patientId/:prescDate', controller.getById);
router.post('/', controller.create);
router.put('/:doctorId/:patientId', isAdmin, controller.update);
router.delete('/:doctorId/:patientId/:prescDate', isAdmin, controller.remove);

module.exports = router;
