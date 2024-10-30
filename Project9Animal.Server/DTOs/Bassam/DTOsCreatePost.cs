namespace Project9Animal.Server.DTOs.Bassam
{
    public class DTOsCreatePost
    {
        public int UserId { get; set; }

        public string? AnimalName { get; set; }

        public string? Title { get; set; }

        public string? StoryText { get; set; }

        public IFormFile? PhotoUrlOrVideo { get; set; }
    }
}
