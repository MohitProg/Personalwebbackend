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
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
      color: #333333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 10px 0;
      background-color: #4a90e2;
      color: #ffffff;
      border-radius: 5px 5px 0 0;
    }
    .content {
      margin-top: 20px;
      text-align: center;
      color:"white"
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 20px;
      background-color: #4a90e2;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      font-size: 12px;
      color: #777777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify Your Account</h1>
    </div>
    <div class="content">
      <p>Hello  ${name}</p>
      <p>${otp}</p>
    </div>
    <div class="footer">
      <p>If you have any questions, feel free to reach out to us at <a href="mailto:support@webtechblog.com">support@webtechblog.com</a>.</p>
      <p>WebTechBlog © 2024. All rights reserved.</p>
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
export const SendAddBlogNotification = async (email, title) => {
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
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">

  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #090D1F; color: #ffffff; text-align: center; padding: 20px;">
      <h1 style="margin: 0; font-size: 24px;">New Blog Post Alert 🚀</h1>
    </div>

    <!-- Body Content -->
    <div style="padding: 20px;">
      <p style="font-size: 16px; color: #333333; line-height: 1.5;">
        Hello, 
      </p>
      <p style="font-size: 16px; color: #333333; line-height: 1.5;">
        We are excited to share a brand new blog post on <b>WebTech Blogs</b>! This article dives deep into the latest trends, insights, and tips you won't want to miss.
      </p>
      <p style="font-size: 16px; color: #333333; line-height: 1.5;">
        Check out our latest blog post: <b>"${title}"</b> and explore valuable insights crafted just for you.
      </p>
      <p style="font-size: 16px; color: #333333; line-height: 1.5;">
        <a href="[Your Blog URL]" target="_blank" style="color: #ffffff; background-color: #007BFF; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; font-size: 16px; margin-top: 10px;">Read the Blog</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f4f4f4; text-align: center; padding: 10px;">
      <p style="font-size: 12px; color: #666666; margin: 0;">
        You're receiving this email because you're subscribed to WebTech Blogs. 
        <br>Want to unsubscribe? <a href="[Unsubscribe URL]" style="color: #007BFF; text-decoration: none;">Click here</a>.
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
