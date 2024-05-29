import { mailOptions, transporter } from "../../src/utils/nodemailer";

const handler = async (req, res) =>{
    console.log(req.body);
    if(req.method == "POST"){
        try {
            await transporter.sendMail({
                ...mailOptions,
                subject:"Contact Form data from upscalegarage.com ",
                text:req.body.comments,
                html:`<h1>YuuHuu!!</h1>
                <h1>We have a client interested in epoxic flooring </h1>
                <p><strong>Name:</strong> ${req.body.firstName} ${req.body.lastName} </p>
                <p><strong>Email / Phone Number:</strong> ${req.body.email}</p>
                <p><strong>Comments:</strong> ${req.body.comments}</p>`
            });
            res.status(200).json({message: 'ok'})
    
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'error'})
        }
    }
    res.status(400).json({message: 'Bad Request'});
    
}

export default handler;