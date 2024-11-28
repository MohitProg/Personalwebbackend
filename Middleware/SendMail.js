import nodemailer from "nodemailer";

// create a  transporter to send welcome email;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "mohit.sharma327043@gmail.com",
    pass: "begiwskrdruoawck",
  },
});

//  create a sendmail function to send welcome mail to register user

export const SendWelcomeMail = async (email, otp, name) => {
  try {
    await transporter.sendMail({
      from: "mohit.sharma327043@gmail.com",
      to: email,
      subject: "Welcome to WebTech Blogs  ",
      text: "",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
</head>
<body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f7f9fc; color: #333;">

  <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); overflow: hidden;">

    <!-- Header -->
    <div style="background: linear-gradient(90deg, #4A90E2, #004C97); color: #ffffff; text-align: center; padding: 30px;">
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🔒 Your OTP Code</h1>
      <p style="margin: 10px 0 0; font-size: 16px;">Secure your account with the code below</p>
    </div>

    <!-- Body Content -->
    <div style="padding: 25px; text-align: center;">
      <p style="font-size: 16px; line-height: 1.8; margin: 0;">
        Hello, ${name}
      </p>
      <p style="font-size: 16px; line-height: 1.8; margin: 15px 0;">
        To complete your action, please use the following One-Time Password (OTP). This code is valid for <b>10 minutes</b>.
      </p>
      <div style="margin: 30px 0;">
        <p style="font-size: 32px; font-weight: bold; color: #4A90E2; letter-spacing: 2px; margin: 0;">
          ${otp}
        </p>
      </div>
      <p style="font-size: 14px; color: #666; margin: 15px 0;">
        If you didn’t request this, please ignore this email or contact our support team.
      </p>
    </div>

    <!-- Divider -->
    <hr style="border: 0; border-top: 1px solid #e6e6e6; margin: 30px 0;">

    <!-- Footer -->
    <div style="background-color: #f7f9fc; text-align: center; padding: 15px;">
      <p style="font-size: 14px; color: #666; margin: 0;">
        Need help? Contact us at <a href="mailto:support@yourdomain.com" style="color: #4A90E2; text-decoration: none;">support@yourdomain.com</a>.
      </p>
      <p style="font-size: 14px; color: #666; margin: 10px 0 0;">
        &copy; 2024 Your Company | All Rights Reserved
      </p>
    </div>

  </div>

</body>
</html>

`,
    });
  } catch (error) {
    console.log(error);
  }
};

// send add blog mail
export const SendAddBlogNotification = async (email, title,id) => {
  try {
    const recipients = Array.isArray(email) ? email.join(",") : email;

    await transporter.sendMail({
      from: "mohit.sharma327043@gmail.com",
      to: recipients,
      subject: "Welcome to WebTech Blogs  ",
      text: "",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Blog Announcement</title>
</head>
<body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f7f9fc; color: #333;">

  <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); overflow: hidden;">

    <!-- Header -->
    <div style="background: linear-gradient(90deg, #4A90E2, #004C97); color: #ffffff; text-align: center; padding: 30px;">
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🚀 New Blog Post Alert</h1>
      <p style="margin: 10px 0 0; font-size: 16px;">Stay ahead with the latest insights from WebTech Blogs</p>
    </div>

    <!-- Body Content -->
    <div style="padding: 25px;">
      <p style="font-size: 16px; line-height: 1.8; margin: 0;">
        Hi there,
      </p>
      <p style="font-size: 16px; line-height: 1.8; margin: 15px 0;">
        We’re thrilled to announce the release of our latest blog post on <b>WebTech Blogs</b>! This article uncovers the secrets to mastering the newest trends, offering actionable tips just for you.
      </p>
      <p style="font-size: 16px; line-height: 1.8; margin: 15px 0;">
        Dive into our latest blog post: <b>"${title}"</b>. It’s packed with knowledge you won't want to miss.
      </p>
      <div style="text-align: center; margin-top: 30px;">
        <a href=${`https://webtechversion2.web.app/blog/${id}`} target="_blank" 
           style="display: inline-block; background-color: #4A90E2; color: #ffffff; text-decoration: none; padding: 12px 30px; font-size: 16px; border-radius: 8px; font-weight: bold; transition: background-color 0.3s ease;">
          Read the Blog
        </a>
      </div>
    </div>

    <!-- Divider -->
    <hr style="border: 0; border-top: 1px solid #e6e6e6; margin: 30px 0;">

    <!-- Footer -->
    <div style="background-color: #f7f9fc; text-align: center; padding: 15px;">
      <p style="font-size: 14px; color: #666; margin: 0;">
        You’re receiving this email because you subscribed to WebTech Blogs. If you wish to unsubscribe, <a href="[Unsubscribe URL]" style="color: #4A90E2; text-decoration: none;">click here</a>.
      </p>
      <p style="font-size: 14px; color: #666; margin: 10px 0 0;">
        &copy; 2024 WebTech Blogs | All Rights Reserved
      </p>
    </div>

  </div>

</body>
</html>

`,
    });
  } catch (error) {
    console.log(error);
  }
};
