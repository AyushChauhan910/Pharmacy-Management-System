const express = require('express');
const router = express.Router();
const controller = require('../controllers/patientController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', isAdmin, controller.update);
router.delete('/:id', isAdmin, controller.remove);

module.exports = router;
