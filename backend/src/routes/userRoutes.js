const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

router.use(authMiddleware, isAdmin);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router; 