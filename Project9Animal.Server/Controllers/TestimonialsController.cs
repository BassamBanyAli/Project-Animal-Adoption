using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project9Animal.Server.DTOs;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestimonialsController : ControllerBase
    {
        private readonly MyDbContext _db;
        public TestimonialsController(MyDbContext db)
        {
            _db = db;
        }

        //[HttpPost]
        //public IActionResult postTestimonial([FromForm] TestimonialDTO testimonialDto)
        //{

        //    var testimonial = new Testimonial
        //    {
        //        UserId = testimonialDto.UserId,  
        //        TestimonialMessege = testimonialDto.TestimonialMessege,  
        //        IsAccept = false  
        //    };


        //    _db.Testimonials.Add(testimonial);
        //    _db.SaveChanges();

        //    // Return the testimonial as a response
        //    return Ok(testimonial);
        //}

        [HttpPost]
        public IActionResult postTestimonial([FromForm] TestimonialDTO testimonialDto)
        {
            // Check if UserId and Content are being correctly passed
            if ( testimonialDto.UserId == null || string.IsNullOrEmpty(testimonialDto.TestimonialMessege))
            {
                return BadRequest("Invalid input data");
            }

            // Create the new Testimonial object
            var testimonial = new Testimonial
            {
                UserId = testimonialDto.UserId,
                TestimonialMessege = testimonialDto.TestimonialMessege,
                IsAccept = false // Default to pending (false)
            };

            // Save to database
            _db.Testimonials.Add(testimonial);
            _db.SaveChanges();

            return Ok(testimonial);
        }


    }
}
