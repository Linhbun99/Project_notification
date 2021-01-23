const nodemailer = require('nodemailer');
const notificationDao = require('../daos/notification');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { batch } = require('../utils/batch');
const { send } = require('../utils/sendEmail');
const { EMAIL_SERVER, EMAIL_PASS_SERVER, BATCH_SIZE } = require('../configs');

const sendEmail = async (data) => {
  const { type, receiver, sender } = data;
  const single = !(receiver.length > 1);
  const template = await notificationDao.getEmail(type);
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: sender ? sender.email : EMAIL_SERVER,
      pass: sender ? sender.password : EMAIL_PASS_SERVER,
    },
  });
  const batchReceiver = batch(receiver, BATCH_SIZE);
  const email = await send(transporter, template, batchReceiver, single);

  return email;
};

const createTemplate = async (data, files) => {
  const template = await notificationDao.createTemplate(data, files);
  if (!template) throw new CustomError(errorCodes.TEMPLATE_NOT_CREATED);
  return template;
};

module.exports = { sendEmail, createTemplate };
