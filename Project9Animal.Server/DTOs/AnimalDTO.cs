namespace Project9Animal.Server.DTOs
{
    public class AnimalDTO
    {
        public string? Name { get; set; }
        public int? CategoryId { get; set; }
        public int? ShelterId { get; set; }
        public string? Breed { get; set; }
        public int? Age { get; set; }
        public string? Size { get; set; }
        public string? Temperament { get; set; }
        public string? SpecialNeeds { get; set; }
        public string? Description { get; set; }
        public string? AdoptionStatus { get; set; }
        public IFormFile? Image1 { get; set; }
        public IFormFile? Image2 { get; set; }
        public IFormFile? Image3 { get; set; }
        public IFormFile? Image4 { get; set; }
    }

}
