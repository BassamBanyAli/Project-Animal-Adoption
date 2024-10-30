namespace Project9Animal.Server.DTOs
{
    public class CategoryCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }

        // IFormFile is used for file uploads
        public IFormFile? Image { get; set; }
    }
}
