const EmailTemplate = require('../models/emailtemplate');

const getEmail = async (type) => {
  const email = await EmailTemplate.findOne({ type });
  return email;
};

const createTemplate = async (data, files) => {
  const { type, subject, requiredFields, optionFields } = data;

  const template = await EmailTemplate.create({
    type,
    subject,
    content: files[0],
    'fields.requiredFields': requiredFields ? JSON.parse(requiredFields) : [],
    'fields.optionFields': optionFields ? JSON.parse(optionFields) : null,
  });

  return template;
};

module.exports = { getEmail, createTemplate };
