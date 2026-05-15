import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.BREVO_USER,    
    pass: process.env.BREVO_SMTP_KEY 
  },
});


export const sendResetEmail = async (email, resetLink) => {
  await transporter.sendMail({
    from: 'resume@svnit.qzz.io',
    to: email,
    subject: 'Reset Your Password - SVNIT Resume Builder',
    html: `
      <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #ddd; border-radius: 10px; padding: 30px; background-color: #f9f9f9;">
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/dnp5e4pcn/image/upload/v1751789092/logo_njgesa.png" alt="SVNIT Resume Builder Logo" style="max-width: 120px; margin-bottom: 20px;" />
          
          <h2 style="color: #003366;">Reset Your Password</h2>
          <p style="font-size: 16px; color: #333;">
            We received a request to reset your password. Click the button below to proceed.
          </p>
          <a href="${resetLink}" style="display: inline-block; margin-top: 20px; background-color: #004d99; color: white; padding: 12px 24px; font-size: 16px; text-decoration: none; border-radius: 6px;">
            Reset Password
          </a>
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            This link is valid for 15 minutes. If you didn’t request a password reset, you can safely ignore this email.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;">
          <p style="font-size: 12px; color: #999;">
            Sent by SVNIT Resume Builder • Surat, India<br>
            For help, contact <a href="mailto:svnit.makeit.ro@gmail.com" style="color: #004d99;">support</a>.
          </p>
        </div>
      </div>
    `,
  });
};

