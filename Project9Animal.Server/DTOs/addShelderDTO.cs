namespace project9_cohort4.Server.DTOs
{
    public class addShelterDTO
    {
        public string ShelterName { get; set; }
        public string Description { get; set; }
        public string ContactEmail { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public TimeOnly? OpeningTime { get; set; } // استخدام TimeOnly للوقت فقط
    }


}
