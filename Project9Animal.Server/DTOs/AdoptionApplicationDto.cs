namespace Project9Animal.Server.DTOs
{
    public class AdoptionApplicationDto
    {
        public int UserId { get; set; } // UserId passed from the front end
        public int AnimalId { get; set; }
        public string Address { get; set; }
        public string MedicalStatus { get; set; }
        public string FlatType { get; set; }
        public string FinancialStatus { get; set; }
        public bool HaveKids { get; set; }
        public string MoreDetails { get; set; }
    }
}
