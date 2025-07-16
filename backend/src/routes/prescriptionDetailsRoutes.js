const express = require('express');
const router = express.Router();
const controller = require('../controllers/prescriptionDetailsController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', controller.getAll);
router.get('/by-patient', controller.getByPatientAndDate); // ?patientId=...&prescDate=...
router.get('/:doctorId/:patientId/:prescDate/:tradeName/:companyName', controller.getById);
router.post('/', controller.create);
router.put('/:doctorId/:patientId/:prescDate/:tradeName/:companyName', isAdmin, controller.update);
router.delete('/:doctorId/:patientId/:prescDate/:tradeName/:companyName', isAdmin, controller.remove);

module.exports = router;
