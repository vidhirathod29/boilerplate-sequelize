const db = require('../models/db');
const auth = db.authModel;
const bcrypt = require('bcrypt');
const { GeneralError } = require('../utils/error');
const StatusCodes = require('../utils/Http-Status');
const { RESPONSE_STATUS } = require('../utils/enum');
const { Messages } = require('../utils/messages');
const { generateToken } = require('../middleware/authentication');

const registration = async (req, res, next) => {
  if (!req.file) {
    next(
      new GeneralError(
        Messages.IMAGE_NOT_FOUND,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
  const existingUser = await auth.findOne({
    where: { email: req.body.email },
  });
  if (existingUser) {
    next(
      new GeneralError(
        `User ${Messages.ALREADY_EXIST}`,
        StatusCodes.FORBIDDEN,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  } else {
    const encrypt = await bcrypt.hash(req.body.password, 10);
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: encrypt,
      gender: req.body.gender,
      image: req.file.filename,
    };
    const registerUser = await auth.create(data);
    if (registerUser) {
      next(
        new GeneralError(
          Messages.REGISTER_SUCCESS,
          StatusCodes.CREATED,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    } else {
      next(
        new GeneralError(
          Messages.SOMETHING_WENT_WRONG,
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await auth.findOne({ where: { email: email } });
  if (!user) {
    next(
      new GeneralError(
        Messages.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (comparePassword) {
    let token = generateToken({ email, password });
    next(
      new GeneralError(
        Messages.LOGIN_SUCCESS,
        StatusCodes.OK,
        token,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  } else {
    next(
      new GeneralError(
        Messages.INCORRECT_CREDENTIAL,
        StatusCodes.UNAUTHORIZED,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const viewProfile = async (req, res, next) => {
  const email = req.user.email;
  const user = await auth.findOne({ where: { email: email } });
  if (user) {
    next(
      new GeneralError(
        Messages.GET_SUCCESS,
        StatusCodes.OK,
        user,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  } else {
    next(
      new GeneralError(
        Messages.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const resetPassword = async (req, res, next) => {
  const email = req.user.email;
  const { oldPassword, newPassword } = req.body;
  const user = await auth.findOne({ where: { email: email } });
  if (user) {
    const confirmPassword = await bcrypt.compare(oldPassword, user.password);
    if (confirmPassword) {
      const generatedPassword = await bcrypt.hash(newPassword, 10);
      const updateData = await auth.update(
        { password: generatedPassword },
        { where: { email: email } },
      );
      if (updateData) {
        next(
          new GeneralError(
            Messages.UPDATED_SUCCESS,
            StatusCodes.OK,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
      } else {
        next(
          new GeneralError(
            Messages.SOMETHING_WENT_WRONG,
            StatusCodes.BAD_REQUEST,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
    } else {
      next(
        new GeneralError(
          Messages.INVALID_OLD_PASS,
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } else {
    next(
      new GeneralError(
        Messages.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const updateProfile = async (req, res, next) => {
  const userEmail = req.user.email;
  const user = await auth.findOne({ where: { email: userEmail } });
  if (!user) {
    next(
      new GeneralError(
        Messages.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  } else {
    const { name, email, gender } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (gender) updateData.gender = gender;
    if (req.file) {
      const image = req.file.filename;
      if (image) updateData.image = image;
    }

    if (Object.keys(updateData).length === 0) {
      next(
        new GeneralError(
          Messages.NO_VALID_FIELDS,
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
    const updateUser = await auth.update(updateData, {
      where: { email: userEmail },
    });
    if (updateUser) {
      next(
        new GeneralError(
          Messages.UPDATED_SUCCESS,
          StatusCodes.OK,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    } else {
      next(
        new GeneralError(
          Messages.SOMETHING_WENT_WRONG,
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  }
};

module.exports = {
  registration,
  login,
  viewProfile,
  resetPassword,
  updateProfile,
};
