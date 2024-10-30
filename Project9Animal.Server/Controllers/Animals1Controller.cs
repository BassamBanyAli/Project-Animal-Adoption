using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.DTOs;
using Project9Animal.Server.DTOs;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Animals1Controller : ControllerBase
    {
        private readonly MyDbContext _context;

        public Animals1Controller(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Animals
        [HttpGet]
        public IActionResult GetAnimals()
        {
            var animals = from animal in _context.Animals
                          join category in _context.Categories on animal.CategoryId equals category.Id into categoryGroup
                          from category in categoryGroup.DefaultIfEmpty() 
                          join shelter in _context.Shelters on animal.ShelterId equals shelter.ShelterId into shelterGroup
                          from shelter in shelterGroup.DefaultIfEmpty() 
                          select new
                          {
                              animal.AnimalId,
                              animal.Name,
                              CategoryId = animal.CategoryId,
                              CategoryName = category != null ? category.Name : "غير متوفر", 
                              ShelterName = shelter != null ? shelter.ShelterName : "غير متوفر", 
                              animal.Breed,
                              animal.Age,
                              animal.Size,
                              animal.Temperament,
                              animal.SpecialNeeds,
                              animal.Description,
                              animal.AdoptionStatus,
                              animal.Image1,
                              animal.Image2,
                              animal.Image3,
                              animal.Image4
                          };

            return Ok(animals.ToList()); 
        }
        [HttpGet("Animals1/{id}")]
        public IActionResult GetAnimal(int id)
        {
            var animal = _context.Animals
                .Include(a => a.Category) // تضمين الفئة
                .Include(a => a.Shelter) // تضمين الملجأ
                .FirstOrDefault(a => a.AnimalId == id); // العثور على الحيوان

            if (animal == null)
            {
                return NotFound();
            }

            // إرجاع كائن الحيوان مباشرة
            return Ok(animal);
        }


        // PUT: api/Animals1/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public IActionResult PutAnimal(int id, [FromForm] updateAnimalDTO animal)
        //{
        //    var existAnimal = _context.Animals.Find(id);

        //    if (existAnimal == null)
        //    {
        //        return BadRequest();
        //    }
        //    existAnimal.Name = animal.Name;
        //    existAnimal.Age = animal.Age;
        //    existAnimal.Breed = animal.Breed;
        //    existAnimal.Size = animal.Size;
        //    existAnimal.Temperament = animal.Temperament;
        //    existAnimal.SpecialNeeds = animal.SpecialNeeds;
        //    existAnimal.Description = animal.Description;
        //    existAnimal.AdoptionStatus = animal.AdoptionStatus;
        //    existAnimal.Image1 = animal.PhotoUrl;

        //    _context.Animals.Update(existAnimal);
        //    _context.SaveChanges();
        //    return Ok(existAnimal);
        //}

        // POST: api/Animals1
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        //[HttpPost]
        //public async Task<ActionResult<Animal>> PostAnimal([FromForm] addAnimalDTO animal)
        //{
        //    var newAnimal = new Animal
        //    {
        //        Name = animal.Name,

        //        Age = animal.Age,
        //        Breed = animal.Breed,
        //        Size = animal.Size,
        //        Temperament = animal.Temperament,
        //        SpecialNeeds = animal.SpecialNeeds,
        //        Description = animal.Description,
        //        AdoptionStatus = animal.AdoptionStatus,
        //        Image1 = animal.PhotoUrl,
        //    };
        //    _context.Animals.Add(newAnimal);
        //    _context.SaveChanges();

        //    return Ok(newAnimal);
        //}



        // DELETE: api/Animals1/5
        [HttpDelete("{id}")]
        public IActionResult DeleteAnimal(int id)
        {
            var animal = _context.Animals.Find(id);
            if (animal == null)
            {
                return NotFound();
            }

            _context.Animals.Remove(animal);
            _context.SaveChanges();

            return NoContent();
        }

        private bool AnimalExists(int id)
        {
            return _context.Animals.Any(e => e.AnimalId == id);
        }





        [HttpGet("GetAnimals")]
        public async Task<IActionResult> GetAllAnimals()
        {
            var animals = await _context.Animals
      .Join(_context.Shelters,
            animal => animal.ShelterId,
            shelter => shelter.ShelterId,
            (animal, shelter) => new
            {
                animal.AnimalId,
                animal.Name,
                animal.Breed,
                animal.Age,
                animal.Image1,
                animal.AdoptionStatus,
                ShelterName = shelter.ShelterName
            })
      .ToListAsync();


            return Ok(animals);
        }




        [HttpGet("getImages/{ImageName}")]

        public IActionResult getImage(string ImageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", ImageName);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/jpg");

            }
            return NotFound();


        }

        /////////////////////////
        [HttpGet("filter")]
        public IActionResult GetFilteredAnimals(
      [FromQuery] string? animalName = null,
      [FromQuery] string? categoryName = null,
      [FromQuery] string? shelterName = null)
        {

            var query = from animal in _context.Animals
                        join category in _context.Categories on animal.CategoryId equals category.Id
                        join shelter in _context.Shelters on animal.ShelterId equals shelter.ShelterId
                        select new
                        {
                            animal.AnimalId,
                            animal.Name,
                            CategoryName = category.Name,
                            shelterName = shelter.ShelterName,
                            animal.Breed,
                            animal.Age,
                            animal.Size,
                            animal.Temperament,
                            animal.AdoptionStatus,
                            animal.Description,
                            animal.Image1
                        };

            if (!string.IsNullOrEmpty(animalName))
            {
                query = query.Where(a => a.Name.Contains(animalName));
            }

            if (!string.IsNullOrEmpty(categoryName))
            {
                query = query.Where(a => a.CategoryName.Contains(categoryName));
            }


            if (!string.IsNullOrEmpty(shelterName))
            {
                query = query.Where(a => a.shelterName.Contains(shelterName));
            }


            var result = query.ToList();
            return Ok(result);
        }

        /////////////////
        ///
        [HttpPut("UpdateAnimal/{id}")]
        public async Task<IActionResult> UpdateAnimal(int id, [FromForm] AnimalDTO updatedAnimalDto)
        {
            var animal = await _context.Animals
                .Include(a => a.Shelter)
                .Include(a => a.Category)
                .FirstOrDefaultAsync(a => a.AnimalId == id);

            if (animal == null)
            {
                return NotFound();
            }

   
            animal.Name = string.IsNullOrWhiteSpace(updatedAnimalDto.Name) ? animal.Name : updatedAnimalDto.Name;
            animal.CategoryId = updatedAnimalDto.CategoryId != 0 ? updatedAnimalDto.CategoryId : animal.CategoryId;

          
            if (updatedAnimalDto.ShelterId != 0)
            {
                animal.ShelterId = updatedAnimalDto.ShelterId;
            }

            animal.Breed = string.IsNullOrWhiteSpace(updatedAnimalDto.Breed) ? animal.Breed : updatedAnimalDto.Breed;
            animal.Age = updatedAnimalDto.Age != 0 ? updatedAnimalDto.Age : animal.Age;
            animal.Size = string.IsNullOrWhiteSpace(updatedAnimalDto.Size) ? animal.Size : updatedAnimalDto.Size;
            animal.Temperament = string.IsNullOrWhiteSpace(updatedAnimalDto.Temperament) ? animal.Temperament : updatedAnimalDto.Temperament;
            animal.SpecialNeeds = string.IsNullOrWhiteSpace(updatedAnimalDto.SpecialNeeds) ? animal.SpecialNeeds : updatedAnimalDto.SpecialNeeds;
            animal.Description = string.IsNullOrWhiteSpace(updatedAnimalDto.Description) ? animal.Description : updatedAnimalDto.Description;
            animal.AdoptionStatus = string.IsNullOrWhiteSpace(updatedAnimalDto.AdoptionStatus) ? animal.AdoptionStatus : updatedAnimalDto.AdoptionStatus;

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

            await SaveImage(updatedAnimalDto.Image1, folder, animal, (img) => animal.Image1 = img);
            await SaveImage(updatedAnimalDto.Image2, folder, animal, (img) => animal.Image2 = img);
            await SaveImage(updatedAnimalDto.Image3, folder, animal, (img) => animal.Image3 = img);
            await SaveImage(updatedAnimalDto.Image4, folder, animal, (img) => animal.Image4 = img);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoesAnimalExist(id)) return NotFound();
                else throw;
            }

            return Ok(new
            {
                animal,
                ShelterName = animal.Shelter?.ShelterName,
                CategoryName = animal.Category?.Name
            });
        }


        private async Task SaveImage(IFormFile imageFile, string folder, Animal animal, Action<string> setImage)
        {
            if (imageFile != null)
            {
                var imagePath = Path.Combine(folder, imageFile.FileName);
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                setImage(imageFile.FileName);
            }
        }

        private bool DoesAnimalExist(int id)
        {
            return _context.Animals.Any(e => e.AnimalId == id);
        }

        [HttpPost("AddAnimal")]
        public async Task<IActionResult> AddAnimal([FromForm] AnimalDTO newAnimalDto)
        {
            var animal = new Animal
            {
                Name = newAnimalDto.Name,
                CategoryId = newAnimalDto.CategoryId,
                ShelterId = newAnimalDto.ShelterId,
                Breed = newAnimalDto.Breed,
                Age = newAnimalDto.Age,
                Size = newAnimalDto.Size,
                Temperament = newAnimalDto.Temperament,
                SpecialNeeds = newAnimalDto.SpecialNeeds,
                Description = newAnimalDto.Description,
                AdoptionStatus = newAnimalDto.AdoptionStatus
            };

        
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

            if (newAnimalDto.Image1 != null)
            {
                var image1Path = Path.Combine(folder, newAnimalDto.Image1.FileName);
                using (var stream = new FileStream(image1Path, FileMode.Create))
                {
                    await newAnimalDto.Image1.CopyToAsync(stream);
                }
                animal.Image1 = newAnimalDto.Image1.FileName;
            }

            if (newAnimalDto.Image2 != null)
            {
                var image2Path = Path.Combine(folder, newAnimalDto.Image2.FileName);
                using (var stream = new FileStream(image2Path, FileMode.Create))
                {
                    await newAnimalDto.Image2.CopyToAsync(stream);
                }
                animal.Image2 = newAnimalDto.Image2.FileName;
            }

            if (newAnimalDto.Image3 != null)
            {
                var image3Path = Path.Combine(folder, newAnimalDto.Image3.FileName);
                using (var stream = new FileStream(image3Path, FileMode.Create))
                {
                    await newAnimalDto.Image3.CopyToAsync(stream);
                }
                animal.Image3 = newAnimalDto.Image3.FileName;
            }

            if (newAnimalDto.Image4 != null)
            {
                var image4Path = Path.Combine(folder, newAnimalDto.Image4.FileName);
                using (var stream = new FileStream(image4Path, FileMode.Create))
                {
                    await newAnimalDto.Image4.CopyToAsync(stream);
                }
                animal.Image4 = newAnimalDto.Image4.FileName;
            }

        
            _context.Animals.Add(animal);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error saving animal: {ex.Message}");
            }

            
            return Ok();
        }

        //[HttpDelete("{shelterId}")]
        //public async Task<IActionResult> DeleteShelter(int shelterId)
        //{

        //    var shelter = await _context.Shelters.Include(s => s.Animals).FirstOrDefaultAsync(s => s.ShelterId == shelterId);

        //    if (shelter == null)
        //    {
        //        return NotFound(new { message = "The shelter does not exist." });
        //    }


        //    var animalCount = shelter.Animals.Count;

        //    if (animalCount > 0)
        //    {

        //        return BadRequest(new { message = $"Cannot delete the shelter because it has {animalCount} animals. Please remove the animals first." });
        //    }


        //    _context.Shelters.Remove(shelter);
        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "The shelter has been successfully deleted." });
        //}







    }
}


