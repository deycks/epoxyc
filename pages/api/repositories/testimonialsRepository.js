import Testimonial from "../models/entities/testimonial";


const TestimonialRepository = {
    createTestimonial: async (testimonialData) => {
        const testimonial = new Testimonial(testimonialData);
        return await testimonial.save();
      },

      updateTestimonial: async (testimonialId, testimonialData) => {
        return await Testimonial.findByIdAndUpdate(testimonialId, testimonialData, {
          new: true,
        });
      },

      getAllActiveTestimonials: async () => {
        return await Testimonial.find({ active: true});
      },
      
      getAllTestimonialsPagination : async ( skip, limit ) => {
        return await Testimonial.find({ active: true}).skip(skip).limit(limit);
    }
      
}

export default TestimonialRepository