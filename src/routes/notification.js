const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { uploadFile } = require('../middlewares/upload');
const notificationController = require('../controllers/notification');

router.post('/notification', asyncMiddleware(notificationController.sendEmail));
router.post(
  '/notification/create',
  uploadFile([{ name: 'template', path: '/template' }], 'array'),
  notificationController.createTemplate,
);

module.exports = router;
