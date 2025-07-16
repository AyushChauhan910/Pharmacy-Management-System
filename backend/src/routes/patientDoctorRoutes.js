const express = require('express');
const router = express.Router();
const controller = require('../controllers/patientDoctorController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', controller.getAll);
router.get('/:patientId/:doctorId', controller.getById);
router.post('/', controller.create);
router.delete('/:patientId/:doctorId', isAdmin, controller.remove);

module.exports = router;
