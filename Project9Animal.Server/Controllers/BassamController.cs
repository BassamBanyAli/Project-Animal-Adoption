using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.DTOs;
using Project9Animal.Server.DTOs.Bassam;
using Project9Animal.Server.Models;
using static System.Net.Mime.MediaTypeNames;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BassamController : ControllerBase
    {
        private readonly MyDbContext _db;
         public BassamController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetBlog()
        {

            var blog = _db.SuccessStories.Where(x=>x.Status== "Published").ToList();
            return Ok(blog);
        }

        [HttpPost("AddImage")]
        public async Task<IActionResult> AddImage(IFormFile image )
        {

            string imagePath = null;

            // Check if the uploaded file is not null
            if (image != null && image.Length > 0)
            {
                // Define the path where you want to save the uploaded image
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/SucessStory");

                var filePath = Path.Combine(uploadsFolder,image.FileName);

                // Create the folder if it doesn't exist
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Save the uploaded file
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                // Set the image path to be saved in the database
                imagePath = filePath; // Save the local file path instead of a URL
            }




            return Ok(imagePath);
        }




        [HttpGet("getImage/{imageName}")]
        public IActionResult getImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/SucessStory", imageName);
            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }
            return NotFound();
        }

    [HttpPost("createPost")]
public async Task<IActionResult> createPost([FromForm] DTOsCreatePost model)
{
            var animalId=_db.Animals.Where(x=>x.Name==model.AnimalName).Select(x=>x.AnimalId).FirstOrDefault();
  

    var successStory = new SuccessStory
    {
        UserId = model.UserId,
        AnimalId = animalId,
        Title = model.Title,
        StoryText = model.StoryText,
        Status = "pending",
        StoryDate = DateTime.Now
    };



    if (model.PhotoUrlOrVideo != null)
    {

                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/SucessStory");
                var filePath = Path.Combine(uploadsFolder, model.PhotoUrlOrVideo.FileName);


                if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }


        var fileName =model.PhotoUrlOrVideo.FileName;


                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await model.PhotoUrlOrVideo.CopyToAsync(fileStream);
                }
                successStory.PhotoUrl1 = fileName;
    }

            _db.SuccessStories.Add(successStory);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Story created successfully!" });
}

        [HttpDelete("deleteStory{storyId}")]
        public IActionResult deleteStory(int storyId)
        {
            var story=_db.SuccessStories.Where(x => x.StoryId == storyId).FirstOrDefault();
            _db.SuccessStories.Remove(story);
            _db.SaveChanges();
            return NotFound(story);
        }


        [HttpGet("getRequestStories")]
        public IActionResult GetRequestStories()
        {

            var blog = _db.SuccessStories.Where(x=>x.Status=="pending").ToList();
            return Ok(blog);
        }
        [HttpPut]
        public IActionResult changeStatus(int id) {

            var story=_db.SuccessStories.Find(id);

            story.Status = "published";
            _db.SaveChanges();
            return Ok(story);
        
        }

        [HttpGet("getSeccessStoryById/{id}")]
        public IActionResult getSeccessStoryById(int id)
        {

            var story = _db.SuccessStories.Find(id);
            return Ok(story);
        }
        [HttpGet("getTheAnimalsName/{userId}")]
        public IActionResult GetAnimalsName(int userId)
        {
            // Fetch all animal names for the specified user
            var animalNames = _db.AdoptionApplications
                .Where(app => app.UserId == userId&& app.IsReceived == true)
                .Select(app => app.Animal.Name)
                .ToList();

            return Ok(animalNames);
        }



    }
}
