const nodemailer = require("nodemailer");
const config = require("config");

let transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  secure: true,
  secureConnection: false,
  tls: {
    ciphers: 'SSLv3'
  },
  requireTLS: true,
  port: 465,
  debug: true,
  auth: {
    user: "no-reply@spykefinance.com",
    pass: "B@cefo0k1",
  }
});

// const transport = {
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_HOST_USER,
//         pass: process.env.EMAIL_HOST_PASSWORD,
//     },
// };
// const transporter = nodemailer.createTransport(transport);

exports.otpEmailVerification = async (email, OTP) => {
  const mailOptions = {
    from: "Spyke Bot<no-reply@spykefinance.com>",
    to: email,
    subject: `OTP`,
    text: `This is a test`,
    html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
  </o:OfficeDocumentSettings>
</xml>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>
    <style type="text/css">
      table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; }
@media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }
  .u-row .u-col-100 {
    width: 600px !important;
  }
}
@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}
table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}
p {
  margin: 0;
}
.ie-container table,
.mso-container table {
  table-layout: fixed;
}
* {
  line-height: inherit;
}
a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}
</style>
</head>
<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
<tbody><tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Cabin',sans-serif;" align="left">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tbody><tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      <a href="http://localhost:4000" target="_blank">
      <img align="center" border="0" src="https://media.discordapp.net/attachments/854748335872016446/898946016533966868/Logo-White-Rect-removebg-preview_1sd.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 37%;max-width: 222px;" width="222">
      </a></td></tr></tbody></table></td></tr></tbody></table></div></div></div></div></div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px; font-family: Montserrat, sans-serif;"><strong><span style="line-height: 39.2px; font-size: 28px;">Verify Your E-mail Address</span></strong></span></p>
  </div></td></tr></tbody></table></div></div></div></div></div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Cabin',sans-serif;" align="left">
  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px; font-family: Montserrat, sans-serif;">Hi Trader, </span></p>
<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px; font-family: Montserrat, sans-serif;">You're almost ready to get started. Please enter the OTP below to verify your email address and enjoy exclusive services with us!</span></p>
  </div></td></tr></tbody></table>
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 34px; line-height: 54.4px;"><strong><span style="line-height: 54.4px; font-family: Montserrat, sans-serif; font-size: 34px;">${OTP}</span></strong></span></p>
  </div></td></tr></tbody></table></div></div></div></div></div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e5eaf5;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:18px 55px;font-family:'Cabin',sans-serif;" align="left">
  <div style="color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px; font-family: Montserrat, sans-serif;"><strong>Get in touch</strong></span></p>
