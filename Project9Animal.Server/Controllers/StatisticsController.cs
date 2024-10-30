using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly MyDbContext _db;
        public StatisticsController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("TotalShelters")]
        public IActionResult GetTotalShelters()
        {
            var shelterCount = _db.Shelters.Count();
            return Ok(shelterCount);
        }

        [HttpGet("TotalAnimal")]
        public IActionResult GetTotalAnimals()
        {
            var animalCount = _db.Animals.Count();
            return Ok(animalCount);
        }

      

        [HttpGet("TotalUser")]
        public IActionResult GetTotalUser()
        {
         
            var userCount = _db.Users
                .Where(u => u.IsAdmin == false || u.IsAdmin == null) 
                .Count();

            return Ok(userCount);
        }


        [HttpGet("AnimalsCountByShelter")]
        public IActionResult  GetAnimalsCountByShelter()
        {
            var animalsCount = _db.Shelters
                .Select(s => new
                {
                    ShelterName = s.ShelterName,
                    AnimalCount = s.Animals.Count
                })
                .ToList();

            return Ok(animalsCount);
        }


    }
}
