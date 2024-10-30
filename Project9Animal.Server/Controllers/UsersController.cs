using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.DTOs;
using Project9Animal.Server.DTOs;
using Project9Animal.Server.Models;
using System.Net;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _context;
        
        public UsersController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet("GetAllUser")]
        public IActionResult GetUsers()
        { 
            var users = _context.Users.ToList();
            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("GetUserById{id}")]
        public IActionResult GetUser(int id )
        {
            var user = _context.Users.FirstOrDefault(c=>c.UserId==id);

            if (user == null)
            {
                return NotFound(user);
            }

            return Ok(user);
        }

        [HttpPut("UpdeteUser{id}")]
        public IActionResult PutUser(int id,[FromForm] UpdateuserDTO user)
        {
            var existUser = _context.Users.FirstOrDefault(c=>c.UserId==id);

            if (existUser == null)
            {
                return BadRequest();
            }
          
            existUser.FullName = user.FullName;
            existUser.Password = user.Password;
            existUser.Email = user.Email;
            existUser.Address = user.Address;
            existUser.MedicalStatus = user.MedicalStatus;
            existUser.FlatType=user.FlatType;
            existUser.FinaincalStatus = user.FinaincalStatus;
            existUser.HaveKids = existUser.HaveKids;
            existUser.MoreDetails = existUser.MoreDetails;



            _context.Users.Update(existUser);
            _context.SaveChanges();
            return Ok(existUser);
        }


        [HttpPost("AddUser")]
        public IActionResult PostUser([FromForm] AddUserDTO user)
        {
            if (user.Password != user.confirmPassword)
            {
                return BadRequest("Passwords do not match");
            }
            var existingUser = _context.Users.FirstOrDefault(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return BadRequest("Email already exists");
            }
            //byte[] passwordHash;
            //byte[] passwordSalt;
            passwordHasherMethod.CreatePasswordHash(user.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var newUser = new User
            {
                FullName = user.FullName,
                Password = user.Password,
                Email = user.Email,
                Address = user.Address,
                MedicalStatus = user.MedicalStatus,
                FlatType = user.FlatType,
                FinaincalStatus = user.FinaincalStatus,
                HaveKids = user.HaveKids,
                MoreDetails = user.MoreDetails,
                HashPassword = passwordHash,
                SaltPassword = passwordSalt

            };
            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok();

        }

        // DELETE: api/Users/5
        [HttpDelete("DeleteUser{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPost("login")]
        public IActionResult login([FromForm] loginDTO userdto)
        {
            
            var user = _context.Users.FirstOrDefault(x => x.Email == userdto.Email );

            if (user == null )
            {
                return BadRequest("user doesn't exist. please register first");
            }
            if (user == null || !passwordHasherMethod.VerifyPassword(userdto.Password, user.HashPassword, user.SaltPassword))
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok(user);


        }



        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
