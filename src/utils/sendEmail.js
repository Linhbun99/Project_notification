const fs = require('fs');
const ejs = require('ejs');
const util = require('util');

const send = async (transporter, template, receiver, single) => {
  // const readFile = util.promisify(fs.readFile);
  // const getContent = () => {
  //   return readFile(template.content, 'utf8');
  // };

  // getContent().then((content) => {
  //   if (single) {
  //     sendEmailSingle(transporter, template, receiver, content);
  //   }
  //   if (!single) {
  //     receiver.forEach((rec) => {
  //       rec.forEach((info) => {
  //         sendEmailSingle(transporter, template, info, content);
  //       });
  //     });
  //   }
  // });

  fs.readFile(template.content, 'utf8', (_err, content) => {
    if (single) {
      sendEmailSingle(transporter, template, receiver, content);
    } else {
      receiver.forEach((rec) => {
        rec.forEach((info) => {
          sendEmailSingle(transporter, template, info, content);
        });
      });
    }
  });
};

const sendEmailSingle = async (
  transporter,
  template,
  singleReceiver,
  content,
) => {
  const { requiredFields } = template.fields;

  requiredFields.forEach((field, error) => {
    if (!singleReceiver[field]) {
      throw error;
    }
  });

  const mainOptions = {
    from: 'Admin',
    to: singleReceiver.email,
    subject: singleReceiver.subject ? singleReceiver.subject : template.subject,
    text: '',
    html: ejs.render(content, singleReceiver),
  };

  await transporter.sendMail(mainOptions, (error) => {
    if (error) throw error;
  });
};
module.exports = { send };

// const fs = require('fs');
// const ejs = require('ejs');

// const send = (transporter, template, batching) => {
//   fs.readFile(template.content, { encoding: 'utf-8' }, (err, html) => {
//     if (err) {
//       throw err;
//     } else {
//       batching.forEach((bat) => {
//         bat.forEach((elem) => {
//           const { requiredFields } = template.fields;
//           if (requiredFields.length) {
//             for (const i in requiredFields) {
//               if (!elem[requiredFields[i]]) return false;
//             }
//           }
//           const mainOptions = {
//             from: 'Admin',
//             to: elem.email,
//             subject: elem.subject ? elem.subject : template.subject,
//             text: '',
//             html: ejs.render(html, { ...elem, sender: 'Admin' }),
//           };

//           transporter.sendMail(mainOptions, (error) => {
//             if (error) {
//               throw error;
//             }
//           });
//           return null;
//         });
//         return null;
//       });
//     }
//   });
// };

// module.exports = { send };
