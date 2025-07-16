const express = require('express');
const router = express.Router();
const controller = require('../controllers/sellsController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', controller.getAll);
router.get('/:pharmacyId/:tradeName/:companyName', controller.getById);
router.post('/', controller.create);
router.put('/:pharmacyId/:tradeName/:companyName', isAdmin, controller.update);
router.delete('/:pharmacyId/:tradeName/:companyName', isAdmin, controller.remove);

module.exports = router;
