const nodemailer = require("nodemailer");

async function SendMail(link, email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.email}`,
            pass: `${process.env.password}`,
        },
        from: `${process.env.email}`
    });

    await transporter.sendMail({
        from: 'Insta-clone',
        to: [`${email}`],
        subject: "Reset Password Link",
        text: "",
        html: `<div style="width:'100%';"><img style="margin-left:-105px;padding-top:18px;width:150px" src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Flogo.6dfd3123605cfbfdf81d.png?alt=media&token=20ccb482-730c-41c1-b472-d8bc5509a058" alt="logo" /><p style="margin-left:25px;">Hi ,</p><p style="margin-left:25px;"> Reset your password of <span style="font-weight:bold">Instagram-clone</span> using this link<a href=${link} style="margin-left:4.5px;">Click here.</a><br/>Link only valid for 24 hours</p></div>`
    });
}
module.exports = { SendMail }