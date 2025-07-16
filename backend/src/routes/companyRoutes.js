const express = require('express');
const router = express.Router();
const controller = require('../controllers/companyController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', controller.getAll);
router.get('/:name', controller.getById);
router.post('/', controller.create);
router.put('/:name', isAdmin, controller.update);
router.delete('/:name', isAdmin, controller.remove);

module.exports = router;
