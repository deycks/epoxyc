import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // use TLS
    requireTLS: true,
    auth: {
        user: "contact@upscalegarage.com",
        pass: "Contacto.123",
    }
});

export const mailOptions={
    from:"contact@upscalegarage.com",
    bcc:"ed.adrianmm@gmail.com",
    to:"ed.adrianmm@gmail.com"
}
// export const mailOptions={
//     from:"contact@upscalegarage.com",
//     bcc:"ed.adrianmm@gmail.com",
//     to:"jrayo19@icloud.com"
// }

//process.env.EMAIL_USER