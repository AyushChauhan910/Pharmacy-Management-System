const express = require('express');
const router = express.Router();
const controller = require('../controllers/contractController');

router.get('/', controller.getAll);
router.get('/:pharmacyId/:companyName/:startDate', controller.getById);
router.post('/', controller.create);
router.put('/:pharmacyId/:companyName/:startDate', controller.update);
router.delete('/:pharmacyId/:companyName/:startDate', controller.remove);

module.exports = router;
