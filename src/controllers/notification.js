const notificationService = require('../services/notification');

// Gửi email thông báo
const sendEmail = async (req, res) => {
  const email = await notificationService.sendEmail(req.body);
  return res.send({ status: 1, result: email });
};

// Tạo mới email template
const createTemplate = async (req, res) => {
  const files = [];
  if (req.files !== undefined) {
    req.files.forEach((elem) => {
      const path = `${elem.destination}/${elem.filename}`;
      files.push(path);
    });
  }
  const template = await notificationService.createTemplate(req.body, files);
  return res.send(template);
};

module.exports = { sendEmail, createTemplate };
