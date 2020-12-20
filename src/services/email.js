const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  constructor() {
    this.sender = sgMail;
    this.GenerateTemplate = Mailgen;
  }

  createTemplate(verifyToken) {
    const mailGenerator = new this.GenerateTemplate({
      theme: "default",
      product: {
        name: "System Contacts",
        link: `http://localhost:${process.env.PORT}/`,
      },
    });
    const template = {
      body: {
        intro:
          "Welcome to System Contacts! We're very excited to have you on board.",
        action: {
          instructions:
            "To get started with System Contacts, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `http://localhost:${process.env.PORT}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    const emailBody = mailGenerator.generate(template);
    return emailBody;
  }

  async sendEmail(verifyToken, email) {
    const emailBody = this.createTemplate(verifyToken);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "noreply@system-contacts.com",
      subject: "Sending with SendGrid is Fun",
      html: emailBody,
    };
    await this.sender.send(msg);
  }
}

module.exports = EmailService;
