using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.DTOs;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalCategoryController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AnimalCategoryController(MyDbContext context)
        {
            _context = context;
        }

        [HttpDelete("DeleteCategory{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            // Fetch the category including its related animals
            var category = await _context.Categories
                                         .Include(c => c.Animals)
                                         .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            // If there are related animals, remove them first
            if (category.Animals.Any())
            {
                _context.Animals.RemoveRange(category.Animals);
            }

            // Remove the category
            _context.Categories.Remove(category);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPut("UpdateCategory/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromForm] CategoryCreateDto categoryDto)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            // Update the properties from form data
            category.Name = categoryDto.Name ?? category.Name;
            category.Description = categoryDto.Description ?? category.Description;

            // If there's an image, process it
            if (categoryDto.Image != null)
            {
                string imagePath = null;

                // Check if the uploaded file is not null
                if (categoryDto.Image != null && categoryDto.Image.Length > 0)
                {
                    // Define the path where you want to save the uploaded image
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/Animal");

                    var filePath = Path.Combine(uploadsFolder, categoryDto.Image.FileName);

                    // Create the folder if it doesn't exist
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // Save the uploaded file
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await categoryDto.Image.CopyToAsync(fileStream);
                    }

                    // Set the image path to be saved in the database
                    imagePath = filePath; // Save the local file path instead of a URL
                }
                // You can save the image to the server or update its path in the database
                category.Image = categoryDto.Image.FileName ?? category.Image;
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return NoContent();  // Return success status
        }

        [HttpPost("AddCategory")]
        public async Task<IActionResult> AddCategory([FromForm] CategoryCreateDto categoryDto)
        {
            // Validate request data
            if (string.IsNullOrEmpty(categoryDto.Name))
            {
                return BadRequest("Invalid category data.");
            }

            string imagePath = null;

            // Check if the uploaded file is not null
            if (categoryDto.Image != null && categoryDto.Image.Length > 0)
            {
                // Define the path where you want to save the uploaded image
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/Animal");

                var filePath = Path.Combine(uploadsFolder, categoryDto.Image.FileName);

                // Create the folder if it doesn't exist
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Save the uploaded file
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await categoryDto.Image.CopyToAsync(fileStream);
                }

                // Set the image path to be saved in the database
                imagePath = filePath; // Save the local file path instead of a URL
            }


            // Create a new category object
            var category = new Category
            {
                Name = categoryDto.Name,
                Description = categoryDto.Description,
                Image = categoryDto.Image.FileName // Save the filename (or path) of the uploaded image
            };

            // Add the category to the database
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return Ok(category);
        }
        [HttpGet("GetAllCategories")]
        public IActionResult GetAllCategories()
        {
            var categories = _context.Categories.ToList();
            return Ok(categories);
        }
        [HttpGet("GetCategoryById/{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            // Find the category by ID
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound(new { message = "Category not found." });
            }

            // Return the category details
            return Ok(category);
        }

        [HttpGet("getImage/{imageName}")]
        public IActionResult getImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/Animal", imageName);
            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }
            return NotFound();
        }
        [HttpGet("getImageForStories/{imageName}")]
        public IActionResult getImageForStories(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/SucessStory", imageName);
            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }
            return NotFound();
        }

        [HttpGet("GetAnimalsByCategory/{categoryId}")]
        public async Task<IActionResult> GetAnimalsByCategory(int categoryId)
        {
            // Fetch all animals in the specified category
            var animals = await _context.Animals
                .Where(a => a.CategoryId == categoryId)
                .ToListAsync();

            if (animals == null || !animals.Any())
            {
                return NotFound(new { message = "No animals found for this category." });
            }

            return Ok(animals);
        }

    }
}
