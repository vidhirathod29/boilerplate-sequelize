const db = require('../models/db');
const addressBook = db.addressBookModel;
const { GeneralError } = require('../utils/error');
const StatusCodes = require('../utils/Http-Status');
const { RESPONSE_STATUS } = require('../utils/enum');
const { Messages } = require('../utils/messages');

const addAddress = async (req, res, next) => {
  const data = req.body;
  const newData = await addressBook.bulkCreate(data);
  if (newData) {
    next(
      new GeneralError(
        Messages.ADD_SUCCESS,
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
};

const viewAddress = async (req, res, next) => {
  const address = await addressBook.findAll();
  if (address) {
    next(
      new GeneralError(
        Messages.GET_SUCCESS,
        StatusCodes.OK,
        address,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  } else {
    next(
      new GeneralError(
        Messages.NOT_FOUND,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const updateAddress = async (req, res, next) => {
  const addressId = req.params.id;
  const addressBookId = await addressBook.findOne({ where: { id: addressId } });

  if (addressBookId) {
    const address = {
      title: req.body.title,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      pin_code: req.body.pin_code,
    };

    const [updatedAddress] = await addressBook.update(address, {
      where: { id: addressId },
    });

    if (updatedAddress === 1) {
      next(
        new GeneralError(
          Messages.UPDATED_SUCCESS,
          StatusCodes.ACCEPTED,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    } else {
      next(
        new GeneralError(
          Messages.FAILED_TO_UPDATE,
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } else {
    next(
      new GeneralError(
        Messages.ID_NOT_FOUND,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const deleteAddress = async (req, res, next) => {
  const id = req.params.id;
  const address = await addressBook.findOne({ where: { id: id } });
  if (address) {
    const deleteAddress = await addressBook.destroy({ where: { id: id } });
    if (deleteAddress) {
      next(
        new GeneralError(
          Messages.DELETE_SUCCESS,
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
        Messages.ID_NOT_FOUND,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

module.exports = {
  addAddress,
  viewAddress,
  updateAddress,
  deleteAddress,
};
