import { mailOptions, transporter } from "../../src/utils/nodemailer";

const handler = async (req, res) =>{
    if(req.method == "POST"){
        console.log(req)
        console.log(req.body)
        console.log(req.body.city)
        await transporter.sendMail({
            ...mailOptions,
            subject:"QRCode Scanned notification from upscalegarage.com ",
            text:req.body.comments,
            html:`<h1>We have good news!!</h1>
            <h1>The QR code has been scanned, detailed below</h1>
            <p><strong>City:</strong> ${req.body.city}</p>
            <p><strong>Country:</strong> ${req.body.country}</p>
            <p><strong>Region:</strong> ${req.body.region}</p>
            <p><strong>Location:</strong> ${req.body.loc}</p>`
        });
        res.status(200).json({message: 'ok'})
    }

    res.status(400).json({message: 'Bad Request'});

}

export default handler;