using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalsDetailsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public AnimalsDetailsController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("{id}")]
        public IActionResult getAnimalDetailsById(int id )
        {
            var animal =  _db.Animals
                .Include(a => a.Shelter)      
                .Include(a => a.Category)     
                .FirstOrDefault(a => a.AnimalId == id);

            if (animal == null)
            {
                return NotFound();
            }

            return Ok(animal);
        }
    }
}
