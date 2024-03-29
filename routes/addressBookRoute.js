const express = require('express');
const router = express.Router();
const { validator } = require('../validations/validator');
const validate = require('../validations/addressBookValidation');
const { authentication } = require('../middleware/authentication');
const controller = require('../controller/addressBookController');
const { errorHandler } = require('../helper/error');

router.post(
  '/addAddress',
  validator.body(validate.addAddressBook),
  authentication,
  errorHandler(controller.addAddress),
);

router.get(
  '/viewAddress',
  authentication,
  errorHandler(controller.viewAddress),
);
router.put(
  '/updateAddress/:id',
  validator.body(validate.updateAddressBook),
  authentication,
  errorHandler(controller.updateAddress),
);

router.delete(
  '/deleteAddress/:id',
  authentication,
  errorHandler(controller.deleteAddress),
);

module.exports = router;
