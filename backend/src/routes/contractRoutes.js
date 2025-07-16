const express = require('express');
const router = express.Router();
const controller = require('../controllers/contractController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', controller.getAll);
router.get('/:pharmacyId/:companyName/:startDate', controller.getById);
router.post('/', controller.create);
router.put('/:pharmacyId/:companyName/:startDate', isAdmin, controller.update);
router.delete('/:pharmacyId/:companyName/:startDate', isAdmin, controller.remove);

module.exports = router;