<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000; font-family: Montserrat, sans-serif;">+91 9320326095</span></p>
<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000; font-family: Cabin, sans-serif;"><span style="font-family: Montserrat, sans-serif; font-size: 16px; line-height: 25.6px;">support@spykefinance.com</span></p></div></td></tr></tbody></table>
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr>
<td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left"><div align="center">
  <div style="display: table; max-width:195px;">
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://facebook.com/" title="Facebook" target="_blank">
          <img src="https://bn1304files.storage.live.com/y4mi4mo3i1wImZTUHprpscTvvnFAmcFLOYlzRi7jmHf9GnwVQkacnKjGuhNeAooI6VUiQiqVgVGOZnlrQgk0dZotLaMfaQ6G1FOIeMpcjt0oUxn9ZrlYZbJGiYu-KJ_mpkX6wDRaLz7irv4MvUQceul_NoNX97bHWdlDfr4_8CixTk5Y4a0Ew0dSQLnDEaGzU3S?width=144&height=144&cropmode=none" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a></td></tr></tbody></table>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://linkedin.com/" title="LinkedIn" target="_blank">
          <img src="https://bn1304files.storage.live.com/y4msr0dmbKC-ib_G_-ta71ZlVcERISbNTcLAOiaQH_OWo_ne6A7v_3DqlxZvhbzmVKIdSbnQKprCqfC8VfZFnxOjl13qi5gUPjsr9bRuavBKLN_0Leih-lirDKInzBj0sJ-O6kzKv-WMc5tQ0C53LHBuAog2b2nq5nxXPyb0HXQ2_yI-EwaBldrX4YlfM8Zwkss?width=144&height=144&cropmode=none" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a></td></tr></tbody></table>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://instagram.com/" title="Instagram" target="_blank">
          <img src="https://bn1304files.storage.live.com/y4mSefykPxugcwUdewFP77YUFxDpapivIPJNpkXlzTIGA94rTSUPGdJNhwxbJMZgVJ0231-dp4aP2KYf4CWfWGMy2wKZpkk2oMl4q91tqGUspjQqBf7UH1dx5PnkGSTZWpj-ZkFAsp37-bnvlJzBbp3JoPfFSCLjVDY4cxA5uD2kRTHJfbyJmduCOSxgjZE1SiO?width=144&height=144&cropmode=none" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a></td></tr></tbody></table>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://youtube.com/" title="YouTube" target="_blank">
          <img src="https://bn1304files.storage.live.com/y4m4KfRWm8EGMY0jn9Ok3cMtytjXdqWzF3qe4IrxFcmLde2n19ezDV2Adg1zRlXsvL88uEGqEkdMcqBu4zJ9ZS5PsY000v1ZXFhciwGFzjjxr-jZiv25zAcjnazx82-F7a4_8JIymJvcgpD0XaCQcGOJ5zjl_6yChj-k0eqK-s_kx10VHHp0CjRVxWE4Hn-5F2a?width=144&height=144&cropmode=none" alt="YouTube" title="YouTube" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a></td></tr></tbody></table></div></div></td></tr></tbody></table></div></div></div></div></div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  <div style="color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights © Spyke All Rights Reserved</span></p>
  </div></td></tr></tbody></table></div></div></div></div></div></td></tr></tbody></table></body></html>`
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info.response);
    return info;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.forgotPassword = async (email) => {
  const mailOptions = {
    from: "Spyke Bot<no-reply@spykefinance.com>",
    to: email,
    subject: `Request: Password reset`,
    text: `This is a test`,
    html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
  </o:OfficeDocumentSettings>
</xml>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>
    <style type="text/css">
      table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; }
@media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }
  .u-row .u-col-100 {
    width: 600px !important;
  }
}
@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}
table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}
p {
  margin: 0;
}
.ie-container table,
.mso-container table {
  table-layout: fixed;
}
* {
  line-height: inherit;
}
a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}
</style>
</head>
<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
<tbody><tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Cabin',sans-serif;" align="left">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tbody><tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      <a href="http://localhost:4000" target="_blank">
      <img align="center" border="0" src="https://media.discordapp.net/attachments/854748335872016446/898946016533966868/Logo-White-Rect-removebg-preview_1sd.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 37%;max-width: 222px;" width="222">
      </a></td></tr></tbody></table></td></tr></tbody></table></div></div></div></div></div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px; font-family: Montserrat, sans-serif;"><strong><span style="line-height: 39.2px; font-size: 28px;">Forgot Password?</span></strong></span></p>
  </div></td></tr></tbody></table></div></div></div></div></div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Cabin',sans-serif;" align="left">
  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px; font-family: Montserrat, sans-serif;">Hi Trader, </span></p>
<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px; font-family: Montserrat, sans-serif;">We have received a request to reset your password associated with this account. Please use the OTP below to reset your password</span></p>
  </div></td></tr></tbody></table>
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 34px; line-height: 54.4px;"><strong><span style="line-height: 54.4px; font-family: Montserrat, sans-serif; font-size: 34px;">${OTP}</span></strong></span></p>
  </div></td></tr></tbody></table></div></div></div></div></div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e5eaf5;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:18px 55px;font-family:'Cabin',sans-serif;" align="left">
  <div style="color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px; font-family: Montserrat, sans-serif;"><strong>Get in touch</strong></span></p>
<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000; font-family: Montserrat, sans-serif;">+91 9320326095</span></p>
<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000; font-family: Cabin, sans-serif;"><span style="font-family: Montserrat, sans-serif; font-size: 16px; line-height: 25.6px;">support@spykefinance.com</span></p>
  </div></td></tr></tbody></table>
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
<div align="center">
  <div style="display: table; max-width:195px;">
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://facebook.com/" title="Facebook" target="_blank">
          <img src="https://bn1304files.storage.live.com/y4mi4mo3i1wImZTUHprpscTvvnFAmcFLOYlzRi7jmHf9GnwVQkacnKjGuhNeAooI6VUiQiqVgVGOZnlrQgk0dZotLaMfaQ6G1FOIeMpcjt0oUxn9ZrlYZbJGiYu-KJ_mpkX6wDRaLz7irv4MvUQceul_NoNX97bHWdlDfr4_8CixTk5Y4a0Ew0dSQLnDEaGzU3S?width=144&height=144&cropmode=none" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a></td></tr></tbody></table>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://linkedin.com/" title="LinkedIn" target="_blank">
          <img src="https://bn1304files.storage.live.com/y4msr0dmbKC-ib_G_-ta71ZlVcERISbNTcLAOiaQH_OWo_ne6A7v_3DqlxZvhbzmVKIdSbnQKprCqfC8VfZFnxOjl13qi5gUPjsr9bRuavBKLN_0Leih-lirDKInzBj0sJ-O6kzKv-WMc5tQ0C53LHBuAog2b2nq5nxXPyb0HXQ2_yI-EwaBldrX4YlfM8Zwkss?width=144&height=144&cropmode=none" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a></td></tr></tbody></table>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://instagram.com/" title="Instagram" target="_blank">
          <img src="https://bn1304files.storage.live.com/y4mSefykPxugcwUdewFP77YUFxDpapivIPJNpkXlzTIGA94rTSUPGdJNhwxbJMZgVJ0231-dp4aP2KYf4CWfWGMy2wKZpkk2oMl4q91tqGUspjQqBf7UH1dx5PnkGSTZWpj-ZkFAsp37-bnvlJzBbp3JoPfFSCLjVDY4cxA5uD2kRTHJfbyJmduCOSxgjZE1SiO?width=144&height=144&cropmode=none" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a></td></tr></tbody></table>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://youtube.com/" title="YouTube" target="_blank">
          <img src="https://bn1304files.storage.live.com/y4m4KfRWm8EGMY0jn9Ok3cMtytjXdqWzF3qe4IrxFcmLde2n19ezDV2Adg1zRlXsvL88uEGqEkdMcqBu4zJ9ZS5PsY000v1ZXFhciwGFzjjxr-jZiv25zAcjnazx82-F7a4_8JIymJvcgpD0XaCQcGOJ5zjl_6yChj-k0eqK-s_kx10VHHp0CjRVxWE4Hn-5F2a?width=144&height=144&cropmode=none" alt="YouTube" title="YouTube" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a></td></tr></tbody></table></div></div></td></tr></tbody></table></div></div></div></div></div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
<table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  <div style="color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights © Spyke All Rights Reserved</span></p>
  </div></td></tr></tbody></table></div></div></div></div></div></td></tr></tbody></table></body></html>`
  }
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info.response)
  } catch (error) {
    console.log(error)
    return error
  }
}