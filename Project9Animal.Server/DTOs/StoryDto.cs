namespace Project9Animal.Server.DTOs
{
 
        public class StoryDto
        {
            public int StoryId { get; set; }
            public int UserId { get; set; }
            public string Title { get; set; }
            public string StoryText { get; set; }
            public string Status { get; set; }
            public DateTime? StoryDate { get; set; }
            public string PhotoUrl1 { get; set; }
            public int CommentCount { get; set; } // This will hold the count of comments
        }

    
}
