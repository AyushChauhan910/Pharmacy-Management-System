const express = require('express');
const router = express.Router();
const controller = require('../controllers/companyController');

router.get('/', controller.getAll);
router.get('/:name', controller.getById);
router.post('/', controller.create);
router.put('/:name', controller.update);
router.delete('/:name', controller.remove);

module.exports = router;
