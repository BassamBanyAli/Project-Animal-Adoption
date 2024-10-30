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
    public class SheltersController : ControllerBase
    {
        private readonly MyDbContext _context;

        public SheltersController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Shelters
        [HttpGet]
        public IActionResult GetShelters()
        {
            return Ok(_context.Shelters.ToList());
        }

        // GET: api/Shelters/5
        [HttpGet("{id}")]
        public IActionResult GetShelter(int id)
        {
            var shelter = _context.Shelters.Find(id);

            if (shelter == null)
            {
                return NotFound();
            }

            return Ok(shelter);
        }

        // PUT: api/Shelters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult PutShelternEW(int id, [FromForm] updateShelterDTO shelter)
        {
            var existShelter = _context.Shelters.Find(id);

            if (existShelter == null)
            {
                return NotFound();
            }

          
            existShelter.ShelterName = shelter.ShelterName;
            existShelter.Description = shelter.Description;
            existShelter.ContactEmail = shelter.ContactEmail;
            existShelter.Phone = shelter.Phone;
            existShelter.Address = shelter.Address;
            existShelter.OpeningTime = shelter.OpeningTime;
           

            

            _context.Shelters.Update(existShelter);
            _context.SaveChanges();

            return Ok(existShelter);
        }


            // POST: api/Shelters
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPost]
            public IActionResult PostShelter([FromForm] addShelterDTO shelter)
            {
                var newShelter = new Shelter
                {
                    ShelterName = shelter.ShelterName,
                    Description = shelter.Description,
                    ContactEmail = shelter.ContactEmail,
                    Phone = shelter.Phone,
                    Address = shelter.Address,
                    OpeningTime = shelter.OpeningTime?.ToString("HH:mm") ?? "00:00"
                };

                _context.Shelters.Add(newShelter);
                _context.SaveChanges();

                return Ok(newShelter);
            }


            // DELETE: api/Shelters/5
            [HttpDelete("{id}")]
            public IActionResult DeleteShelter(int id)
            {
                var shelter = _context.Shelters.Find(id);
                if (shelter == null)
                {
                    return NotFound();
                }

                _context.Shelters.Remove(shelter);
                _context.SaveChanges();

                return NoContent();
            }

            private bool ShelterExists(int id)
            {
                return _context.Shelters.Any(e => e.ShelterId == id);
            }



        [HttpDelete("DeleteShelter{shelterId}")]
        public async Task<IActionResult> DeleteShelterNew(int shelterId)
        {
            // Retrieve the shelter along with its associated animals
            var shelter = await _context.Shelters.Include(s => s.Animals).FirstOrDefaultAsync(s => s.ShelterId == shelterId);

            if (shelter == null)
            {
                return NotFound(new { message = "The shelter does not exist." });
            }

            // If there are related animals, remove them first
            if (shelter.Animals.Any())
            {
                _context.Animals.RemoveRange(shelter.Animals);
            }

            // Remove the shelter
            _context.Shelters.Remove(shelter);
            await _context.SaveChangesAsync();

            return Ok(new { message = "The shelter and its associated animals have been successfully deleted." });
        }













    }



}



