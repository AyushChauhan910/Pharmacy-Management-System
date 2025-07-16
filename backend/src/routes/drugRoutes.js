const express = require('express');
const router = express.Router();
const controller = require('../controllers/drugController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', controller.getAll);
router.get('/:tradeName/:companyName', controller.getById);
router.post('/', controller.create);
router.put('/:tradeName/:companyName', isAdmin, controller.update);
router.delete('/:tradeName/:companyName', isAdmin, controller.remove);

module.exports = router;
