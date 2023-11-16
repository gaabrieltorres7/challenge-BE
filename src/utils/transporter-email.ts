import nodemailer from 'nodemailer'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })
  }

  sendConfirmationEmail(userEmail: string, token: string) {
    const mailOptions = {
      from: process.env.EMAIL ?? '',
      to: userEmail,
      subject: 'Confirmação de Login',
      html: `<p>Clique no link para confirmar o login: <a href="http://localhost:3000/users/confirm?token=${token}">Confirmar</a></p>`,
    }

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error)
        } else {
          resolve(info)
        }
      })
    })
  }
}

export default EmailService
