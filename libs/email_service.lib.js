const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
const { MAIL_USERNAME, MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  requireTLS: true,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

exports.sendEmail = async (user) => {
  const filePath = path.join(__dirname, "../public/templates/email.handlebars");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const msg = {
    from: MAIL_USERNAME,
    to: user?.email,
    subject: "User Registration: " + user.name,
    html: template({ name: user?.name, email: user?.email }),
    attachments: [
      {
        filename: "bank.pdf",
        path: path.join("bank.pdf"),
      },
    ],
  };
  await transporter.sendMail(msg);
};
