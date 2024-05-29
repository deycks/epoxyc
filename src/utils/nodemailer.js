import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: "contact@upscalegarage.com",
        pass: "Contacto.123",
    }
});

export const mailOptions={
    from:"contact@upscalegarage.com",
    to:"ed.adrianmm@gmail.com"
}

//process.env.EMAIL_USER