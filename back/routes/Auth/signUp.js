import express from 'express';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import connection from '../config';

const router = express.Router();

router.post('/', (req, res) => {
  const user = req.body;
  const data = {
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  };
  connection.query('INSERT INTO users_app SET ?', data, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const output = `
      <h1>Bienvenue ${data.name} chez EASYLUNCH</h1>
      <br />
      <p>Votre inscription a bien été prise en compte, <br /> Vous trouverez toute nos informations utiles sur notre site.</p>
    `;

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SENDER_MAIL,
          pass: process.env.PASSWORD_MAIL,
        },
      });
      const mailOptions = {
        from: `EasyLunch Contact ${process.env.SENDER_MAIL}`,
        to: data.mail,
        subject: `Bienvenue ${data.name} chez EASYLUNCH`,
        html: output
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          res.sendStatus(500);
        }
        res.sendStatus(200);
      });
    }
  });
});


export default router;