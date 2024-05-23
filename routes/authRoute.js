const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { validator } = require('../validations/validator');
const validate = require('../validations/authValidation');
const { authentication } = require('../middleware/authentication');
const controller = require('../controller/authController');
const { errorHandler } = require('../helper/error');
router.post(
  '/registration',
  upload.single('image'),
  validator.body(validate.register),
  errorHandler(controller.registration),
);

router.post(
  '/login',
  validator.body(validate.login),
  errorHandler(controller.login),
);
router.get('/viewProfile', authentication,  errorHandler(controller.viewProfile));
router.put(
  '/resetPassword',
  validator.body(validate.resetpassword),
  authentication,
  errorHandler(controller.resetPassword),
);
router.put(
  '/updateProfile',
  upload.single('image'),
  validator.body(validate.update),
  authentication,
  errorHandler(controller.updateProfile),
);

module.exports = router;
