const multer = require('multer');
const CryptoJS = require('crypto-js');

const uploadFile = (arrayFile, type) => {
  const staticPath = ['/template'];

  const getFile = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        if (type === 'single' || type === 'array') {
          if (staticPath.includes(arrayFile[0].path)) {
            cb(null, `src/upload${arrayFile[0].path}`);
          }
        } else if (type === 'field') {
          for (const i in arrayFile) {
            if (staticPath.indexOf(arrayFile[i].path) !== -1) {
              cb(null, `src/upload${arrayFile[i].path}`);
            }
          }
        }
      },
      filename: (req, file, cb) => {
        // console.log("file", file);
        const extend = file.originalname.split('.');
        let oldNameFile = extend.splice(0, extend.length - 1);
        oldNameFile = oldNameFile.join('.');
        const hash = `${Date.now()}_${CryptoJS.MD5(oldNameFile).toString()}`;
        cb(null, `${hash}.${extend[extend.length - 1]}`);
      },
    }),
  });

  switch (type) {
    case 'single':
      return getFile.single(arrayFile[0].name);
    case 'array':
      return getFile.array(arrayFile[0].name, 20);

    default:
      break;
  }

  return null;
};

module.exports = {
  uploadFile,
};
