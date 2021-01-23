const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema(
  {
    // Loại email : mật khẩu mới, đổi mật khẩu, tham gia challenge,...
    type: {
      type: String,
      require: true,
    },

    // chủ đề
    subject: {
      type: String,
      required: true,
    },

    // đường dẫn đến file nội dung
    content: {
      type: String,
      require: true,
    },

    // Các trường trống trong email
    fields: {
      requiredFields: {
        type: [String],
      },
      optionFields: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('emailtemplates', emailTemplateSchema);
