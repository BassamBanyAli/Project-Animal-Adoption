namespace project9_cohort4.Server.DTOs
{
    public class AddUserDTO
    { public string? confirmPassword {  get; set; }
        public string? FullName { get; set; }

        public string? Password { get; set; }

        public string? Email { get; set; }

        public string? Address { get; set; }

        public string? MedicalStatus { get; set; }

        public string? FlatType { get; set; }

        public string? FinaincalStatus { get; set; }

        public bool? HaveKids { get; set; }

        public string? MoreDetails { get; set; }
        public byte[]? HashPassword { get; set; }

        public byte[]? SaltPassword { get; set; }

    }
}
