using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.DTOs;
using Project9Animal.Server.Models;
using System.ComponentModel.Design;
using System.Xml.Linq;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OurCommunityDetailsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public OurCommunityDetailsController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("getSeccessStoryByID/{id}")]
        public IActionResult getSeccessStoryByID(int id) { 

            var story = _context.SuccessStories.Find(id);
            return Ok(story);
        }

        [HttpGet("likes/{id}")]
        public IActionResult likes(int id) { 
            var like = _context.Likes.Count(l => l.StoryId == id);
            return Ok(like);
        }

        [HttpGet("commentsCount/{id}")]
        public IActionResult commentsCount(int id) { 
            var comments = _context.Comments.Count(c => c.StoryId == id);
            return Ok(comments);
        }

        [HttpGet("comments/{id}")]
        public IActionResult comments(int id) {
            var comments = _context.Comments
                    .Where(c => c.StoryId == id)
                    .Select(c => new
                    {
                        c.CommentId,
                        c.Comment1, 
                        UserName = c.User.FullName,
                        commentDate = c.CommentDate,
                        Replies = c.Replies.Select(r => new
                        {
                            r.Comment,
                            r.CommentDate, 
                            UserName = r.User.FullName 
                        }).ToList()
                    })
                    .ToList();

            return Ok(comments);
        }

        [HttpPost("isItLiked")]
        public IActionResult isItLiked([FromBody] LikePOST like)
        {
            var isExist = _context.Likes.FirstOrDefault(x => x.UserId == like.UserId && x.StoryId == like.StoryId);
            if (isExist == null)
            {
                return Ok(false);
            }
            else
            {
                return Ok(true);
            }
        }
        [HttpPost("addLike")]
        public IActionResult addLike([FromBody] LikePOST like) 
        {
            var isExist = _context.Likes.FirstOrDefault(x => x.UserId == like.UserId && x.StoryId == like.StoryId);
            if (isExist == null)
            {
                var likeMODEL = new Like
                {
                    UserId = like.UserId,
                    StoryId = like.StoryId,
                };
                _context.Likes.Add(likeMODEL);
                _context.SaveChanges();
                return Ok(like);
            }
            else
            {
                _context.Likes.Remove(isExist);
                _context.SaveChanges();
                return Ok(like);
            }
            
        }


        [HttpPost("commentPOST")]
        public IActionResult commentPOST([FromBody] commentPostDTO comment)
        {
            var newcomment = new Comment
            {
                StoryId = comment.StoryId,
                UserId = comment.UserId,
                Comment1 = comment.Comment1,
                CommentDate = DateTime.Now,
            };
            _context.Comments.Add(newcomment);
            _context.SaveChanges();
            return Ok(newcomment);
        }

        [HttpPost("replyPost")]
        public IActionResult replyPost([FromBody] replyPostDTO reply)
        {
            var newReply = new Reply
            {
                CommentId = reply.CommentId,
                UserId = reply.UserId,
                Comment = reply.Comment,
                CommentDate = DateTime.Now
            };
            _context.Replies.Add(newReply);
            _context.SaveChanges();
            return Ok(newReply);
        }

        [HttpGet("getAnimalByCategoryID/{id}")]
        public IActionResult getAnimalByCategoryID(int id)
        {
            var categoryID = _context.Animals.FirstOrDefault(x => x.AnimalId == id);
            var animals = _context.Animals
                .Where(a => a.CategoryId == categoryID.CategoryId)
                .OrderBy(a => Guid.NewGuid()) 
                .Take(4) 
                .ToList();
            return Ok(animals);
        }
        [HttpGet("resentStory")]
        public IActionResult resentStory()
        {
            var story = _context.SuccessStories
                .Where(a =>a.Status == "Published")
                .OrderBy(a => a.StoryId)
                .Take(3)
                .ToList();
            return Ok(story);
        }

    }

    


}
