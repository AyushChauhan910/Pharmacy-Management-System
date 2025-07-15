const express = require('express');
const router = express.Router();
const controller = require('../controllers/drugController');

router.get('/', controller.getAll);
router.get('/:tradeName/:companyName', controller.getById);
router.post('/', controller.create);
router.put('/:tradeName/:companyName', controller.update);
router.delete('/:tradeName/:companyName', controller.remove);

module.exports = router;
