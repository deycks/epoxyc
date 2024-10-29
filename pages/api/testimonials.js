import mongoose from "mongoose";
import TestimonialRepository from "./repositories/testimonialsRepository.js";
import { mailOptions, transporter } from "../../src/utils/nodemailer";

mongoose
  .connect(
    "mongodb+srv://solidumAdmin:s0l1dum@solidum.szrzadm.mongodb.net/upscalegarage?retryWrites=true&w=majority",
    {}
  )
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });
export default async function handler(req, res) {
    //console.log(req.body);
  const { method, body, query } = req;

  switch (method) {
    case "POST":
      try {
        const newTestimonialId = await TestimonialRepository.createTestimonial(
          body
        );
        console.log("New testimonial created");
        await transporter.sendMail({
          ...mailOptions,
          subject: "Approve new testimonial from upscalegarage.com ",
          text: "Please review the new testimonial",
          html: `<h1>We have good news!!</h1>
                <h1>We have a new testimony, please check it below:</h1>
                <p><strong>Name:</strong> ${req.body.firstName} ${req.body.lastName}</p>
                <p><strong>Type of service:</strong> ${req.body.coatType}</p>
                <p><strong>Testimony:</strong> ${req.body.testimonial}</p>
                <p><strong>Rating:</strong> ${req.body.rating} / 5</p>
                <p><strong>If you agree with the information, please click on the following link</strong> 
                <br>https://www.upscalegarage.com/api/testimonials?idTestimonial=${newTestimonialId.id}</p>`,
          attachments: [
            {
              filename: "testimonialImage.png",
              path: req.body.imageB64,
            },
          ],
        });
        console.log("email sent");
        res.status(201).json({ id: newTestimonialId });
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
      }
      break;
    case "GET":
      try {
        const { page = 1, limit = 6, idTestimonial} = query;
        const skip = (page - 1) * limit;
        console.log("idTestimonial: "+idTestimonial);
        if(idTestimonial){
            const updatedCount = await TestimonialRepository.updateTestimonial(
                idTestimonial,
              {active: true}
            );
            if (updatedCount === 0) {
              return res.status(404).json({ message: "Testimonial not found" });
            }
            res.json("Testimonial updated, close this tab" );
        } else{
            // Obtener todos los testimonios
            console.log("getting all testimonials");
          const testimonials = await TestimonialRepository.getAllTestimonialsPagination(skip, limit);
          res.json(testimonials);
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}


export const config = {
    api: {
      bodyParser: {
        sizeLimit: '4mb',
      },
    },
  };