const express = require('express');
const router = express.Router();
const controller = require('../controllers/sellsController');

router.get('/', controller.getAll);
router.get('/:pharmacyId/:tradeName/:companyName', controller.getById);
router.post('/', controller.create);
router.put('/:pharmacyId/:tradeName/:companyName', controller.update);
router.delete('/:pharmacyId/:tradeName/:companyName', controller.remove);

module.exports = router;
